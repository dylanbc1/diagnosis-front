import React from 'react';

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
    <div className="w-full py-4">
      <div className="flex justify-between items-center max-w-3xl mx-auto px-4">
        {steps.map((item, index) => {
          const isCurrentStep = currentStep === item.step;
          const isCompletedStep =
            steps.findIndex((step) => step.step === currentStep) > index;

          return (
            <div key={item.step} className="flex flex-col font-semibold items-center relative flex-1">
              {/* Línea conectora con z-index bajo */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-5 -right-1/2 w-full z-0">
                  <div
                    className={`h-[2px] ${
                      isCompletedStep ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                </div>
              )}

              {/* Círculo con z-index alto */}
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center shadow-md z-10 relative
                  ${
                    isCompletedStep
                      ? 'bg-blue-600 text-white'
                      : isCurrentStep
                      ? 'bg-white border-2 border-blue-600 text-blue-600'
                      : 'bg-white border-2 border-gray-300 text-gray-500'
                  }
                `}
              >
                {index + 1}
              </div>

              {/* Etiqueta */}
              <span
                className={`
                  mt-2 text-sm font-semibold z-10 relative
                  ${
                    isCompletedStep || isCurrentStep
                      ? 'text-blue-600'
                      : 'text-gray-500'
                  }
                `}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}