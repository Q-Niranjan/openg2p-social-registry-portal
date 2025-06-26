'use client';

import React from 'react';

interface Step {
  label: string;
  icon: React.ElementType;
  description: string;
}

interface ProgressBarProps {
  currentStep: number;
  steps: Step[];
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, steps }) => {
  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="w-full bg-gradient-to-r from-blue-600 via-indigo-700 to-violet-500 text-white p-8 rounded-t-3xl">
      {/* Progress Line */}
      <div className="relative mb-8">
        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-md shadow-yellow-500 transition-all duration-700 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Dots */}
        <div className="absolute top-[-6px] left-0 w-full flex justify-between">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-4 h-4 rounded-full border-4 transition-all duration-300 ${
                index <= currentStep
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-500 shadow-[0_0_0_2px_white]'
                  : 'bg-white/30 border-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Step Indicators */}
      <div className="relative flex justify-between items-start">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index <= currentStep;
          const isCurrent = index === currentStep;

          return (
            <div key={index} className="text-center flex-1 relative">
              {/* Icon */}
              <div
                className={`relative w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 ${
                  isActive
                    ? 'bg-white text-blue-600 shadow-lg'
                    : 'bg-white/20 text-white/60'
                } ${isCurrent ? 'ring-4 ring-white/30 scale-110' : ''}`}
              >
                <Icon className="w-7 h-7 z-10" />
                {isActive && (
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 opacity-20 animate-pulse" />
                )}
              </div>

              {/* Label */}
              <div className="text-white/85">
                <h3
                  className={`font-semibold text-sm mb-1 ${
                    isCurrent ? 'text-yellow-400' : ''
                  }`}
                >
                  {step.label}
                </h3>
              </div>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="absolute top-8 left-1/2 w-full h-0.5 -translate-x-1/2 z-[-1]">
                  <div
                    className={`w-full h-full transition-all duration-700 ${
                      index < currentStep
                        ? 'bg-gradient-to-r from-yellow-400 to-orange-500'
                        : 'bg-white/20'
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;
