import Icon from "./Icon";
import PhotoUpload from "./PhotoUpload";

const DOCUMENT_TYPES = [
  { value: "CC", label: "Cédula de Ciudadanía" },
  { value: "CE", label: "Cédula de Extranjería" },
  { value: "NIT", label: "NIT" },
  { value: "TI", label: "Tarjeta de Identidad" },
  { value: "RC", label: "Registro Civil" },
  { value: "PA", label: "Pasaporte" },
];

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
      key: "documentType",
      label: "Tipo de documento",
      type: "select",
      icon: "MapPin",
      required: true,
    },
    {
      key: "documentNumber",
      label: "Número de documento",
      type: "text",
      placeholder: "Ej. 1.234.567",
      icon: "MapPin",
      required: true,
    },
    {
      key: "militaryRecord",
      label: "Libreta Militar (Clase y Distrito)",
      type: "text",
      placeholder: "Ej. Clase 2, Distrito 07",
      icon: "Briefcase",
    },
    {
      key: "birthDate",
      label: "Fecha de nacimiento",
      type: "date",
      icon: "Calendar",
    },
    {
      key: "birthPlace",
      label: "Lugar de nacimiento (Municipio, Departamento)",
      type: "text",
      placeholder: "Ej. Facatativá, Cundinamarca",
      icon: "MapPin",
    },
    {
      key: "address",
      label: "Dirección de residencia",
      type: "text",
      placeholder: "Ej. Calle 10 # 4-20",
      icon: "MapPin",
    },
    {
      key: "city",
      label: "Ciudad / Municipio",
      type: "text",
      placeholder: "Ej. Facatativá",
      icon: "MapPin",
    },
    {
      key: "department",
      label: "Departamento",
      type: "text",
      placeholder: "Ej. Cundinamarca",
      icon: "MapPin",
    },
    {
      key: "phone",
      label: "Teléfono fijo",
      type: "tel",
      placeholder: "Ej. 601 123 4567",
      icon: "Phone",
    },
    {
      key: "cellphone",
      label: "Celular",
      type: "tel",
      placeholder: "Ej. 310 123 4567",
      icon: "Phone",
    },
    {
      key: "email",
      label: "Correo electrónico",
      type: "email",
      placeholder: "juan.perez@email.com",
      icon: "Mail",
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
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-faca-700" />
        <h3 className="font-heading font-semibold text-faca-900">Datos personales e identificación</h3>
      </div>

      <PhotoUpload
        photo={data.personal.photo}
        showPhoto={data.personal.showPhoto}
        onPhotoChange={(val) => onChange("personal", { ...data.personal, photo: val })}
        onToggleShowPhoto={() => onChange("personal", { ...data.personal, showPhoto: !data.personal.showPhoto })}
      />

      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields
            .filter((f) => ["fullName", "headline"].includes(f.key))
            .map((field) => (
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields
            .filter(
              (f) =>
                ["documentType", "documentNumber", "militaryRecord", "birthDate", "birthPlace", "address", "city", "department", "phone", "cellphone", "email"].includes(f.key)
            )
            .map((field) => {
              if (field.key === "documentType") {
                return (
                  <div key={field.key} className="space-y-1.5">
                    <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                      <Icon name={field.icon} className="text-faca-700" size={0.5} />
                      {field.label}
                      {field.required && <span className="text-faca-700">*</span>}
                    </label>
                    <select
                      value={data.personal[field.key] || ""}
                      onChange={(e) => onChange("personal", { ...data.personal, [field.key]: e.target.value })}
                      className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-900 focus:ring-2 focus:ring-faca-700 focus:border-transparent outline-none transition-all"
                    >
                      <option value="">Seleccionar tipo</option>
                      {DOCUMENT_TYPES.map((dt) => (
                        <option key={dt.value} value={dt.value}>
                          {dt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              }
              return (
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
              );
            })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields
            .filter((f) => ["linkedin", "github"].includes(f.key))
            .map((field) => (
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