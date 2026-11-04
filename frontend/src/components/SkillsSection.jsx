import { useState } from "react";
import Icon from "./Icon";

export default function SkillsSection({ data, onChange }) {
  const [newSkill, setNewSkill] = useState("");
  const [category, setCategory] = useState("technical");

  const categories = [
    { id: "technical", label: "Técnicas", icon: "Code2" },
    { id: "soft", label: "Blandas", icon: "Users" },
  ];

  const addSkill = () => {
    const trimmed = newSkill.trim();
    if (!trimmed) return;
    if (data.skills[category].includes(trimmed)) {
      setNewSkill("");
      return;
    }
    onChange("skills", {
      ...data.skills,
      [category]: [...data.skills[category], trimmed],
    });
    setNewSkill("");
  };

  const removeSkill = (cat, skill) => {
    onChange("skills", {
      ...data.skills,
      [cat]: data.skills[cat].filter((s) => s !== skill),
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="space-y-4">
        <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-faca-700" />
        <h3 className="font-heading font-semibold text-faca-900">Habilidades técnicas y blandas</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((cat) => (
          <div key={cat.id} className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-slate-500 uppercase tracking-wider flex items-center gap-2 cursor-pointer">
                <Icon name={cat.icon} className="text-faca-700" size={0.375} />
                {cat.label}
              </label>
              <button
                onClick={() => setCategory(cat.id)}
                className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                  category === cat.id
                    ? "bg-faca-700 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Editar
              </button>
            </div>
            <div className="flex gap-2">
              <input
                value={category === cat.id ? newSkill : ""}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ej. Trabajo en equipo, Excel intermedio, Atención al cliente, React, Gestión de inventarios"
                className="flex-1 rounded border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:ring-1 focus:ring-faca-700 outline-none"
              />
              <button
                onClick={addSkill}
                disabled={!newSkill.trim() || category !== cat.id}
                className="px-3 py-2 rounded bg-faca-900 text-white text-sm font-medium hover:bg-faca-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Icon name="Plus" className="" size={0.375} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.skills[cat.id].map((skill) => (
                <button
                  key={skill}
                  onClick={() => removeSkill(cat.id, skill)}
                  className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200 hover:bg-faca-700 hover:text-white hover:border-faca-700 transition-colors"
                >
                  {skill}
                  <Icon name="Trash2" className="text-slate-600" size={0.375} />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-slate-500 text-center">
        Separa las habilidades con Enter o haz clic en "Añadir"
      </p>
    </div>
  );
}