"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Menu, MenuItems, MenuButton, Transition } from "@headlessui/react";
import { prefixBasePath } from "@/utils/path";
import { getSupportedLocales } from "@/utils/lang";
import languageDropIcon from "@/assets/images/lanDropdown.png";

export default function LanguageDropDown() {
  const currentLocale = useLocale();
  const supportedLocales = getSupportedLocales();
  const pathAbs = usePathname();
  const t = useTranslations();

  return (
    <Menu as="div" className="relative inline-block text-black">
      <div>
        <MenuButton className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200">
          <Image
            src={prefixBasePath(t(`@flag_url_${currentLocale}`))}
            alt={t(`@language_title_${currentLocale}`)}
            width={20}
            height={20}
          />
          <span className="text-sm font-medium">{t(`@language_title_${currentLocale}`)}</span>
          <span className="w-2.5 h-2.5">
            <Image src={languageDropIcon} alt="Dropdown" />
          </span>
        </MenuButton>
      </div>

      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-in"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <MenuItems className="absolute left-0 z-10 mt-1 w-32 bg-white border border-gray-200 rounded-md shadow-lg focus:outline-none">
          <div className="flex flex-col">
            {supportedLocales.map((locale) => (
              <Menu.Item key={`locale-${locale}`}>
                {({ active }) => (
                  <Link
                    href={pathAbs.replace(currentLocale, locale)}
                    className={`flex items-center gap-2 px-3 py-2 text-sm ${
                      active ? "bg-gray-100" : ""
                    }`}
                  >
                    <Image
                      src={prefixBasePath(t(`@flag_url_${locale}`))}
                      alt={t(`@language_title_${locale}`)}
                      width={20}
                      height={20}
                    />
                    <span>{t(`@language_title_${locale}`)}</span>
                  </Link>
                )}
              </Menu.Item>
            ))}
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}
