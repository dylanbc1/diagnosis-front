interface ProgressStepsProps {
  currentStep: 'one' | 'two' | 'three';
}

export default function ProgressSteps({ currentStep }: ProgressStepsProps) {
  const steps = [
    { step: 'one', label: 'Diagnóstico' },
    { step: 'two', label: 'Examen' },
    { step: 'three', label: 'Comentarios' },
  ];

  return (
    <div className="max-w-4xl mx-auto mb-8">
      <div className="flex items-center justify-center gap-4">
        {steps.map((item, index) => {
          const isCurrentStep = currentStep === item.step;
          const isCompletedStep =
            steps.findIndex((step) => step.step === currentStep) > index;

          return (
            <div key={item.step} className="flex items-center">
              {/* Bola del paso */}
              <div
                className={`flex items-center justify-center font-semibold rounded-full ${
                  isCurrentStep
                    ? 'w-10 h-10 bg-blue-500 text-white border-4 border-blue-100'
                    : isCompletedStep
                    ? 'w-8 h-8 bg-blue-200 text-blue-500'
                    : 'w-8 h-8 bg-slate-200 text-slate-600'
                }`}
              >
                {index + 1}
              </div>
              {/* Etiqueta del paso */}
              <div
                className={`ml-2 font-semibold ${
                  isCurrentStep
                    ? 'text-blue-500'
                    : isCompletedStep
                    ? 'text-blue-400'
                    : 'text-slate-400'
                }`}
              >
                {item.label}
              </div>
              {/* Línea de conexión */}
              {index < steps.length - 1 && (
                <div
                  className={`w-16 h-0.5 ${
                    isCurrentStep || isCompletedStep
                      ? 'bg-blue-200'
                      : 'bg-slate-200'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
