import { useState } from "react";
import Icon from "./Icon";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
const PHONE_REGEX = /(?:\+?57\s?)?3\d{2}\s?\d{3}\s?\d{4}|\d{3}\s?\d{3}\s?\d{4}/g;
const YEAR_REGEX = /\b(19|20)\d{2}\b/g;

export default function CVImport({ onImport }) {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [parsing, setParsing] = useState(false);
  const [parsedData, setParsedData] = useState(null);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setParsing(true);

    if (selectedFile.type === "application/pdf") {
      await extractPdfText(selectedFile);
    } else if (selectedFile.type === "text/plain") {
      const content = await selectedFile.text();
      setText(content);
      setParsing(false);
    }
  };

  const extractPdfText = async (file) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let fullText = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        fullText += content.items.map((item) => item.str).join(" ") + "\n";
      }
      setText(fullText);
    } catch (err) {
      console.error("PDF extraction error:", err);
    } finally {
      setParsing(false);
    }
  };

  const parseFields = (rawText) => {
    const emails = rawText.match(EMAIL_REGEX) || [];
    const phones = rawText.match(PHONE_REGEX) || [];
    const years = rawText.match(YEAR_REGEX) || [];

    const lines = rawText.split(/\n+/).map((l) => l.trim()).filter(Boolean);

    let fullName = "";
    for (const line of lines.slice(0, 5)) {
      if (line.length > 3 && line.length < 60 && !EMAIL_REGEX.test(line) && !PHONE_REGEX.test(line)) {
        fullName = line;
        break;
      }
    }

    const email = emails[0] || "";
    const phone = phones[0] || "";

    const summaryLines = lines.filter((l) => l.length > 30 && l.length < 300);
    const summary = summaryLines[0] || "";

    const experience = [];
    const education = [];
    let currentSection = null;

    for (const line of lines) {
      const lower = line.toLowerCase();
      if (lower.includes("experiencia") || lower.includes("experience") || lower.includes("laboral")) {
        currentSection = "experience";
        continue;
      }
      if (lower.includes("educación") || lower.includes("educacion") || lower.includes("education") || lower.includes("formación")) {
        currentSection = "education";
        continue;
      }
      if (currentSection === "experience" && line.length > 5) {
        experience.push({ company: "", role: line, location: "", startDate: "", endDate: "", current: false, achievements: [line] });
      }
      if (currentSection === "education" && line.length > 5) {
        const yearMatch = line.match(YEAR_REGEX);
        education.push({ degree: "", institution: line, year: yearMatch ? yearMatch[0] : "", type: "degree" });
      }
    }

    setParsedData({
      personal: { fullName, email, phone, summary },
      experience,
      education,
    });
  };

  const applyParsed = () => {
    if (parsedData) {
      onImport(parsedData);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-faca-700" />
        <h3 className="font-heading font-semibold text-faca-900">Importar CV existente</h3>
      </div>

      <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center transition-colors hover:border-faca-700/50">
        <label className="block cursor-pointer">
          <input
            type="file"
            accept=".pdf,.txt"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="flex flex-col items-center gap-2">
            <Icon name="FileText" className="w-8 h-8 text-slate-400" size={1} />
            <span className="text-sm font-medium text-slate-600">
              {file ? file.name : "Seleccionar PDF o archivo de texto"}
            </span>
            <span className="text-xs text-slate-400">Máx. 5 MB</span>
          </div>
        </label>
      </div>

      {text && (
        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 max-h-64 overflow-y-auto">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Texto extraído:</p>
          <p className="text-sm text-slate-700 whitespace-pre-wrap break-words">{text.slice(0, 500)}</p>
        </div>
      )}

      {parsing && (
        <div className="flex items-center gap-2 text-xs text-faca-700">
          <div className="w-3 h-3 rounded-full border-2 border-faca-700 border-t-transparent animate-spin"></div>
          <span>Procesando documento...</span>
        </div>
      )}

      {parsedData && (
        <div className="bg-faca-50 border border-faca-200 rounded-lg p-4">
          <p className="text-xs font-semibold text-faca-700 uppercase tracking-wider mb-3">Datos detectados:</p>
          <div className="space-y-1 text-sm text-slate-700">
            {parsedData.personal.fullName && <p><span className="font-bold">Nombre:</span> {parsedData.personal.fullName}</p>}
            {parsedData.personal.email && <p><span className="font-bold">Email:</span> {parsedData.personal.email}</p>}
            {parsedData.personal.phone && <p><span className="font-bold">Teléfono:</span> {parsedData.personal.phone}</p>}
            {parsedData.personal.summary && <p><span className="font-bold">Resumen:</span> {parsedData.personal.summary}</p>}
            {parsedData.experience.length > 0 && <p><span className="font-bold">Experiencia:</span> {parsedData.experience.length} bloque(s)</p>}
            {parsedData.education.length > 0 && <p><span className="font-bold">Educación:</span> {parsedData.education.length} bloque(s)</p>}
          </div>
          <button
            onClick={applyParsed}
            type="button"
            className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-2 bg-faca-700 text-white text-sm font-medium rounded-lg hover:bg-faca-900 transition-colors"
          >
            <Icon name="User" className="w-4 h-4" size={0.5} /> Aplicar datos al formulario
          </button>
        </div>
      )}

      <p className="text-xs text-slate-500 text-center">
        La importación extrae nombre, email, teléfono, resumen, experiencia y educación automáticamente.
      </p>
    </div>
  );
}