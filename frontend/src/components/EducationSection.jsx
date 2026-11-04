import { useState } from "react";
import Icon from "./Icon";

export default function EducationSection({ data, onChange }) {
  const addEducation = () => {
    const newEntry = {
      id: crypto.randomUUID(),
      degree: "",
      institution: "",
      year: "",
      type: "degree",
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
        <h3 className="font-heading font-semibold text-faca-900">Educación y certificaciones</h3>
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
            <div
              key={edu.id}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <button
                  onClick={() => removeEducation(edu.id)}
                  className="text-slate-400 hover:text-faca-900 transition-colors"
                >
                  <Icon name="Trash2" className="text-slate-400" size={0.5} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Título / Certificación</label>
                  <input
                    value={edu.degree}
                    onChange={(e) => updateField(edu.id, "degree", e.target.value)}
                    placeholder="Ej. Tecnólogo en Gestión Administrativa"
                    className="w-full rounded border border-slate-200 bg-slate-50 px-2.5 py-2 text-sm text-slate-900 focus:ring-1 focus:ring-faca-700 outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Institución</label>
                  <input
                    value={edu.institution}
                    onChange={(e) => updateField(edu.id, "institution", e.target.value)}
                    placeholder="Ej. SENA"
                    className="w-full rounded border border-slate-200 bg-slate-50 px-2.5 py-2 text-sm text-slate-900 focus:ring-1 focus:ring-faca-700 outline-none"
                  />
                </div>
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

              <div className="flex items-center gap-2">
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer select-none">
                  <input
                    type="radio"
                    checked={edu.type === "degree"}
                    onChange={() => updateField(edu.id, "type", "degree")}
                    className="w-4 h-4 rounded border-slate-300 text-faca-700 focus:ring-faca-700"
                  />
                  Título
                </label>
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer select-none ml-3">
                  <input
                    type="radio"
                    checked={edu.type === "certificate"}
                    onChange={() => updateField(edu.id, "type", "certificate")}
                    className="w-4 h-4 rounded border-slate-300 text-faca-700 focus:ring-faca-700"
                  />
                  Certificación
                </label>
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