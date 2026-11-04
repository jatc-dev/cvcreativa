import Icon from "./Icon";

const formatDate = (value) => {
  if (!value) return "";
  const [year, month] = value.split("-");
  const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  return `${months[parseInt(month) - 1]} ${year}`;
};

export default function CVPreview({ data }) {
  const { personal, experience, education, skills } = data;

  return (
    <div className="cv-page max-w-[21cm] mx-auto bg-white p-8 text-slate-900 font-sans antialiased">
      <header className="text-center mb-8 border-b-2 border-brand-dark pb-6">
        <h1 className="font-heading font-bold text-4xl text-brand-dark tracking-tight">
          {personal.fullName || "Nombre Apellido"}
        </h1>
        <p className="mt-1.5 text-brand font-semibold text-lg uppercase tracking-wider">
          {personal.headline || "Titular profesional"}
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm text-slate-600">
          {personal.email && (
            <span className="flex items-center gap-1.5">
              <Icon name="Mail" className="text-slate-500" size={0.5} />
              {personal.email}
            </span>
          )}
          {personal.phone && (
            <span className="flex items-center gap-1.5">
              <Icon name="Phone" className="text-slate-500" size={0.5} />
              {personal.phone}
            </span>
          )}
          {personal.location && (
            <span className="flex items-center gap-1.5">
              <Icon name="MapPin" className="text-slate-500" size={0.5} />
              {personal.location}
            </span>
          )}
          {personal.linkedin && (
            <span className="flex items-center gap-1.5">
              <Icon name="Link" className="text-slate-500" size={0.5} />
              {personal.linkedin}
            </span>
          )}
          {personal.github && (
            <span className="flex items-center gap-1.5">
              <Icon name="Github" className="text-slate-500" size={0.5} />
              {personal.github}
            </span>
          )}
        </div>
      </header>

      <section className="mb-8">
        <h2 className="font-heading font-bold text-brand-dark mb-3 border-b border-slate-200 pb-1 uppercase tracking-wider text-xs">
          Experiencia laboral
        </h2>
        <div className="space-y-6">
          {experience.length > 0 ? (
            experience.map((exp) => (
              <div key={exp.id} className="space-y-2">
                <div className="flex items-baseline justify-between gap-2">
                  <div>
                    <p className="font-bold text-brand-dark">{exp.role}</p>
                    <p className="text-sm text-slate-600">{exp.company}</p>
                  </div>
                  <span className="text-xs font-medium text-brand bg-brand-light/50 px-2 py-0.5 rounded">
                    {formatDate(exp.startDate)} – {exp.current ? "Presente" : formatDate(exp.endDate)}
                  </span>
                </div>
                {exp.location && <p className="text-xs text-slate-500 italic">{exp.location}</p>}
                {exp.achievements.filter(Boolean).length > 0 && (
                  <ul className="list-disc list-inside space-y-1 text-sm text-slate-700 mt-1.5 pl-2">
                    {exp.achievements.filter(Boolean).map((ach, i) => (
                      <li key={i} className="leading-relaxed">
                        {ach}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))
          ) : (
            <p className="text-slate-400 text-sm italic">Sin experiencia registrada.</p>
          )}
        </div>
      </section>

      {education.length > 0 && (
        <section className="mb-8">
          <h2 className="font-heading font-bold text-brand-dark mb-3 border-b border-slate-200 pb-1 uppercase tracking-wider text-xs">
            Educación y certificaciones
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="flex items-baseline justify-between gap-2">
                <div>
                  <p className="font-bold text-brand-dark">{edu.degree}</p>
                  <p className="text-sm text-slate-600">{edu.institution}</p>
                </div>
                <span className="text-xs font-medium text-brand-dark">{edu.year}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="font-heading font-bold text-brand-dark mb-4 border-b border-slate-200 pb-1 uppercase tracking-wider text-xs">
          Habilidades
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xs font-bold text-brand uppercase tracking-wider mb-2">Técnicas</h3>
            <div className="flex flex-wrap gap-2">
              {skills.technical.map((s) => (
                <span key={s} className="px-3 py-1.5 rounded bg-brand-light text-brand text-xs font-medium border border-brand/20">
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xs font-bold text-brand uppercase tracking-wider mb-2">Blandas</h3>
            <div className="flex flex-wrap gap-2">
              {skills.soft.map((s) => (
                <span key={s} className="px-3 py-1.5 rounded bg-brand-light text-brand text-xs font-medium border border-brand/20">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="mt-10 pt-6 border-t border-slate-100 text-center text-[10px] text-slate-400 uppercase tracking-widest">
        Generado con CVCreativa &bull; Formato ATS-friendly
      </footer>
    </div>
  );
}