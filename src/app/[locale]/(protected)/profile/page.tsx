'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { useAuth } from '@/context/global';

export default function Profile() {
  const t = useTranslations();
  const lang = useLocale();
  const { profile } = useAuth();

  return (
    <div className="px-6 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Page Title */}
        <div className="text-3xl font-bold mb-4">{t('My Profile')}</div>

        {/* Breadcrumb */}
        <div className="flex items-center text-gray-600 text-sm mb-8">
          <Link href={`/${lang}/`} className="text-blue-600 hover:underline">
            {' ' + t('Home') + ' '}
          </Link>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 320 512"
            className="mx-2 w-3 h-3 fill-current"
          >
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
          </svg>
          <p>{t('My Profile')}</p>
        </div>
      </div>

      {/* Profile Card */}
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-2 gap-4 text-gray-800">
          {/* Personal Info */}
          <div className="col-span-2 font-semibold text-lg border-b pb-1">
            {t('Personal Information')}
          </div>
          <div className="font-medium">{t('Given Name')}</div>
          <div>{profile?.given_name}</div>
          <div className="font-medium">{t('Additional Name')}</div>
          <div>{profile?.addl_name}</div>
          <div className="font-medium">{t('Family Name')}</div>
          <div>{profile?.family_name}</div>

          {/* Contact Info */}
          <div className="col-span-2 font-semibold text-lg border-b pt-4 pb-1">
            {t('Contact Information')}
          </div>
          <div className="font-medium">{t('Email')}</div>
          <div>{profile?.email}</div>
          <div className="font-medium">{t('Phone')}</div>
          <div>{profile?.phone_numbers?.map((phone) => phone.phone_no).join(', ')}</div>

          {/* Demographic Details */}
          <div className="col-span-2 font-semibold text-lg border-b pt-4 pb-1">
            {t('Demographic Details')}
          </div>
          <div className="font-medium">{t('Gender')}</div>
          <div>{profile?.gender}</div>
          <div className="font-medium">{t('Birthdate')}</div>
          <div>{profile?.birthdate}</div>
        </div>
      </div>
    </div>
  );
}
