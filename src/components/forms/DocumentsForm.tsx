'use client';

import React, { useState, useRef } from 'react';
import {
  DocumentType,
  identifyDocumentType,
  getDocumentStatus,
  getUploadedFile,
  documentRequirements
} from '@/types/document';

interface DocumentsFormProps {
  formData: DocumentType;
  setFormData: (data: Partial<DocumentType>) => void;
}

const DocumentsForm: React.FC<DocumentsFormProps> = ({ formData, setFormData }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const newFiles = Array.from(files).filter((file) =>
      ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'].includes(file.type)
    );

    const updatedFiles = [
      ...formData.documents,
      ...newFiles.filter(
        (newFile) => !formData.documents.some((f) => f.name === newFile.name)
      ),
    ];

    setFormData({ documents: updatedFiles });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(e.target.files);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRemove = (index: number) => {
    const updatedFiles = [...formData.documents];
    updatedFiles.splice(index, 1);
    setFormData({ documents: updatedFiles });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-8">
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-xl p-12 text-center bg-slate-50 cursor-pointer transition-all duration-300 mb-8 focus-within:outline-2 focus-within:outline-blue-500 focus-within:outline-offset-2 hover:border-blue-500 hover:bg-slate-100 ${
          isDragging ? 'border-blue-500 bg-blue-50 border-solid' : 'border-slate-300'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleUploadClick}
      >
        <div className={`mb-4 flex justify-center transition-colors ${isDragging ? 'text-blue-500' : 'text-slate-400'}`}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14,2 14,8 20,8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10,9 9,9 8,9" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-700 mb-2">Click to upload documents</h3>
        <p className="text-sm text-gray-500">Supported formats: PDF, JPG, PNG</p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleInputChange}
          accept=".pdf,.jpg,.jpeg,.png"
          className="hidden"
        />
      </div>

      {/* Uploaded Document List */}
      {formData.documents.length > 0 && (
        <div className="mb-8">
          {formData.documents.map((file, index) => {
            const docType = identifyDocumentType(file.name);
            return (
              <div key={index} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg mb-3 transition-all duration-200 hover:shadow-md hover:border-gray-300 border-green-200 bg-green-50">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0">
                    <div className="bg-green-200 text-green-600 rounded-full w-8 h-8 flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20,6 9,17 4,12" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">{docType?.title || 'Document'}</h4>
                    <p className="text-xs text-gray-500">{file.name}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-all duration-200 focus:outline-2 focus:outline-blue-500 focus:outline-offset-2"
                  aria-label="Remove document"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Required Document Checklist */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Required Documents</h3>
        {documentRequirements.documents.map((requirement) => {
          const status = getDocumentStatus(requirement, formData.documents);
          const uploadedFile = getUploadedFile(requirement, formData.documents);

          return (
            <div
              key={requirement.id}
              className={`flex items-center gap-3 p-4 rounded-lg mb-3 last:mb-0 transition-all duration-200 ${
                status === 'uploaded' 
                  ? 'bg-green-50 border border-green-200' 
                  : 'bg-amber-50 border border-amber-200'
              }`}
            >
              <div className={`flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0 ${
                status === 'uploaded' 
                  ? 'bg-green-200 text-green-600' 
                  : 'bg-amber-200 text-amber-600'
              }`}>
                {status === 'uploaded' ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20,6 9,17 4,12" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14,2 14,8 20,8" />
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <h4 className={`text-sm font-semibold mb-1 ${
                  status === 'uploaded' ? 'text-green-800' : 'text-amber-800'
                }`}>
                  {requirement.title}
                  {!requirement.required && <span className="text-gray-500 font-normal"> (Optional)</span>}
                </h4>
                <p className={`text-xs ${
                  status === 'uploaded' ? 'text-green-700' : 'text-amber-700'
                }`}>
                  {uploadedFile ? uploadedFile.name : requirement.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DocumentsForm;
