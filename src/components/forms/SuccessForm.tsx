'use client';

import React from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { CheckCircle, Download, ArrowRight } from 'lucide-react';
import { useLocale } from 'next-intl';
import { jsPDF } from 'jspdf';

interface SuccessFormProps {
  referenceId: string;
}

const SuccessForm: React.FC<SuccessFormProps> = ({ referenceId }) => {
  const lang = useLocale();

  const handleDownloadConfirmation = () => {
    let submittedBy = 'Anonymous';

    try {
      const profileRaw = localStorage.getItem('profile');
      if (profileRaw) {
        const profile = JSON.parse(profileRaw);
        const { addl_name = '', given_name = '', family_name = '' } = profile;
        submittedBy = `${addl_name} ${given_name} ${family_name}`.trim() || 'Anonymous';
      }
    } catch (error) {
      console.error('Error parsing profile from localStorage:', error);
    }

    const submittedAt = new Date().toLocaleString();
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('OpenG2P Registration Confirmation', 20, 40);
    doc.setLineWidth(0.5);
    doc.line(20, 45, 190, 45);

    doc.setFontSize(12);
    doc.text(`Reference ID: ${referenceId}`, 20, 60);
    doc.text(`Submitted By: ${submittedBy}`, 20, 70);
    doc.text(`Submitted At: ${submittedAt}`, 20, 80);

    doc.setFontSize(14);
    doc.text('Registration Status: SUCCESSFUL', 20, 100);

    const confirmationText =
      'Your OpenG2P registration has been completed successfully. Please keep this confirmation document for your records. You will receive a confirmation email shortly with additional details.';
    doc.setFontSize(11);
    doc.text(confirmationText, 20, 120, {
      maxWidth: 170,
    });

    doc.setFontSize(10);
    doc.text('This is an automatically generated confirmation document.', 20, 160);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, 170);

    doc.save(`OpenG2P-Confirmation-${referenceId}.pdf`);
    toast.success('Confirmation PDF downloaded successfully!');
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded-2xl shadow-lg text-center">
      {/* Icon */}
      <div className="relative mb-6">
        <div className="flex justify-center items-center w-20 h-20 mx-auto bg-green-100 rounded-full">
          <CheckCircle className="text-green-600 w-10 h-10" />
        </div>
        <div className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 w-[100px] h-[100px] border-4 border-green-200 rounded-full z-[-1]"></div>
      </div>

      {/* Content */}
      <div>
        <h1 className="text-2xl font-semibold mb-2 text-gray-800">Registration Successful!</h1>
        <p className="text-gray-600 mb-6">
          Your OpenG2P registration has been completed successfully.
          You will receive a confirmation email shortly.
        </p>

        <div className="mt-6">
          <span className="text-sm font-semibold text-gray-600">Reference ID</span>
        </div>
        <div className="text-lg font-medium text-blue-700 bg-blue-50 px-4 py-2 mt-2 rounded-lg inline-block">
          {referenceId}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-4 items-stretch mt-8 sm:flex-row sm:justify-center">
        <button
          onClick={handleDownloadConfirmation}
          className="flex items-center justify-center gap-2 bg-blue-700 text-white font-medium py-3 px-6 rounded-lg hover:bg-blue-800 transition"
        >
          <Download className="w-5 h-5" />
          Download Confirmation
        </button>

        <Link
          href={`/${lang}/dashboard`}
          className="flex items-center justify-center gap-2 bg-gray-100 text-gray-800 border border-gray-300 py-3 px-6 rounded-lg hover:bg-gray-200 transition"
        >
          Continue to Dashboard
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
};

export default SuccessForm;
