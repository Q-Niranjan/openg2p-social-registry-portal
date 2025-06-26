'use client';

import React, { useEffect } from 'react';
import { GroupDetailsType } from '@/types/group';
import { RegIdType } from '@/types/individual';

interface GroupFormProps {
  formData: GroupDetailsType;
  setFormData: (data: Partial<GroupDetailsType>) => void;
}

const GroupForm: React.FC<GroupFormProps> = ({ formData, setFormData }) => {
  useEffect(() => {
    if (!formData.reg_ids || formData.reg_ids.length === 0) {
      setFormData({
        ...formData,
        reg_ids: [{ id_type: '', value: '', expiry_date: '' }],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentRegIds = formData.reg_ids || [];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
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

  return (
    <div className="w-full mb-12 p-6 bg-gray-50 rounded-lg border-none md:p-4 sm:p-4">
      {[
        { label: 'Name', name: 'name', type: 'text' },
        { label: 'Email', name: 'email', type: 'email' },
        { label: 'Phone', name: 'phone', type: 'tel' },
        { label: 'Registration Date', name: 'registration_date', type: 'date' },
      ].map(({ label, name, type }) => (
        <div className="mb-6" key={name}>
          <label className="block font-normal text-gray-700 mb-2 text-sm uppercase tracking-wide">
            {label}
          </label>
          <input
            type={type}
            name={name}
            value={(formData[name as keyof GroupDetailsType] as string) || ''}
            onChange={handleInputChange}
            required
            placeholder={`Enter group ${label.toLowerCase()}`}
            className="w-full px-2 py-2 border-2 border-gray-300 rounded-md text-base transition-all duration-200 ease-in-out bg-white focus:outline-none focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] invalid:focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]"
          />
        </div>
      ))}

      <div className="mb-6">
        <label className="block font-normal text-gray-700 mb-2 text-sm uppercase tracking-wide">
          Group Kind
        </label>
        <select
          name="group_kind"
          value={formData.group_kind || 'Family'}
          onChange={handleInputChange}
          required
          className="w-full px-2 py-2 border-2 border-gray-300 rounded-md text-base transition-all duration-200 ease-in-out bg-white focus:outline-none focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)]"
        >
          <option value="Family">Family</option>
          <option value="Household">Household</option>
        </select>
      </div>

      <div className="mb-6">
        <label htmlFor="address" className="block font-normal text-gray-700 mb-2 text-sm uppercase tracking-wide">
          Address
        </label>
        <textarea
          id="address"
          name="address"
          value={formData.address || ''}
          onChange={handleInputChange}
          required
          className="w-full p-2 text-base border border-gray-300 rounded-md resize-y focus:outline-none focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)]"
          placeholder="Enter group complete address..."
        />
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

export default GroupForm;
