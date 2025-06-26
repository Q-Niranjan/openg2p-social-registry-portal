'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';

const Dashboard = () => {
  const lang = useLocale();
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    const storedProfileString = localStorage.getItem('profile');
    if (storedProfileString) {
      try {
        const storedProfile = JSON.parse(storedProfileString);
        const fullName = `${storedProfile.given_name} ${storedProfile.addl_name} ${storedProfile.family_name}`;
        setFullName(fullName.trim());
      } catch (error) {
        console.error('Failed to parse profile:', error);
      }
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h1 className="text-xl font-bold mb-2">
          👋 Welcome, {fullName || 'User'}
        </h1>
        <p className="text-gray-600 mb-4">Choose an action:</p>

        <div className="space-y-3">
          <Link
            href={`/${lang}/user/group-registration`}
            className="block w-full text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            + Group Registration
          </Link>
          <Link
            href={`/${lang}/user/member-registration`}
            className="block w-full text-center bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            + Add Member to Group
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
