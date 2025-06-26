'use client';

export interface DocumentsType {
  documents: File[];
}


export interface RequiredDocument {
  id: string;
  title: string;
  description: string;
  acceptedFormats: string[];
  keywords: string[]; // Keywords to identify this document type
  required: boolean;
}

export interface DocumentRequirements {
  documents: RequiredDocument[];
}

export interface DocumentType {
  documents: File[];
}

// Document requirements configuration
export const documentRequirements: DocumentRequirements = {
  documents: [
    {
      id: 'identity_proof',
      title: 'Identity Proof',
      description: 'Aadhaar Card, Passport, Driving License, or Voter ID',
      acceptedFormats: ['PDF', 'JPG', 'PNG'],
      keywords: ['aadhaar', 'aadhar', 'passport', 'driving', 'license', 'voter', 'identity', 'id'],
      required: true
    },
    {
      id: 'address_proof',
      title: 'Address Proof',
      description: 'Utility Bill, Bank Statement, or Rental Agreement',
      acceptedFormats: ['PDF', 'JPG', 'PNG'],
      keywords: ['utility', 'bill', 'bank', 'statement', 'rental', 'agreement', 'address', 'proof'],
      required: true
    },
    {
      id: 'income_proof',
      title: 'Income Proof',
      description: 'Salary Slip, ITR, or Bank Statement (Optional)',
      acceptedFormats: ['PDF', 'JPG', 'PNG'],
      keywords: ['salary', 'slip', 'itr', 'income', 'tax', 'return', 'payslip'],
      required: false
    }
  ]
};

// Helper function to identify document type based on filename
export const identifyDocumentType = (fileName: string): RequiredDocument | null => {
  const lowerFileName = fileName.toLowerCase();
  
  for (const docType of documentRequirements.documents) {
    if (docType.keywords.some(keyword => lowerFileName.includes(keyword))) {
      return docType;
    }
  }
  return null;
};

// Function to get document status for a requirement
export const getDocumentStatus = (requirement: RequiredDocument, documents: File[]): 'uploaded' | 'pending' => {
  const hasMatchingFile = documents.some(file => {
    const docType = identifyDocumentType(file.name);
    return docType?.id === requirement.id;
  });
  return hasMatchingFile ? 'uploaded' : 'pending';
};

// Function to get uploaded file for a requirement
export const getUploadedFile = (requirement: RequiredDocument, documents: File[]): File | null => {
  return documents.find(file => {
    const docType = identifyDocumentType(file.name);
    return docType?.id === requirement.id;
  }) || null;
};

// Function to validate file type
export const isValidFileType = (file: File): boolean => {
  const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
  return validTypes.includes(file.type);
};
