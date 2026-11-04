import { useState } from "react";
import Icon from "./Icon";

export default function ReferencesSection({ data, onChange }) {
  const [addingPersonal, setAddingPersonal] = useState(false);
  const [addingFamily, setAddingFamily] = useState(false);

  const addRef = (type) => {
    const newEntry = {
      id: crypto.randomUUID(),
      name: "",
      occupation: "",
      phone: "",
      address: "",
      company: "",
    };
    if (type === "personal") {
      onChange("personalRefs", [...data.personalRefs, newEntry]);
    } else {
      onChange("familyRefs", [...data.familyRefs, newEntry]);
    }
  };

  const removeRef = (type, id) => {
    if (type === "personal") {
      onChange("personalRefs", data.personalRefs.filter((r) => r.id !== id));
    } else {
      onChange("familyRefs", data.familyRefs.filter((r) => r.id !== id));
    }
  };

  const updateField = (type, id, field, value) => {
    const key = type === "personal" ? "personalRefs" : "familyRefs";
    onChange(
      key,
      data[key].map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
  };

  const renderRefBlock = (title, type, icon, color) => (
    <div className="space-y-4 print:break-inside-avoid">
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${color}`} />
        <h3 className="font-heading font-semibold text-faca-900 uppercase tracking-wider text-xs">
          {title}
        </h3>
      </div>

      {type === "personal" ? (
        <button
          onClick={() => setAddingPersonal(!addingPersonal)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-faca-700 bg-faca-50 border border-faca-200 rounded-lg hover:bg-faca-100 transition-colors"
        >
          <Icon name="Plus" className="text-faca-700" size={0.5} /> Añadir referencia personal
        </button>
      ) : (
        <button
          onClick={() => setAddingFamily(!addingFamily)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-faca-700 bg-faca-50 border border-faca-200 rounded-lg hover:bg-faca-100 transition-colors"
        >
          <Icon name="Plus" className="text-faca-700" size={0.5} /> Añadir referencia familiar/laboral
        </button>
      )}

      <div className="space-y-3">
        {(type === "personal" ? data.personalRefs : data.familyRefs).map((ref) => (
          <div key={ref.id} className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm print:break-inside-avoid">
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={() => removeRef(type, ref.id)}
                className="text-slate-400 hover:text-brand-dark transition-colors"
                aria-label="Eliminar referencia"
              >
                <Icon name="Trash2" className="text-slate-400" size={0.5} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Nombres</label>
                <input
                  value={ref.name}
                  onChange={(e) => updateField(type, ref.id, "name", e.target.value)}
                  placeholder="Ej. María González"
                  className="w-full rounded border border-slate-200 bg-slate-50 px-2.5 py-2 text-sm text-slate-900 focus:ring-1 focus:ring-faca-700 outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Ocupación / Empresa</label>
                <input
                  value={type === "personal" ? ref.occupation : ref.company}
                  onChange={(e) =>
                    updateField(
                      type,
                      ref.id,
                      type === "personal" ? "occupation" : "company",
                      e.target.value
                    )
                  }
                  placeholder={type === "personal" ? "Ej. Ingeniero" : "Ej. Compañía S.A."}
                  className="w-full rounded border border-slate-200 bg-slate-50 px-2.5 py-2 text-sm text-slate-900 focus:ring-1 focus:ring-faca-700 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Teléfono</label>
                <input
                  value={ref.phone}
                  onChange={(e) => updateField(type, ref.id, "phone", e.target.value)}
                  placeholder="Ej. 310 123 4567"
                  className="w-full rounded border border-slate-200 bg-slate-50 px-2.5 py-2 text-sm text-slate-900 focus:ring-1 focus:ring-faca-700 outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Dirección / Ciudad</label>
                <input
                  value={ref.address}
                  onChange={(e) => updateField(type, ref.id, "address", e.target.value)}
                  placeholder="Ej. Calle 10 # 4-20, Facatativá"
                  className="w-full rounded border border-slate-200 bg-slate-50 px-2.5 py-2 text-sm text-slate-900 focus:ring-1 focus:ring-faca-700 outline-none"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-faca-700" />
        <h3 className="font-heading font-semibold text-faca-900">Referencias (Formato Minerva)</h3>
      </div>

      {renderRefBlock("Referencias Personales", "personal", "User", "bg-faca-700")}
      {renderRefBlock("Referencias Familiares o Laborales", "family", "Users", "bg-accent-700")}
    </div>
  );
}