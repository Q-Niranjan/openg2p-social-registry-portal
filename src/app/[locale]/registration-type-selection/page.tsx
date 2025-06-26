"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';

export default function RegistrationSelection() {
  const lang = useLocale();
  const [selectedOption, setSelectedOption] = useState<'group' | 'individual' | ''>('');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 text-center">
        <h1 className="text-2xl font-bold mb-2 text-gray-800">
          OpenG2P Self Registration Portal
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          Please select a registration type to continue
        </p>

        <div className="flex flex-col gap-4 items-start mb-4">
          <label className="flex items-center gap-2 text-gray-700">
            <input
              type="checkbox"
              checked={selectedOption === 'group'}
              onChange={() => setSelectedOption('group')}
              className="accent-blue-600 w-4 h-4"
            />
            <span>Group Registration</span>
          </label>

          <label className="flex items-center gap-2 text-gray-700">
            <input
              type="checkbox"
              checked={selectedOption === 'individual'}
              onChange={() => setSelectedOption('individual')}
              className="accent-blue-600 w-4 h-4"
            />
            <span>Individual Registration</span>
          </label>
        </div>

        {selectedOption === 'individual' && (
          <div className="text-sm text-blue-700 bg-blue-100 rounded p-2 mb-4">
            📋 Provide additional information.
          </div>
        )}

        {selectedOption && (
          <Link
            href={`/${lang}/user/${selectedOption === 'group' ? 'group-registration' : 'individual-registration'}`}
            className="inline-block mt-4 px-5 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded transition"
          >
            Continue →
          </Link>
        )}
      </div>
    </div>
  );
}
