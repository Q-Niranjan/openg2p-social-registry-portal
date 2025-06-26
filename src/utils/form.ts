// utils/form.ts

import { AdditionalInfoType } from '@/types/form';
import { prefixBaseApiPath } from '@/utils/path';

/**
 * Fetches the additional info form schema for group registration.
 */
export const fetchFormSchema = async (): Promise<{ components: any[] } | null> => {
  try {

    const res = await fetch(prefixBaseApiPath("/common/forms"), {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) throw new Error('Failed to fetch form definitions');

    const forms: AdditionalInfoType[] = await res.json();

    const additionalForm = forms.find(
      (form) => form.is_group
    );

    if (additionalForm?.schema) {
      return JSON.parse(additionalForm.schema);
    }

    console.warn('No valid additional info form found');
    return null;
  } catch (error) {
    console.error('Error fetching additional info form schema:', error);
    return null;
  }
};
