'use client';

import React from 'react';
import { GroupMemberType } from '@/types/group';

interface MemberFormProps {
  index: number;
  formData: GroupMemberType;
  setFormData: (data: Partial<GroupMemberType>) => void;
  onRemove?: () => void;
  showRemove?: boolean;
}

const MemberForm: React.FC<MemberFormProps> = ({
  index,
  formData,
  setFormData,
  onRemove,
  showRemove,
}) => {
  const membershipOptions = ['Head', 'Member'];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (kind: string) => {
    const currentKinds = formData.membership_kinds || [];
    const updatedKinds = currentKinds.includes(kind)
      ? currentKinds.filter((k) => k !== kind)
      : [...currentKinds, kind];
    setFormData({ ...formData, membership_kinds: updatedKinds });
  };

  return (
    <div className="w-full mb-12 p-6 bg-gray-50 rounded-[10px]">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
        <h3 className="text-gray-800 text-[1.1rem] font-semibold m-0">
          Member #{index + 1}
        </h3>
        {showRemove && onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="bg-gradient-to-br from-red-500 to-red-600 text-white border-none px-4 py-2 rounded text-xs font-medium cursor-pointer transition-all uppercase tracking-wide flex items-center gap-1 hover:-translate-y-1 hover:shadow-md active:translate-y-0 active:shadow-sm"
          >
            ✕ Remove
          </button>
        )}
      </div>

      {[
        { label: 'Name', name: 'name', type: 'text' },
        { label: 'Email', name: 'email', type: 'email' },
        { label: 'Phone', name: 'phone', type: 'tel' },
        { label: 'Birthdate', name: 'birthdate', type: 'date' },
        { label: 'Birth Place', name: 'birth_place', type: 'text' },
      ].map(({ label, name, type }) => (
        <div className="mb-6" key={name}>
          <label className="block font-normal text-gray-700 mb-2 text-sm uppercase tracking-wide">
            {label}
          </label>
          <input
            type={type}
            name={name}
            value={(formData[name as keyof GroupMemberType] as string) || ''}
            onChange={handleChange}
            required
            placeholder={`Enter member ${label.toLowerCase()}`}
            className="w-full px-3 py-2 border-2 border-gray-300 rounded-md text-base transition focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 invalid:focus:ring-red-100"
          />
        </div>
      ))}

      {/* Gender Select */}
      <div className="mb-6">
        <label className="block font-normal text-gray-700 mb-2 text-sm uppercase tracking-wide">
          Gender
        </label>
        <select
          name="gender"
          value={formData.gender || ''}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border-2 border-gray-300 rounded-md text-base transition focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          <option value="">-- Select Gender --</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Membership Kind Checkboxes */}
      <div className="mb-6">
        <label className="block font-normal text-gray-700 mb-2 text-sm uppercase tracking-wide">
          Membership Kind
        </label>
        <div className="flex flex-wrap gap-3">
          {membershipOptions.map((kind) => (
            <label key={kind} className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={formData.membership_kinds?.includes(kind) || false}
                onChange={() => handleCheckboxChange(kind)}
              />
              {kind}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemberForm;
