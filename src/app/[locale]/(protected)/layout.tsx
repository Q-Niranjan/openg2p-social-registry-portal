
import { ReactNode } from "react";
import Header from "@/components/ui/Header";
import { AuthUtil } from "@/components/auth";
import { useLocale } from "next-intl";
import Footer from "@/components/ui/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function CommonLayout({ children }: { children: ReactNode }) {
  const lang = useLocale();

  return (
    <div>
      <Header />
      <AuthUtil failedRedirectUrl={`/${lang}/login`} />
      {children}
      <ToastContainer/>
      <Footer/>
    </div>
  );
}
