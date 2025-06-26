'use client';

import React, { useEffect, useRef } from 'react';


// This prevents Bootstrap/Formio global styles from leaking into the rest of the app.
const BOOTSTRAP_CSS = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
const FORMIO_CSS = 'https://cdn.jsdelivr.net/npm/formiojs@latest/dist/formio.full.min.css';

interface AdditionalInfoFormProps {
  formData: { additional_info?: Record<string, any> };
  setFormData: (data: Partial<{ additional_info: Record<string, any> }>) => void;
  formSchema: { components: any[] };
}

const AdditionalInfoForm: React.FC<AdditionalInfoFormProps> = ({
  formData,
  setFormData,
  formSchema
}) => {
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (formRef.current && formSchema) {
      import('@formio/js').then(({ Formio }) => {
        Formio.createForm(formRef.current, formSchema, {
          submission: { data: formData.additional_info || {} },
        }).then((form: any) => {
          form.on('change', (submission: { data: Record<string, any> }) => {
            setFormData({ additional_info: submission.data });
          });
        });
      });
    }
  }, [formSchema, setFormData]);

  return (
   <div className="max-w-full mb-12 p-6 bg-[#F9FAFB] rounded-[10px] border-0">
    <link rel="stylesheet" href={BOOTSTRAP_CSS} />
    <link rel="stylesheet" href={FORMIO_CSS} />
    <div ref={formRef}></div>
  </div>
  );
};

export default AdditionalInfoForm;
