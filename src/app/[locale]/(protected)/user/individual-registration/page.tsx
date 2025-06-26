'use client';

import React, { useState } from 'react';
import FormLayout from '@/components/forms/FormLayout';
import ProgressBar from '@/components/forms/ProgressBar';
import { DocumentType } from '@/types/document';
import { Users } from 'lucide-react';
import { steps } from '@/types/multiFormSteps';
import { generateReferenceId } from '@/utils/generateReferenceId';
import { IndividaulType } from '@/types/individual';

const IndividualRegistration: React.FC = () => {
  const stepKeys = ['individual', 'documents', 'success'];
  const filteredSteps = steps.filter(step => stepKeys.includes(step.key));

  const [step, setStep] = useState(0);

  const [documentsData, setDocumentsData] = useState<DocumentType>({
    documents: [],
  });

  const [individualData, setIndividualData] = useState<IndividaulType>({
    addl_name: '',
    given_name: '',
    family_name: '',
    email: '',
    phone: '',
    gender: '',
    birthdate: '',
    birth_place: '',
    reg_ids: [],
  });

  const handleNext = async () => {
    if (filteredSteps[step].key === 'documents') {
      try {
        // submission endpoint for documents
      } catch (error) {
        console.error('Submission error:', error);
        return;
      }
    }

    setStep(prev => Math.min(prev + 1, filteredSteps.length - 1));
  };

  const handleBack = () => {
    setStep(prev => Math.max(prev - 1, 0));
  };

  const renderStep = () => {
    const { Component: StepComponent, key } = filteredSteps[step];
    if (!StepComponent) return null;

    switch (key) {
      case 'individual':
        return <StepComponent formData={individualData} setFormData={setIndividualData} />;
      case 'documents':
        return (
          <StepComponent
            formData={documentsData}
            setFormData={(data: Partial<DocumentType>) =>
              setDocumentsData(prev => ({ ...prev, ...data }))
            }
          />
        );
      case 'success':
        return <StepComponent referenceId={generateReferenceId('individaul')} />;
    }
  };

  return (
    <FormLayout>
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full shadow-lg">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
            OpenG2P Individual Registration
          </h1>
        </div>
        <p className="text-gray-600 text-lg">Complete your registration in simple steps</p>
      </div>

      {/* Step Container */}
      <div className="max-w-full bg-gradient-to-r from-blue-50 to-indigo-50 shadow-xl rounded-3xl pb-8 mb-8">
        <ProgressBar currentStep={step} steps={filteredSteps} />

        <div className="text-center my-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Step {step + 1}: {filteredSteps[step].label}
          </h2>
          <p className="text-gray-600 text-base">{filteredSteps[step].description}</p>
        </div>

        <div className="w-4/5 mx-auto mb-8">{renderStep()}</div>

        {step < filteredSteps.length - 1 && (
          <div className="w-4/5 mx-auto mb-8 flex justify-between items-center">
            <button
              onClick={handleBack}
              disabled={step === 0}
              className={`px-6 py-2 font-bold rounded-md text-white bg-blue-600 hover:bg-blue-700 transition ${
                step === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <span>&lt;</span> Back
            </button>

            <button
              onClick={handleNext}
              className="px-6 py-2 font-bold rounded-md text-white bg-blue-600 hover:bg-blue-700 transition"
            >
              {step === filteredSteps.length - 2 ? 'Submit' : 'Next >'}
            </button>
          </div>
        )}
      </div>
    </FormLayout>
  );
};

export default IndividualRegistration;
