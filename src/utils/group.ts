// src/handlers/group.ts
import { prefixBaseApiPath } from '@/utils/path';
import { GroupDetailsType } from '@/types/group';
import { DocumentsType } from '@/types/document';
import { Console } from 'console';

export const submitGroupData = async (groupData: GroupDetailsType) => {
  const response = await fetch(prefixBaseApiPath('/common/group'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(groupData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Failed to submit group data');
  }
  const responseData = await response.json();
  console.log('Group data submitted successfully:', responseData);
  return responseData;
};


export const submitDocumentsData = async (documentsData: DocumentsType) => {
  const { documents } = documentsData;

  for (const doc of documents) {
    const formData = new FormData();
    formData.append('document', doc); 

    try {
			//   await fetch('/api/upload-document', {
			//     method: 'POST',
			//     body: formData,
			//   });

		console.log(`Uploading document "${doc.name}"...`);

    } catch (error) {
      console.error(`Failed to upload document "${doc.name}":`, error);
      throw error;
    }
  }

	
};


export const submitAdditionalInfoData = async (
  additionalInfo: Record<string, any>
) => {
//   const response = await fetch(prefixBaseApiPath('/common/additional-info'), {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ additional_info: additionalInfo }),
//   });

//   if (!response.ok) {
//     const errorText = await response.text();
//     throw new Error(errorText || 'Failed to submit additional info');
//   }

//   return response.json();
console.log('Additional info submitted successfully:', additionalInfo);
};
