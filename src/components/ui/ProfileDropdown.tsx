"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Menu, MenuItems, MenuButton, Transition } from "@headlessui/react";
import { Avatar } from "@mui/material";
import { useAuth } from "@/context/global";
import { prefixBaseApiPath } from "@/utils/path";

export default function ProfileDropDown() {
  const lang = useLocale();
  const t = useTranslations();
  const { profile, setProfile } = useAuth();
  const router = useRouter();

  const logoutHandler = () => {
    fetch(prefixBaseApiPath("/auth/logout"), {
      method: "POST",
    }).finally(() => {
      setProfile(null);
      router.replace(`/${lang}/`);
    });
  };

  return (
    <Menu as="div" className="relative inline-block">
      <div>
        <MenuButton className="bg-transparent border-none cursor-pointer flex items-center p-0">
          <div className="flex items-center gap-2">
            <Avatar
              src={profile?.picture}
              className="w-9 h-9 border-2 border-gray-300 transition-colors hover:border-blue-500"
            />
            <span className="text-xs text-gray-600 transition-transform">▼</span>
          </div>
        </MenuButton>
      </div>

      <Transition
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-0 mt-2 bg-white border border-gray-300 rounded-md shadow-lg min-w-[135px] z-10 overflow-hidden">
          <div className="flex flex-col">
            <Menu.Item>
              {({ active }) => (
                <Link
                  href={`/${lang}/profile`}
                  className={`flex items-center px-4 py-2 text-sm text-black no-underline w-full text-left ${
                    active ? "bg-gray-100" : ""
                  }`}
                >
                  {t("My Profile")}
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  type="submit"
                  onClick={logoutHandler}
                  className={`flex items-center px-4 py-2 text-sm text-black w-full text-left ${
                    active ? "bg-gray-100" : ""
                  }`}
                >
                  {t("Log out")}
                </button>
              )}
            </Menu.Item>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}
