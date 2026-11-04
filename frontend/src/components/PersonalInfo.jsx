import Icon from "./Icon";

export default function PersonalInfo({ data, onChange }) {
  const fields = [
    {
      key: "fullName",
      label: "Nombres y apellidos",
      type: "text",
      placeholder: "Ej. Ana María Rojas",
      icon: "User",
      required: true,
    },
    {
      key: "headline",
      label: "Titular de impacto",
      type: "text",
      placeholder: "Ej. Técnico en Logística",
      icon: "Briefcase",
      required: true,
    },
    {
      key: "email",
      label: "Correo electrónico",
      type: "email",
      placeholder: "juan.perez@email.com",
      icon: "Mail",
    },
    {
      key: "phone",
      label: "Teléfono",
      type: "tel",
      placeholder: "Ej. 310 123 4567",
      icon: "Phone",
    },
    {
      key: "location",
      label: "Ubicación",
      type: "text",
      placeholder: "Ej. Facatativá, Cundinamarca",
      icon: "MapPin",
    },
    {
      key: "linkedin",
      label: "LinkedIn",
      type: "url",
      placeholder: "linkedin.com/in/juanperez",
      icon: "Link",
    },
    {
      key: "github",
      label: "GitHub",
      type: "url",
      placeholder: "github.com/juanperez",
      icon: "Github",
    },
  ];

  return (
    <div className="space-y-5">
        <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-faca-700" />
        <h3 className="font-heading font-semibold text-faca-900">Datos de contacto y titular</h3>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.slice(0, 2).map((field) => (
            <div key={field.key} className="space-y-1.5">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <Icon name={field.icon} className="text-faca-700" size={0.5} />
                {field.label}
                {field.required && <span className="text-faca-700">*</span>}
              </label>
              <input
                type={field.type}
                value={data.personal[field.key] || ""}
                onChange={(e) => onChange("personal", { ...data.personal, [field.key]: e.target.value })}
                placeholder={field.placeholder}
                className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-900 focus:ring-2 focus:ring-faca-700 focus:border-transparent outline-none transition-all"
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {fields.slice(2).map((field) => (
            <div key={field.key} className="space-y-1.5">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <Icon name={field.icon} className="text-faca-700" size={0.5} />
                {field.label}
              </label>
              <input
                type={field.type}
                value={data.personal[field.key] || ""}
                onChange={(e) => onChange("personal", { ...data.personal, [field.key]: e.target.value })}
                placeholder={field.placeholder}
                className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-900 focus:ring-2 focus:ring-faca-700 focus:border-transparent outline-none transition-all"
              />
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}