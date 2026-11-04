import { useState } from "react";
import Icon from "./Icon";

const EDUCATION_TYPES = [
  { value: "basic", label: "Educación Básica y Media" },
  { value: "higher", label: "Educación Superior" },
  { value: "other", label: "Otros Estudios (Cursos / Diplomados)" },
];

const MODALITY_TYPES = [
  { value: "tecnico", label: "Técnico" },
  { value: "tecnologo", label: "Tecnólogo" },
  { value: "universitario", label: "Universitario" },
  { value: "especializacion", label: "Especialización" },
  { value: "maestria", label: "Maestría" },
];

export default function EducationSection({ data, onChange }) {
  const addEducation = () => {
    const newEntry = {
      id: crypto.randomUUID(),
      type: "basic",
      level: "",
      title: "",
      institution: "",
      modality: "",
      professionalCard: "",
      semester: "",
      year: "",
      hours: "",
    };
    onChange("education", [...data.education, newEntry]);
  };

  const removeEducation = (id) => {
    onChange("education", data.education.filter((e) => e.id !== id));
  };

  const updateField = (id, field, value) => {
    onChange(
      "education",
      data.education.map((e) => (e.id === id ? { ...e, [field]: value } : e))
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-faca-700" />
        <h3 className="font-heading font-semibold text-faca-900">Formación académica (Formato Minerva)</h3>
      </div>

      {data.education.length === 0 ? (
        <button
          onClick={addEducation}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-faca-900 bg-faca-50 border border-faca-700/20 rounded-lg hover:bg-faca-50/10 transition-colors"
        >
          <Icon name="Plus" className="text-faca-900" size={0.5} /> Añadir formación
        </button>
      ) : (
        <>
          {data.education.map((edu) => (
            <div key={edu.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm print:break-inside-avoid">
              <div className="flex items-center justify-between mb-3">
                <button
                  onClick={() => removeEducation(edu.id)}
                  className="text-slate-400 hover:text-faca-900 transition-colors"
                >
                  <Icon name="Trash2" className="text-slate-400" size={0.5} />
                </button>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Tipo de formación</label>
                    <select
                      value={edu.type}
                      onChange={(e) => updateField(edu.id, "type", e.target.value)}
                      className="w-full rounded border border-slate-200 bg-slate-50 px-2.5 py-2 text-sm text-slate-900 focus:ring-1 focus:ring-faca-700 outline-none"
                    >
                      {EDUCATION_TYPES.map((t) => (
                        <option key={t.value} value={t.value}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {edu.type === "basic" && (
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Nivel</label>
                      <select
                        value={edu.level || ""}
                        onChange={(e) => updateField(edu.id, "level", e.target.value)}
                        className="w-full rounded border border-slate-200 bg-slate-50 px-2.5 py-2 text-sm text-slate-900 focus:ring-1 focus:ring-faca-700 outline-none"
                      >
                        <option value="">Seleccionar nivel</option>
                        <option value="primaria">Primaria</option>
                        <option value="bachillerato">Bachillerato</option>
                      </select>
                    </div>
                  )}

                  {edu.type === "higher" && (
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Modalidad</label>
                      <select
                        value={edu.modality || ""}
                        onChange={(e) => updateField(edu.id, "modality", e.target.value)}
                        className="w-full rounded border border-slate-200 bg-slate-50 px-2.5 py-2 text-sm text-slate-900 focus:ring-1 focus:ring-faca-700 outline-none"
                      >
                        <option value="">Seleccionar modalidad</option>
                        {MODALITY_TYPES.map((m) => (
                          <option key={m.value} value={m.value}>
                            {m.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Título obtenido</label>
                    <input
                      value={edu.title}
                      onChange={(e) => updateField(edu.id, "title", e.target.value)}
                      placeholder={edu.type === "basic" ? "Ej. Bachiller Académico" : "Ej. Tecnólogo en Gestión Administrativa"}
                      className="w-full rounded border border-slate-200 bg-slate-50 px-2.5 py-2 text-sm text-slate-900 focus:ring-1 focus:ring-faca-700 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Institución</label>
                    <input
                      value={edu.institution}
                      onChange={(e) => updateField(edu.id, "institution", e.target.value)}
                      placeholder={edu.type === "basic" ? "Ej. Institución Educativa" : "Ej. SENA"}
                      className="w-full rounded border border-slate-200 bg-slate-50 px-2.5 py-2 text-sm text-slate-900 focus:ring-1 focus:ring-faca-700 outline-none"
                    />
                  </div>
                  {edu.type === "higher" && (
                    <>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Tarjeta Profesional</label>
                        <input
                          value={edu.professionalCard}
                          onChange={(e) => updateField(edu.id, "professionalCard", e.target.value)}
                          placeholder="Ej. TP-123456"
                          className="w-full rounded border border-slate-200 bg-slate-50 px-2.5 py-2 text-sm text-slate-900 focus:ring-1 focus:ring-faca-700 outline-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Semestre cursado</label>
                        <input
                          type="number"
                          value={edu.semester}
                          onChange={(e) => updateField(edu.id, "semester", e.target.value)}
                          placeholder="Ej. 6"
                          className="w-full rounded border border-slate-200 bg-slate-50 px-2.5 py-2 text-sm text-slate-900 focus:ring-1 focus:ring-faca-700 outline-none"
                        />
                      </div>
                    </>
                  )}
                  {edu.type === "other" && (
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Horas</label>
                      <input
                        type="number"
                        value={edu.hours}
                        onChange={(e) => updateField(edu.id, "hours", e.target.value)}
                        placeholder="Ej. 40"
                        className="w-full rounded border border-slate-200 bg-slate-50 px-2.5 py-2 text-sm text-slate-900 focus:ring-1 focus:ring-faca-700 outline-none"
                      />
                    </div>
                  )}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Año</label>
                    <input
                      type="number"
                      value={edu.year}
                      onChange={(e) => updateField(edu.id, "year", e.target.value)}
                      placeholder="2024"
                      className="w-full rounded border border-slate-200 bg-slate-50 px-2.5 py-2 text-sm text-slate-900 focus:ring-1 focus:ring-faca-700 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={addEducation}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-faca-900 bg-faca-50 border border-faca-700/20 rounded-lg hover:bg-faca-50/10 transition-colors mt-4"
          >
            <Icon name="Plus" className="text-faca-900" size={0.5} /> Añadir otra formación
          </button>
        </>
      )}
    </div>
  );
}