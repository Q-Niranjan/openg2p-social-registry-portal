// src/components/LoginBox.tsx
"use client";
import { prefixBaseApiPath } from "@/utils/path";
import { useLocale, useTranslations } from "next-intl";
import { SyntheticEvent, useState, useEffect } from "react";
import { LoginProvider } from "@/types/auth";
import LoginBoxContent from "./LoginBoxContent";

export default function LoginBox() {
  const locale = useLocale();
  const t = useTranslations();

  function handleLoginSubmit(e: SyntheticEvent) {
    e.preventDefault();
  }

  const [loginProviders, setLoginProviders] = useState<LoginProvider[]>([]);

  async function getLoginProviders() {
    try {
      const res = await fetch(prefixBaseApiPath(`/auth/getLoginProviders`));

      const resJson: { loginProviders: LoginProvider[] } = await res.json();
  
      resJson.loginProviders.forEach((provider) => {
        if (typeof provider.displayName !== "string") {
          const displayNameLocale = Object.keys(provider.displayName).find((key) => key.startsWith(locale));

          provider.displayName = displayNameLocale ? provider.displayName[displayNameLocale] : "";
        }
      });
  
      setLoginProviders(resJson.loginProviders);
    } catch (error) {
      console.error("Error fetching login providers:", error);
    }
  }

  useEffect(() => {
    const fetchProviders = async () => {
      await getLoginProviders();
    };
  
    fetchProviders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  return <LoginBoxContent 
    t={t} 
    loginProviders={loginProviders} 
    handleLoginSubmit={handleLoginSubmit} 
  />;
}
