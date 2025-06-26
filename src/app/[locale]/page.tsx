"use client";

import { useMemo } from "react";
import { useLocale } from "next-intl";
import { AuthUtil } from "@/components/auth";

export default function Home() {
  const lang = useLocale();


  const authUtilProps = useMemo(() => ({
    successRedirectUrl: `/${lang}/registration-type-selection`,
    failedRedirectUrl: `/${lang}/login`,
  }), [lang]);
  
  return (
    <>
      <AuthUtil {...authUtilProps} /> 
    </>
  );
}
