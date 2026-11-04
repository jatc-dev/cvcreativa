import Icon from "./Icon";

const formatDate = (value) => {
  if (!value) return "";
  const [year, month] = value.split("-");
  const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  return `${months[parseInt(month) - 1]} ${year}`;
};

const DOCUMENT_TYPE_LABELS = {
  CC: "C.C.",
  CE: "C.E.",
  NIT: "NIT",
  TI: "T.I.",
  RC: "Reg. Civil",
  PA: "Pasaporte",
};

const MODALITY_LABELS = {
  tecnico: "Técnico",
  tecnologo: "Tecnólogo",
  universitario: "Universitario",
  especializacion: "Especialización",
  maestria: "Maestría",
};

export default function CVPreview({ data, template = "ats" }) {
  const { personal, experience, education, skills, personalRefs, familyRefs } = data;

  const renderATSTemplate = () => (
    <div className="ats-template max-w-[21cm] mx-auto bg-white p-[2cm] text-slate-900 font-sans antialiased">
      <header className="text-left mb-8 border-b-2 border-slate-300 pb-4">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <h1 className="font-heading font-bold text-3xl text-faca-900 tracking-tight">
              {personal.fullName || "Nombre Apellido"}
            </h1>
            {personal.photo && personal.showPhoto && (
              <img
                src={personal.photo}
                alt="Foto de perfil"
                className="mt-2 w-20 h-20 rounded-full object-cover border border-slate-200"
              />
            )}
            <p className="mt-1 text-faca-700 font-semibold text-lg uppercase tracking-wider">
              {personal.headline || "Titular profesional"}
            </p>
          </div>
          <div className="text-right md:text-left mt-4 md:mt-0 space-y-1 text-sm text-slate-600">
            {personal.email && <p className="flex items-center gap-1.5"><Icon name="Mail" className="w-4 h-4" size={0.5} /> {personal.email}</p>}
            {personal.phone && <p className="flex items-center gap-1.5"><Icon name="Phone" className="w-4 h-4" size={0.5} /> {personal.phone}</p>}
            {personal.cellphone && <p className="flex items-center gap-1.5"><Icon name="Phone" className="w-4 h-4" size={0.5} /> {personal.cellphone}</p>}
            {personal.location && <p className="flex items-center gap-1.5"><Icon name="MapPin" className="w-4 h-4" size={0.5} /> {personal.location}</p>}
            {personal.linkedin && <p className="flex items-center gap-1.5"><Icon name="Link" className="w-4 h-4" size={0.5} /> {personal.linkedin}</p>}
            {personal.github && <p className="flex items-center gap-1.5"><Icon name="Github" className="w-4 h-4" size={0.5} /> {personal.github}</p>}
          </div>
        </div>
      </header>

      {personal.summary && (
        <section className="mb-8 print:break-inside-avoid">
          <h2 className="font-heading font-bold text-faca-900 mb-3 border-b border-slate-200 pb-1 uppercase tracking-wider text-xs">
            Resumen Profesional
          </h2>
          <p className="text-slate-700 leading-relaxed">{personal.summary}</p>
        </section>
      )}

      <section className="mb-8 print:break-inside-avoid">
        <h2 className="font-heading font-bold text-faca-900 mb-3 border-b border-slate-200 pb-1 uppercase tracking-wider text-xs">
          Experiencia Laboral
        </h2>
        <div className="space-y-6">
          {experience.length > 0 ? (
            experience.map((exp) => (
              <div key={exp.id} className="space-y-2 print:break-inside-avoid">
                <div className="flex items-baseline justify-between gap-2">
                  <div>
                    <p className="font-bold text-faca-900">{exp.role}</p>
                    <p className="text-sm text-slate-600">{exp.company}</p>
                    {exp.location && <p className="text-xs text-slate-500 italic">{exp.location}</p>}
                  </div>
                  <span className="text-xs font-medium text-faca-700 bg-faca-50/50 px-2 py-0.5 rounded">
                    {formatDate(exp.startDate)} – {exp.current ? "Presente" : formatDate(exp.endDate)}
                  </span>
                </div>
                {exp.achievements.filter(Boolean).length > 0 && (
                  <ul className="list-disc list-inside space-y-1 text-sm text-slate-700 mt-1.5 pl-2">
                    {exp.achievements.filter(Boolean).map((ach, i) => (
                      <li key={i} className="leading-relaxed">{ach}</li>
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
        <section className="mb-8 print:break-inside-avoid">
          <h2 className="font-heading font-bold text-faca-900 mb-3 border-b border-slate-200 pb-1 uppercase tracking-wider text-xs">
            Educación y Certificaciones
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="flex items-baseline justify-between gap-2 print:break-inside-avoid">
                <div>
                  <p className="font-bold text-faca-900">{edu.title || edu.degree}</p>
                  <p className="text-sm text-slate-600">{edu.institution}</p>
                </div>
                <span className="text-xs font-medium text-faca-900">{edu.year}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="print:break-inside-avoid">
        <h2 className="font-heading font-bold text-faca-900 mb-4 border-b border-slate-200 pb-1 uppercase tracking-wider text-xs">
          Habilidades
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xs font-bold text-faca-700 uppercase tracking-wider mb-2">Técnicas</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-slate-700">
              {skills.technical.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-bold text-faca-700 uppercase tracking-wider mb-2">Blandas</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-slate-700">
              {skills.soft.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <footer className="mt-10 pt-6 border-t border-slate-100 text-center text-[10px] text-slate-400 uppercase tracking-widest">
        Generado con CVCreativa &bull; Formato ATS-friendly
      </footer>
    </div>
  );

  const renderExecutiveTemplate = () => (
    <div className="executive-template max-w-[21cm] mx-auto bg-white p-[2cm] text-slate-900 font-sans antialiased">
      <header className="relative mb-10 pb-6 border-b-4 border-accent-700">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-faca-700 via-accent-700 to-faca-700"></div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded bg-accent-700 flex items-center justify-center text-white font-bold">
                CV
              </div>
              <h1 className="font-heading font-bold text-3xl text-faca-900 tracking-tight">
                {personal.fullName || "Nombre Apellido"}
              </h1>
            </div>
            {personal.photo && personal.showPhoto && (
              <img
                src={personal.photo}
                alt="Foto de perfil"
                className="mt-2 w-24 h-24 rounded-full object-cover border-4 border-accent-50 shadow-lg"
              />
            )}
            <p className="mt-2 text-accent-700 font-semibold text-xl uppercase tracking-wider">
              {personal.headline || "Titular profesional"}
            </p>
          </div>
          <div className="text-right md:text-left mt-4 md:mt-0 space-y-1 text-sm text-slate-600">
            {personal.email && <p className="flex items-center gap-1.5"><Icon name="Mail" className="w-4 h-4 text-accent-700" size={0.5} /> {personal.email}</p>}
            {personal.phone && <p className="flex items-center gap-1.5"><Icon name="Phone" className="w-4 h-4 text-accent-700" size={0.5} /> {personal.phone}</p>}
            {personal.location && <p className="flex items-center gap-1.5"><Icon name="MapPin" className="w-4 h-4 text-accent-700" size={0.5} /> {personal.location}</p>}
            {personal.linkedin && <p className="flex items-center gap-1.5"><Icon name="Link" className="w-4 h-4 text-accent-700" size={0.5} /> {personal.linkedin}</p>}
            {personal.github && <p className="flex items-center gap-1.5"><Icon name="Github" className="w-4 h-4 text-accent-700" size={0.5} /> {personal.github}</p>}
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <aside className="lg:col-span-1 space-y-8 print:break-inside-avoid">
          <div className="border-l-4 border-accent-700 pl-4">
            <h2 className="font-heading font-bold text-sm text-accent-700 uppercase tracking-wider mb-4">
              Perfil
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">{personal.summary || "Resumen profesional no disponible."}</p>
          </div>

          <div className="border-l-4 border-faca-700 pl-4">
            <h2 className="font-heading font-bold text-sm text-faca-700 uppercase tracking-wider mb-4">
              Contacto
            </h2>
            <ul className="space-y-2 text-sm text-slate-600">
              {personal.email && <li className="flex items-center gap-2"><Icon name="Mail" className="w-4 h-4 text-faca-700" size={0.5} /> {personal.email}</li>}
              {personal.phone && <li className="flex items-center gap-2"><Icon name="Phone" className="w-4 h-4 text-faca-700" size={0.5} /> {personal.phone}</li>}
              {personal.cellphone && <li className="flex items-center gap-2"><Icon name="Phone" className="w-4 h-4 text-faca-700" size={0.5} /> {personal.cellphone}</li>}
              {personal.location && <li className="flex items-center gap-2"><Icon name="MapPin" className="w-4 h-4 text-faca-700" size={0.5} /> {personal.location}</li>}
              {personal.linkedin && <li className="flex items-center gap-2"><Icon name="Link" className="w-4 h-4 text-faca-700" size={0.5} /> {personal.linkedin}</li>}
              {personal.github && <li className="flex items-center gap-2"><Icon name="Github" className="w-4 h-4 text-faca-700" size={0.5} /> {personal.github}</li>}
            </ul>
          </div>

          <div className="border-l-4 border-accent-700 pl-4">
            <h2 className="font-heading font-bold text-sm text-accent-700 uppercase tracking-wider mb-4">
              Habilidades
            </h2>
            <div className="space-y-2">
              {[...skills.technical, ...skills.soft].map((s, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-xs text-slate-700">{s}</span>
                  <div className="w-full h-1 bg-slate-200 rounded-full">
                    <div className="h-1 bg-accent-700 rounded-full" style={{ width: "80%" }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <main className="lg:col-span-2 space-y-8">
          <section className="print:break-inside-avoid">
            <h2 className="font-heading font-bold text-sm text-faca-900 mb-4 border-b-2 border-accent-700 pb-1 uppercase tracking-wider">
              Experiencia Laboral
            </h2>
            <div className="space-y-6">
              {experience.length > 0 ? (
                experience.map((exp) => (
                  <div key={exp.id} className="space-y-2 print:break-inside-avoid">
                    <div className="flex items-baseline justify-between gap-2">
                      <div>
                        <p className="font-bold text-faca-900">{exp.role}</p>
                        <p className="text-sm text-accent-700 font-medium">{exp.company}</p>
                        {exp.location && <p className="text-xs text-slate-500 italic">{exp.location}</p>}
                      </div>
                      <span className="text-xs font-medium text-accent-700 bg-accent-50/50 px-2 py-0.5 rounded">
                        {formatDate(exp.startDate)} – {exp.current ? "Presente" : formatDate(exp.endDate)}
                      </span>
                    </div>
                    {exp.achievements.filter(Boolean).length > 0 && (
                      <ul className="list-disc list-inside space-y-1 text-sm text-slate-700 mt-1.5 pl-4">
                        {exp.achievements.filter(Boolean).map((ach, i) => (
                          <li key={i} className="leading-relaxed">{ach}</li>
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
            <section className="print:break-inside-avoid">
              <h2 className="font-heading font-bold text-sm text-faca-900 mb-4 border-b-2 border-accent-700 pb-1 uppercase tracking-wider">
                Educación y Certificaciones
              </h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="flex items-baseline justify-between gap-2 print:break-inside-avoid">
                    <div>
                      <p className="font-bold text-faca-900">{edu.title || edu.degree}</p>
                      <p className="text-sm text-slate-600">{edu.institution}</p>
                    </div>
                    <span className="text-xs font-medium text-accent-700">{edu.year}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>

      <footer className="mt-10 pt-6 border-t border-slate-100 text-center text-[10px] text-slate-400 uppercase tracking-widest">
        Generado con CVCreativa &bull; Alcaldía de Facatativá
      </footer>
    </div>
  );

  const renderMinervaTemplate = () => {
    const basicEdu = education.filter((e) => e.type === "basic");
    const higherEdu = education.filter((e) => e.type === "higher");
    const otherEdu = education.filter((e) => e.type === "other");

    return (
      <div className="minerva-template max-w-[21cm] mx-auto bg-white p-8 text-slate-900 font-sans antialiased print:p-6 print:m-0">
        {/* Header institutional */}
        <header className="mb-8 border-b-4 border-b-faca-700 pb-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-faca-700 flex items-center justify-center text-white font-bold text-sm">
                CM
              </div>
              <div>
                <h1 className="font-heading font-bold text-2xl text-faca-900 tracking-tight">
                  {personal.fullName || "Nombre Apellido"}
                </h1>
                <p className="text-accent-700 font-semibold text-sm uppercase tracking-wider">
                  {personal.headline || "Solicitante de empleo"}
                </p>
              </div>
            </div>
            {personal.photo && personal.showPhoto && (
              <img
                src={personal.photo}
                alt="Foto de perfil documento"
                className="w-16 h-16 rounded border-2 border-faca-700 object-cover"
              />
            )}
          </div>
        </header>

        {/* Datos Personales */}
        <section className="mb-6 print:break-inside-avoid">
          <h2 className="font-heading font-bold text-xs text-faca-900 mb-2 border-b-2 border-accent-700 pb-1 uppercase tracking-wider">
            Datos Personales e Identificación
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-faca-50/50 rounded p-3 border border-faca-100">
              <div className="text-[10px] text-faca-700 uppercase tracking-wider font-medium">Tipo y No. Documento</div>
              <div className="text-faca-900 font-medium">
                {DOCUMENT_TYPE_LABELS[personal.documentType] || personal.documentType} {personal.documentNumber || ""}
              </div>
            </div>
            {personal.militaryRecord && (
              <div className="bg-faca-50/50 rounded p-3 border border-faca-100">
                <div className="text-[10px] text-faca-700 uppercase tracking-wider font-medium">Libreta Militar</div>
                <div className="text-faca-900 font-medium">{personal.militaryRecord}</div>
              </div>
            )}
            <div className="bg-faca-50/50 rounded p-3 border border-faca-100">
              <div className="text-[10px] text-faca-700 uppercase tracking-wider font-medium">Fecha de Nacimiento</div>
              <div className="text-faca-900 font-medium">{formatDate(personal.birthDate) || "—"}</div>
            </div>
            <div className="bg-faca-50/50 rounded p-3 border border-faca-100">
              <div className="text-[10px] text-faca-700 uppercase tracking-wider font-medium">Lugar de Nacimiento</div>
              <div className="text-faca-900 font-medium">{personal.birthPlace || "—"}</div>
            </div>
            <div className="bg-faca-50/50 rounded p-3 border border-faca-100">
              <div className="text-[10px] text-faca-700 uppercase tracking-wider font-medium">Dirección de Residencia</div>
              <div className="text-faca-900 font-medium">{personal.address || "—"}</div>
            </div>
            <div className="bg-faca-50/50 rounded p-3 border border-faca-100">
              <div className="text-[10px] text-faca-700 uppercase tracking-wider font-medium">Ciudad / Municipio</div>
              <div className="text-faca-900 font-medium">{personal.city || "—"}</div>
            </div>
            <div className="bg-faca-50/50 rounded p-3 border border-faca-100">
              <div className="text-[10px] text-faca-700 uppercase tracking-wider font-medium">Departamento</div>
              <div className="text-faca-900 font-medium">{personal.department || "—"}</div>
            </div>
            <div className="bg-faca-50/50 rounded p-3 border border-faca-100">
              <div className="text-[10px] text-faca-700 uppercase tracking-wider font-medium">Teléfono Fijo</div>
              <div className="text-faca-900 font-medium">{personal.phone || "—"}</div>
            </div>
            <div className="bg-faca-50/50 rounded p-3 border border-faca-100">
              <div className="text-[10px] text-faca-700 uppercase tracking-wider font-medium">Celular</div>
              <div className="text-faca-900 font-medium">{personal.cellphone || "—"}</div>
            </div>
            <div className="bg-faca-50/50 rounded p-3 border border-faca-100">
              <div className="text-[10px] text-faca-700 uppercase tracking-wider font-medium">Correo Electrónico</div>
              <div className="text-faca-900 font-medium">{personal.email || "—"}</div>
            </div>
          </div>
        </section>

        {/* Educación Básica y Media */}
        {basicEdu.length > 0 && (
          <section className="mb-6 print:break-inside-avoid">
            <h2 className="font-heading font-bold text-xs text-faca-900 mb-2 border-b-2 border-accent-700 pb-1 uppercase tracking-wider">
              Educación Básica y Media
            </h2>
            <div className="space-y-2">
              {basicEdu.map((edu) => (
                <div key={edu.id} className="flex items-baseline justify-between gap-2">
                  <div>
                    <p className="font-bold text-faca-900 text-sm">{edu.level}</p>
                    <p className="text-sm text-slate-600">{edu.title}</p>
                    <p className="text-xs text-slate-500">{edu.institution}</p>
                  </div>
                  <span className="text-xs font-medium text-accent-700">{edu.year}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Educación Superior */}
        {higherEdu.length > 0 && (
          <section className="mb-6 print:break-inside-avoid">
            <h2 className="font-heading font-bold text-xs text-faca-900 mb-2 border-b-2 border-accent-700 pb-1 uppercase tracking-wider">
              Educación Superior (Pregrado / Postgrado)
            </h2>
            <div className="space-y-2">
              {higherEdu.map((edu) => (
                <div key={edu.id} className="flex items-baseline justify-between gap-2">
                  <div>
                    <p className="font-bold text-faca-900 text-sm">{edu.title}</p>
                    <p className="text-sm text-slate-600">{edu.institution}</p>
                    <p className="text-xs text-slate-500">{MODALITY_LABELS[edu.modality] || edu.modality}</p>
                    {edu.professionalCard && (
                      <p className="text-xs text-slate-500">Tarjeta Profesional: {edu.professionalCard}</p>
                    )}
                    {edu.semester && (
                      <p className="text-xs text-slate-500">Semestre: {edu.semester}</p>
                    )}
                  </div>
                  <span className="text-xs font-medium text-accent-700">{edu.year}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Otros Estudios */}
        {otherEdu.length > 0 && (
          <section className="mb-6 print:break-inside-avoid">
            <h2 className="font-heading font-bold text-xs text-faca-900 mb-2 border-b-2 border-accent-700 pb-1 uppercase tracking-wider">
              Otros Estudios (Cursos, Diplomados, Seminarios)
            </h2>
            <div className="space-y-2">
              {otherEdu.map((edu) => (
                <div key={edu.id} className="flex items-baseline justify-between gap-2">
                  <div>
                    <p className="font-bold text-faca-900 text-sm">{edu.title}</p>
                    <p className="text-sm text-slate-600">{edu.institution}</p>
                    {edu.hours && <p className="text-xs text-slate-500">{edu.hours} horas</p>}
                  </div>
                  <span className="text-xs font-medium text-accent-700">{edu.year}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experiencia Laboral */}
        {experience.length > 0 && (
          <section className="mb-6 print:break-inside-avoid">
            <h2 className="font-heading font-bold text-xs text-faca-900 mb-2 border-b-2 border-accent-700 pb-1 uppercase tracking-wider">
              Experiencia Laboral
            </h2>
            <div className="space-y-3">
              {experience.map((exp) => (
                <div key={exp.id} className="space-y-1 print:break-inside-avoid">
                  <div className="flex justify-between mb-1">
                    <p className="font-bold text-faca-900 text-sm">{exp.role}</p>
                    <span className="text-xs font-medium text-accent-700">
                      {formatDate(exp.startDate)} – {exp.current ? "Actual" : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <p className="text-sm text-slate-700">{exp.company}</p>
                  {exp.location && <p className="text-xs text-slate-500">{exp.location}</p>}
                  {exp.bossName && (
                    <p className="text-xs text-slate-600">Jefe inmediato: {exp.bossName}</p>
                  )}
                  {exp.bossPhone && (
                    <p className="text-xs text-slate-600">Teléfono jefe: {exp.bossPhone}</p>
                  )}
                  {exp.achievements.filter(Boolean).length > 0 && (
                    <ul className="list-disc list-inside space-y-1 text-xs text-slate-700 mt-1 pl-2">
                      {exp.achievements.filter(Boolean).map((ach, i) => (
                        <li key={i}>{ach}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Referencias Personales */}
        {personalRefs.length > 0 && (
          <section className="mb-6 print:break-inside-avoid">
            <h2 className="font-heading font-bold text-xs text-faca-900 mb-2 border-b-2 border-accent-700 pb-1 uppercase tracking-wider">
              Referencias Personales
            </h2>
            <div className="space-y-2">
              {personalRefs.map((ref) => (
                <div key={ref.id} className="flex items-baseline justify-between gap-2">
                  <div>
                    <p className="font-bold text-faca-900 text-sm">{ref.name}</p>
                    <p className="text-sm text-slate-600">{ref.occupation}</p>
                    <p className="text-xs text-slate-500">{ref.address}</p>
                  </div>
                  <span className="text-xs font-medium text-accent-700">{ref.phone}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Referencias Familiares o Laborales */}
        {familyRefs.length > 0 && (
          <section className="mb-6 print:break-inside-avoid">
            <h2 className="font-heading font-bold text-xs text-faca-900 mb-2 border-b-2 border-accent-700 pb-1 uppercase tracking-wider">
              Referencias Familiares o Laborales
            </h2>
            <div className="space-y-2">
              {familyRefs.map((ref) => (
                <div key={ref.id} className="flex items-baseline justify-between gap-2">
                  <div>
                    <p className="font-bold text-faca-900 text-sm">{ref.name}</p>
                    <p className="text-sm text-slate-600">{ref.company}</p>
                    <p className="text-xs text-slate-500">{ref.address}</p>
                  </div>
                  <span className="text-xs font-medium text-accent-700">{ref.phone}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        <footer className="mt-8 pt-4 border-t border-slate-100 text-center text-[9px] text-slate-400 uppercase tracking-widest">
          Formato Clásico Minerva 1003 &bull; Alcaldía de Facatativá
        </footer>
      </div>
    );
  };

  if (template === "executive") return renderExecutiveTemplate();
  if (template === "minerva") return renderMinervaTemplate();
  return renderATSTemplate();
}