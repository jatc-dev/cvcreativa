import { useState } from "react";
import Icon from "./Icon";

export default function ExperienceSection({ data, onChange }) {
  const addExperience = () => {
    const newEntry = {
      id: crypto.randomUUID(),
      company: "",
      role: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      achievements: [""],
    };
    onChange("experience", [...data.experience, newEntry]);
  };

  const removeExperience = (id) => {
    onChange("experience", data.experience.filter((e) => e.id !== id));
  };

  const updateField = (id, field, value) => {
    onChange(
      "experience",
      data.experience.map((e) => (e.id === id ? { ...e, [field]: value } : e))
    );
  };

  const toggleCurrent = (id) => {
    onChange(
      "experience",
      data.experience.map((e) =>
        e.id === id ? { ...e, current: !e.current, endDate: !e.current ? e.endDate : "" } : e
      )
    );
  };

  const addAchievement = (id) => {
    onChange(
      "experience",
      data.experience.map((e) =>
        e.id === id ? { ...e, achievements: [...e.achievements, ""] } : e
      )
    );
  };

  const updateAchievement = (expId, achIndex, value) => {
    onChange(
      "experience",
      data.experience.map((e) => {
        if (e.id !== expId) return e;
        const achievements = [...e.achievements];
        achievements[achIndex] = value;
        return { ...e, achievements };
      })
    );
  };

  const removeAchievement = (expId, achIndex) => {
    onChange(
      "experience",
      data.experience.map((e) => {
        if (e.id !== expId) return e;
        const achievements = e.achievements.filter((_, i) => i !== achIndex);
        return { ...e, achievements: achievements.length ? achievements : [""] };
      })
    );
  };

  if (data.experience.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-brand" />
          <h3 className="font-heading font-semibold text-brand-dark">Experiencia laboral</h3>
        </div>
        <button
          onClick={addExperience}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-brand-dark bg-brand-light border border-brand/20 rounded-lg hover:bg-brand/10 transition-colors"
        >
          <Icon name="Plus" className="text-brand-dark" size={0.5} /> Añadir experiencia
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-brand" />
        <h3 className="font-heading font-semibold text-brand-dark">Experiencia laboral</h3>
      </div>

      {data.experience.map((exp) => (
        <div
          key={exp.id}
          className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => removeExperience(exp.id)}
              className="text-slate-400 hover:text-brand-dark transition-colors"
              aria-label="Eliminar experiencia"
            >
              <Icon name="Trash2" className="text-slate-400" size={0.5} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Empresa</label>
              <input
                value={exp.company}
                onChange={(e) => updateField(exp.id, "company", e.target.value)}
                placeholder="Empresa"
                className="w-full rounded border border-slate-200 bg-slate-50 px-2.5 py-2 text-sm text-slate-900 focus:ring-1 focus:ring-brand outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Cargo</label>
              <input
                value={exp.role}
                onChange={(e) => updateField(exp.id, "role", e.target.value)}
                placeholder="Cargo"
                className="w-full rounded border border-slate-200 bg-slate-50 px-2.5 py-2 text-sm text-slate-900 focus:ring-1 focus:ring-brand outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Ubicación</label>
              <input
                value={exp.location}
                onChange={(e) => updateField(exp.id, "location", e.target.value)}
                placeholder="Ciudad"
                className="w-full rounded border border-slate-200 bg-slate-50 px-2.5 py-2 text-sm text-slate-900 focus:ring-1 focus:ring-brand outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Fecha inicio</label>
              <input
                type="month"
                value={exp.startDate}
                onChange={(e) => updateField(exp.id, "startDate", e.target.value)}
                className="w-full rounded border border-slate-200 bg-slate-50 px-2.5 py-2 text-sm text-slate-900 focus:ring-1 focus:ring-brand outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-xs font-medium text-slate-500 uppercase tracking-wider">
                <input
                  type="checkbox"
                  checked={exp.current}
                  onChange={() => toggleCurrent(exp.id)}
                  className="w-4 h-4 rounded border-slate-300 text-brand focus:ring-brand"
                />
                Trabajo actual
              </label>
            </div>
            {!exp.current && (
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Fecha fin</label>
                <input
                  type="month"
                  value={exp.endDate}
                  onChange={(e) => updateField(exp.id, "endDate", e.target.value)}
                  disabled={exp.current}
                  className="w-full rounded border border-slate-200 bg-slate-50 px-2.5 py-2 text-sm text-slate-900 focus:ring-1 focus:ring-brand outline-none"
                />
              </div>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-xs font-medium text-slate-500 uppercase tracking-wider">
              <Icon name="Briefcase" className="text-brand" size={0.375} /> Logros y responsabilidades
            </label>
            <div className="space-y-2">
              {exp.achievements.map((ach, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    value={ach}
                    onChange={(e) => updateAchievement(exp.id, i, e.target.value)}
                    placeholder="Ej: Reduje costos un 20% migrando a la nube"
                    className="flex-1 rounded border border-slate-200 bg-slate-50 px-2.5 py-2 text-sm text-slate-900 focus:ring-1 focus:ring-brand outline-none"
                  />
                  {exp.achievements.length > 1 && (
                    <button
                      onClick={() => removeAchievement(exp.id, i)}
                      className="text-slate-400 hover:text-red-500 transition-colors"
                      aria-label="Eliminar logro"
                    >
                      <Icon name="Trash2" className="text-slate-400" size={0.375} />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => addAchievement(exp.id)}
                className="text-xs font-medium text-brand-dark hover:text-brand transition-colors flex items-center gap-1"
              >
                <Icon name="Plus" className="text-brand-dark" size={0.375} /> Añadir logro
              </button>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={addExperience}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-brand-dark bg-brand-light border border-brand/20 rounded-lg hover:bg-brand/10 transition-colors"
      >
        <Icon name="Plus" className="text-brand-dark" size={0.5} /> Añadir otra experiencia
      </button>
    </div>
  );
}