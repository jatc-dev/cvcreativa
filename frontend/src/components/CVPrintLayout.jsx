export default function CVPrintLayout({ children, onClose }) {
  return (
    <div className="no-print fixed inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-sm p-4 print:bg-transparent print:backdrop-blur-none">
      <div className="bg-white rounded-2xl shadow-2xl max-w-[21cm] w-full max-h-[90vh] overflow-y-auto p-8 print-only relative print:block print:absolute print:inset-0 print:w-full print:h-full print:bg-white print:p-8 print:shadow-none print:rounded-none print:z-50">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-slate-500 hover:text-slate-900 transition-colors print:hidden"
          aria-label="Cerrar previsualización de impresión"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style={{ display: "inline-block", width: "1.25rem", height: "1.25rem" }}>
            <line x1="18" x2="6" y1="6" y2="18"></line>
            <line x1="6" x2="18" y1="6" y2="18"></line>
          </svg>
        </button>
        <div className="mt-8">{children}</div>
        <div className="mt-6 flex justify-end print:hidden">
          <button
            onClick={() => window.print()}
            className="px-5 py-2.5 text-sm font-bold text-white bg-accent-700 rounded-lg shadow-accent hover:bg-accent-900 transition-colors print:hidden"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style={{ display: "inline-block", width: "1.25rem", height: "1.25rem", marginRight: "0.5rem" }}>
              <polyline points="21,15 21,4 5,4 5,15"></polyline>
              <path d="M7,10l5,5 5,-5"></path>
            </svg>
            Imprimir / Guardar PDF
          </button>
        </div>
      </div>
    </div>
  );
}