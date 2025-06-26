'use client';

import React, { useEffect } from 'react';
import { IndividaulType, RegIdType } from '@/types/individual';

interface IndividualFormProps {
  formData: IndividaulType;
  setFormData: (data: Partial<IndividaulType>) => void;
}

const IndividualForm: React.FC<IndividualFormProps> = ({ formData, setFormData }) => {
  const profileRaw = typeof window !== 'undefined' && localStorage.getItem('profile');
  const profile = profileRaw ? JSON.parse(profileRaw) : {};

  const addl_name = profile.addl_name || '';
  const given_name = profile.given_name || '';
  const family_name = profile.family_name || '';
  const gender = profile.gender || '';
  const birthdate = profile.birthdate || '';
  const email = profile.email || '';
  const birth_place = profile.birth_place || '';
  const phone = profile.phone_numbers && profile.phone_numbers.length > 0 ? profile.phone_numbers[0].phone_no : '';
  const reg_ids = profile.ids || [];

  useEffect(() => {
    setFormData({
      ...formData,
      addl_name,
      given_name,
      family_name,
      gender,
      birthdate,
      email,
      phone,
      birth_place,
      reg_ids: reg_ids.length > 0 ? reg_ids : [{ id_type: '', value: '', expiry_date: '' }],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentRegIds = formData.reg_ids || [];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegIdChange = (
    index: number,
    field: keyof RegIdType,
    value: string | number
  ) => {
    const updatedRegIds = currentRegIds.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setFormData({ ...formData, reg_ids: updatedRegIds });
  };

  const addRegId = () => {
    setFormData({
      ...formData,
      reg_ids: [...currentRegIds, { id_type: '', value: '', expiry_date: '' }],
    });
  };

  const removeRegId = (index: number) => {
    const updatedRegIds = currentRegIds.filter((_, i) => i !== index);
    setFormData({ ...formData, reg_ids: updatedRegIds });
  };

  const isFieldDisabled = (fieldName: string): boolean => {
    const profileFields = ['given_name', 'addl_name', 'family_name', 'gender', 'birthdate'];
    return profileFields.includes(fieldName) && !!profileRaw;
  };

  return (
    <div className="w-full mb-12 p-6 sm:p-4 bg-gray-50 rounded-[10px] border-0">
      {[ 
        { label: 'First Name', name: 'given_name', type: 'text' },
        { label: 'Second Name', name: 'addl_name', type: 'text' },
        { label: 'Last Name', name: 'family_name', type: 'text' },
        { label: 'Email', name: 'email', type: 'email' },
        { label: 'Phone', name: 'phone', type: 'tel' },
        { label: 'Birthdate', name: 'birthdate', type: 'date' },
        { label: 'Birth Place', name: 'birth_place', type: 'text' },
      ].map(({ label, name, type }) => (
        <div className="mb-6" key={name}>
          <label htmlFor={name} className="block font-normal text-gray-700 mb-2 text-sm uppercase tracking-wide">
            {label}
          </label>
          <input
            id={name}
            type={type}
            name={name}
            value={(formData[name as keyof IndividaulType] as string) || ''}
            onChange={handleInputChange}
            disabled={isFieldDisabled(name)}
            required
            placeholder={`Enter your ${label.toLowerCase()}`}
            className="w-full px-2 py-2 border-2 border-gray-300 rounded-md text-base transition focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 invalid:focus:ring-red-100 bg-white"
          />
        </div>
      ))}

      <div className="mb-6">
        <label htmlFor="gender" className="block font-normal text-gray-700 mb-2 text-sm uppercase tracking-wide">
          Gender
        </label>
        <select
          id="gender"
          name="gender"
          value={formData.gender || ''}
          onChange={handleInputChange}
          disabled={isFieldDisabled('gender')}
          required
          className="w-full px-2 py-2 border-2 border-gray-300 rounded-md text-base transition focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {currentRegIds.map((reg, index) => (
        <div key={index} className="bg-white border border-gray-300 rounded-lg p-6 mb-6 shadow-sm">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200 sm:flex-col sm:items-start sm:gap-4">
            <h4 className="text-gray-800 text-[1.1rem] font-semibold m-0">Registration ID #{index + 1}</h4>
            {currentRegIds.length > 1 && (
              <button
                type="button"
                onClick={() => removeRegId(index)}
                className="bg-gradient-to-br from-red-500 to-red-600 text-white border-none px-4 py-2 rounded text-xs font-medium cursor-pointer transition-all uppercase tracking-wide flex items-center gap-1 hover:-translate-y-1 hover:shadow-md active:translate-y-0 active:shadow-sm self-end"
                aria-label={`Remove Registration ID ${index + 1}`}
              >
                ✕ Remove This ID
              </button>
            )}
          </div>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            <div className="mb-6">
              <label htmlFor={`id_type_${index}`} className="block font-normal text-gray-700 mb-2 text-sm uppercase tracking-wide">
                ID Type
              </label>
              <input
                id={`id_type_${index}`}
                type="text"
                value={reg.id_type ?? ''}
                onChange={(e) => handleRegIdChange(index, 'id_type', e.target.value)}
                required
                className="w-full px-2 py-2 border-2 border-gray-300 rounded-md text-base transition focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white"
              />
            </div>
            <div className="mb-6">
              <label className="block font-normal text-gray-700 mb-2 text-sm uppercase tracking-wide">
                Value
              </label>
              <input
                type="text"
                value={reg.value || ''}
                onChange={(e) => handleRegIdChange(index, 'value', e.target.value)}
                required
                className="w-full px-2 py-2 border-2 border-gray-300 rounded-md text-base transition focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white"
              />
            </div>
            <div className="mb-6">
              <label className="block font-normal text-gray-700 mb-2 text-sm uppercase tracking-wide">
                Expiry Date
              </label>
              <input
                type="date"
                value={reg.expiry_date || ''}
                onChange={(e) => handleRegIdChange(index, 'expiry_date', e.target.value)}
                required
                className="w-full px-2 py-2 border-2 border-gray-300 rounded-md text-base transition focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white"
              />
            </div>
          </div>
        </div>
      ))}

      <div className="mt-4">
        <button
          type="button"
          onClick={addRegId}
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700"
        >
          + Add Registration ID
        </button>
      </div>
    </div>
  );
};

export default IndividualForm;
