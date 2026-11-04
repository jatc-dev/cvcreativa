import Icon from "./Icon";

export default function PersonalInfo({ data, onChange }) {
  const fields = [
    {
      key: "fullName",
      label: "Nombres y apellidos",
      type: "text",
      placeholder: "Juan Pérez García",
      icon: "User",
      required: true,
    },
    {
      key: "headline",
      label: "Titular de impacto",
      type: "text",
      placeholder: "Desarrollador Full Stack con 3+ años optimizando arquitecturas cloud",
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
      placeholder: "+57 300 123 4567",
      icon: "Phone",
    },
    {
      key: "location",
      label: "Ubicación",
      type: "text",
      placeholder: "Bogotá, Colombia",
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
        <div className="w-2 h-2 rounded-full bg-brand" />
        <h3 className="font-heading font-semibold text-brand-dark">Datos de contacto y titular</h3>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.slice(0, 2).map((field) => (
            <div key={field.key} className="space-y-1.5">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <Icon name={field.icon} className="text-brand" size={0.5} />
                {field.label}
                {field.required && <span className="text-brand">*</span>}
              </label>
              <input
                type={field.type}
                value={data.personal[field.key] || ""}
                onChange={(e) => onChange("personal", { ...data.personal, [field.key]: e.target.value })}
                placeholder={field.placeholder}
                className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-900 focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all"
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {fields.slice(2).map((field) => (
            <div key={field.key} className="space-y-1.5">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <Icon name={field.icon} className="text-brand" size={0.5} />
                {field.label}
              </label>
              <input
                type={field.type}
                value={data.personal[field.key] || ""}
                onChange={(e) => onChange("personal", { ...data.personal, [field.key]: e.target.value })}
                placeholder={field.placeholder}
                className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-900 focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all"
              />
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}