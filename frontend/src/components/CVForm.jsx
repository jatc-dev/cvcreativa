import {
  User,
  Mail,
  Phone,
  MapPin,
  PenTool,
  Briefcase,
} from "lucide-react";

export default function CVForm({ data, onChange }) {
  const fields = [
    {
      key: "fullName",
      label: "Nombres y apellidos",
      type: "text",
      placeholder: "Juan Pérez García",
      icon: User,
      required: true,
    },
    {
      key: "title",
      label: "Cargo / Profesión",
      type: "text",
      placeholder: "Desarrollador Frontend",
      icon: Briefcase,
    },
    {
      key: "email",
      label: "Correo electrónico",
      type: "email",
      placeholder: "juan.perez@email.com",
      icon: Mail,
    },
    {
      key: "phone",
      label: "Teléfono",
      type: "tel",
      placeholder: "+57 300 123 4567",
      icon: Phone,
    },
    {
      key: "location",
      label: "Ubicación",
      type: "text",
      placeholder: "Bogotá, Colombia",
      icon: MapPin,
    },
    {
      key: "summary",
      label: "Resumen profesional",
      type: "textarea",
      rows: 4,
      placeholder: "Resumen breve enfocado en logros y experiencia.",
      icon: PenTool,
    },
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-brand" />
        <h3 className="font-heading font-semibold text-brand-dark">Datos personales</h3>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        {fields.map((field) => (
          <div key={field.key} className="space-y-1.5">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <field.icon className="w-4 h-4 text-brand" />
              {field.label}
              {field.required && <span className="text-brand">*</span>}
            </label>
            {field.type === "textarea" ? (
              <textarea
                value={data[field.key] || ""}
                onChange={(e) => onChange(field.key, e.target.value)}
                rows={field.rows}
                placeholder={field.placeholder}
                className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-900 focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all"
              />
            ) : (
              <input
                type={field.type}
                value={data[field.key] || ""}
                onChange={(e) => onChange(field.key, e.target.value)}
                placeholder={field.placeholder}
                className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-900 focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all"
              />
            )}
          </div>
        ))}
      </form>

      <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 text-center">
        Los cambios se reflejan en la previsualización en tiempo real.
      </div>
    </div>
  );
}