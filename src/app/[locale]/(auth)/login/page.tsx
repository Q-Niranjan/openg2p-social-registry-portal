'use client';
import React from 'react';
import { useLocale } from "next-intl";
import { AuthUtil } from "@/components/auth";
import LoginBox from "@/components/LoginBox"
import { useMemo } from "react";


const LoginPage = () => {
  const lang = useLocale();
  const authUtilProps = useMemo(() => ({
    successRedirectUrl: `/${lang}/dashboard`,
  }), [lang]);

  return (<>
    <AuthUtil {...authUtilProps} />
    <LoginBox />
  </>
  );
};

export default LoginPage;
