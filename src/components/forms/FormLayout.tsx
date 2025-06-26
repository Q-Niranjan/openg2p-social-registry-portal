// components/FormLayout.tsx
import React from 'react';

interface FormLayoutProps {
  children: React.ReactNode;
}

const FormLayout: React.FC<FormLayoutProps> = ({ children }) => {
  return (
    <div className="flex justify-center items-start min-h-screen p-6 md:p-4 sm:p-2">
      <div className="p-8 w-4/5 h-auto relative border-none md:p-6 md:rounded-lg sm:p-4 sm:rounded-md">
        {children}
      </div>
    </div>
  );
};

export default FormLayout;
