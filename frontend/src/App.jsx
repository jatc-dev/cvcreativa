import { useState, useCallback } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import StepWizard from "./components/wizard/StepWizard";
import PersonalInfo from "./components/PersonalInfo";
import ExperienceSection from "./components/ExperienceSection";
import EducationSection from "./components/EducationSection";
import SkillsSection from "./components/SkillsSection";
import CVPreview from "./components/CVPreview";
import CVPrintLayout from "./components/CVPrintLayout";
import Icon from "./components/Icon";

const STEPS = [
  { id: "personal", label: "Datos y titular" },
  { id: "experience", label: "Experiencia" },
  { id: "education", label: "Educación" },
  { id: "skills", label: "Habilidades" },
  { id: "preview", label: "Previsualización" },
];

const INITIAL_DATA = {
  personal: { fullName: "", headline: "", email: "", phone: "", location: "", linkedin: "", github: "" },
  experience: [],
  education: [],
  skills: { technical: [], soft: [] },
};

export default function App() {
  const [cvData, setCvData, resetData] = useLocalStorage("cvcreativa_draft", INITIAL_DATA);
  const [activeStep, setActiveStep] = useState(0);
  const [printOpen, setPrintOpen] = useState(false);

  const canNext = (stepIndex) => {
    if (stepIndex === STEPS.length - 1) return true;
    const step = STEPS[stepIndex];
    if (step.id === "personal") {
      return Boolean(cvData.personal.fullName && cvData.personal.headline);
    }
    return true;
  };

  const handleChange = useCallback((section, value) => {
    setCvData((prev) => ({ ...prev, [section]: value }));
  }, [setCvData]);

  const isLast = activeStep === STEPS.length - 1;

  return (
    <div className="min-h-screen bg-[#f0f4ff] text-slate-900 font-sans antialiased">
      <header className="bg-white border-b border-slate-100 shadow-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-purple-600 flex items-center justify-center text-white font-bold">
                CV
              </div>
              <span className="font-heading font-bold text-xl tracking-tight text-brand-dark">
                CVCreativa
              </span>
            </div>
            <div className="flex items-center gap-3 hidden sm:flex">
              <button
                onClick={() => setPrintOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-brand-dark hover:bg-purple-700 text-white rounded-lg text-sm font-medium shadow-brand transition-colors"
              >
                <Icon name="Download" className="" size={0.5} /> Descargar PDF
              </button>
              <button
                onClick={resetData}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <Icon name="Save" className="" size={0.5} /> Restablecer borrador
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-6">
            <StepWizard
              activeStep={activeStep}
              steps={STEPS}
              onNext={() => {
                if (activeStep < STEPS.length - 1) setActiveStep((p) => p + 1);
              }}
              onPrev={() => setActiveStep((p) => Math.max(p - 1, 0))}
              canNext={canNext}
            />

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
              {STEPS[activeStep].id === "personal" && (
                <PersonalInfo data={cvData} onChange={handleChange} />
              )}
              {STEPS[activeStep].id === "experience" && (
                <ExperienceSection data={cvData} onChange={handleChange} />
              )}
              {STEPS[activeStep].id === "education" && (
                <EducationSection data={cvData} onChange={handleChange} />
              )}
              {STEPS[activeStep].id === "skills" && (
                <SkillsSection data={cvData} onChange={handleChange} />
              )}
              {STEPS[activeStep].id === "preview" && (
                <div className="text-center text-slate-500 text-sm mt-8">
                  <Icon name="FileText" className="text-slate-400" size={0.75} />
                  <p className="mt-2">Revisa tu hoja de vida en la vista previa derecha.</p>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h2 className="font-heading font-bold text-lg text-brand-dark flex items-center gap-2">
                  <Icon name="FileText" className="text-brand" size={0.625} />
                  Previsualización en vivo
                </h2>
                <span className="px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                  Actualizado
                </span>
              </div>
              <div className="p-6">
                <CVPreview data={cvData} />
              </div>
            </div>
          </div>
        </div>
      </main>

      {printOpen && (
        <CVPrintLayout onClose={() => setPrintOpen(false)}>
          <CVPreview data={cvData} />
        </CVPrintLayout>
      )}
    </div>
  );
}