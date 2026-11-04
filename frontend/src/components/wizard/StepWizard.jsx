export default function StepWizard({ activeStep, steps, onNext, onPrev, onStepChange, canNext }) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6 border-b border-slate-200 pb-4">
        <div className="flex -space-x-2">
          {steps.map((step, index) => {
            const isActive = index === activeStep;
            const isCompleted = index < activeStep;
            return (
              <div key={step.id} className="flex items-center gap-2 relative z-10">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    isActive
                      ? "bg-brand text-white shadow-brand"
                      : isCompleted
                      ? "bg-green-600 text-white"
                      : "bg-slate-200 text-slate-500 border border-slate-300"
                  }`}
                >
                  {isCompleted ? "✓" : index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-1 w-8 flex-shrink-0 ${
                    isCompleted ? "bg-green-400" : "bg-slate-200"
                  }`} />
                )}
                <span className={`text-sm font-medium transition-colors ${isActive ? "text-brand-dark" : "text-slate-500"}`}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="font-bold text-brand-dark">{activeStep + 1}</span>
          <span>/</span>
          <span>{steps.length}</span>
        </div>
      </div>

      <div className="flex items-center justify-between px-4">
        <button
          onClick={onPrev}
          disabled={activeStep === 0}
          className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Anterior
        </button>
        <button
          onClick={onNext}
          disabled={!canNext(activeStep)}
          className="px-6 py-2 text-sm font-medium text-white bg-brand-dark hover:bg-purple-700 rounded-lg shadow-brand disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {activeStep === steps.length - 1 ? "Finalizar y Previsualizar" : "Siguiente"}
        </button>
      </div>
    </div>
  );
}