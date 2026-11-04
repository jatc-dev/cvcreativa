import Icon from "./Icon";

const TEMPLATES = [
  {
    id: "ats",
    label: "ATS Moderna y Limpia",
    description: "Una sola columna, texto plano, optimizada para reclutadores automatizados",
    icon: "FileText",
    color: "faca",
  },
  {
    id: "executive",
    label: "Ejecutiva / Institucional",
    description: "Diseño dinámico con acentos verdes y rojos de la Alcaldía de Facatativá",
    icon: "Briefcase",
    color: "accent",
  },
  {
    id: "minerva",
    label: "Clásico Minerva (Colombia)",
    description: "Formato estructurado estándar Minerva 1003 para cargos operativos, técnicos y administrativos",
    icon: "FileText",
    color: "faca",
  },
];

export default function TemplateSelector({ template, onTemplateChange }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-faca-700" />
        <h3 className="font-heading font-semibold text-faca-900">Seleccionar plantilla de CV</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {TEMPLATES.map((tpl) => {
          const isActive = template === tpl.id;
          const colorClass = tpl.color === "faca" ? "faca-700" : "accent-700";
          const bgClass = tpl.color === "faca" ? "faca-50" : "accent-50";
          const borderClass = isActive ? `border-${colorClass}` : "border-slate-200";
          const shadowClass = isActive ? `shadow-${tpl.color}` : "shadow-sm";

          return (
            <button
              key={tpl.id}
              onClick={() => onTemplateChange(tpl.id)}
              type="button"
              className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 ${borderClass} bg-white ${shadowClass} hover:border-${colorClass}/50 transition-all group cursor-pointer ${isActive ? "bg-${bgClass} border-${colorClass}" : "hover:bg-slate-50"}`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-1 ${isActive ? `text-white bg-${colorClass}` : "text-slate-400 bg-slate-100"}`}>
                <Icon name={tpl.icon} className="" size={0.5} />
              </div>
              <div className="text-center">
                <h4 className={`font-bold text-xs ${isActive ? `text-${colorClass}` : "text-slate-700"}`}>
                  {tpl.label}
                </h4>
                <p className="text-[10px] text-slate-500 leading-tight">{tpl.description}</p>
              </div>
              {isActive && (
                <div className="w-4 h-4 rounded-full bg-accent-700 flex items-center justify-center">
                  <Icon name="ChevronRight" className="w-2.5 h-2.5 text-white" size={0.3} />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}