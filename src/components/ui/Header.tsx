"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import LanguageDropdown from "./LanguageDropdown";
import ProfileDropdown from "./ProfileDropdown";
import { useAuth } from "@/context/global";
import { cursorLogo } from "@/assets/imageIndex";

export default function Header() {
  const lang = useLocale();
  const router = useRouter();
  const { profile } = useAuth(); 
  const t = useTranslations();

  const handleLoginClick = () => {
    router.push(`/${lang}/login`);
  };
  const handleSignUpClick = () => {
    router.push(`/${lang}/sginup`); 
  };

  if (profile === undefined) return <div>Loading...</div>;

  return (
    <div className="bg-white shadow-md py-2 w-full">
      <nav className="flex justify-between items-center max-w-screen-xl mx-auto px-5 flex-wrap">
        <Link href={`/${lang}/`}>
          <div className="flex items-center gap-2">
            <div className="w-[50px] h-[50px] relative">
              <Image
                src={cursorLogo}
                alt="Logo"
                fill
                className="object-contain"
                priority={false}
              />
            </div>
            <div className="flex flex-col text-black">
              <span className="text-lg font-semibold leading-none">
                {t("Self_Registration_Portal")}
              </span>
              <span className="text-sm font-normal">by OpenG2P</span>
            </div>
          </div>
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-2">
          <LanguageDropdown />
          {profile ? (
            <ProfileDropdown />
          ) : (
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={handleLoginClick}
                className="px-4 py-2 rounded text-sm text-black hover:bg-gray-200"
              >
                Login
              </button>
              <button
                onClick={handleSignUpClick}
                className="px-4 py-2 rounded text-sm text-black hover:bg-gray-200"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
