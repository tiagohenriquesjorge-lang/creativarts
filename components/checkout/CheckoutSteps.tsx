'use client'

import { Check } from 'lucide-react'

interface Step {
  number: number
  title: string
  description: string
}

interface CheckoutStepsProps {
  currentStep: number
  steps: Step[]
}

export default function CheckoutSteps({ currentStep, steps }: CheckoutStepsProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-1">
            {/* Step Circle */}
            <div className="flex flex-col items-center">
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm
                  transition-all duration-300
                  ${currentStep > step.number
                    ? 'bg-green-500 text-white'
                    : currentStep === step.number
                    ? 'bg-brand-blue text-white ring-4 ring-brand-blue/20'
                    : 'bg-brand-gray-light text-brand-gray-dark/50'
                  }
                `}
              >
                {currentStep > step.number ? (
                  <Check className="h-5 w-5" />
                ) : (
                  step.number
                )}
              </div>
              
              {/* Step Info */}
              <div className="mt-2 text-center hidden sm:block">
                <p
                  className={`
                    text-sm font-semibold
                    ${currentStep >= step.number ? 'text-brand-gray-dark' : 'text-brand-gray-dark/50'}
                  `}
                >
                  {step.title}
                </p>
                <p className="text-xs text-brand-gray-dark/60 mt-0.5">
                  {step.description}
                </p>
              </div>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={`
                  flex-1 h-0.5 mx-2 transition-all duration-300
                  ${currentStep > step.number ? 'bg-green-500' : 'bg-brand-gray-light'}
                `}
              />
            )}
          </div>
        ))}
      </div>

      {/* Mobile Step Info */}
      <div className="mt-4 sm:hidden text-center">
        <p className="text-sm font-semibold text-brand-gray-dark">
          {steps[currentStep - 1]?.title}
        </p>
        <p className="text-xs text-brand-gray-dark/60 mt-0.5">
          {steps[currentStep - 1]?.description}
        </p>
      </div>
    </div>
  )
}

