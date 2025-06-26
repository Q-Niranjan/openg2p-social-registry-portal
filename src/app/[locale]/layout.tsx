import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";
import { GlobalContextProvider } from "@/context/global";
import { faviconIcon } from "@/assets/imageIndex";
import "@/styles/globals.css";

export const metadata = {
  title: "Registration Portal",
  description: "Social Registry Self Registration Portal",
  icons: [{ rel: "icon", url: faviconIcon.src }],
};

export const viewport = { width: "device-width", initialScale: 1 };

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const locale = (await params).locale;
  const messages = await getMessages(locale);

  return (
    <html lang={locale}>
      <body>
            <NextIntlClientProvider locale={locale} messages={messages}>
              <GlobalContextProvider>{children}</GlobalContextProvider>
            </NextIntlClientProvider>
      </body>
    </html>
  );
}

async function getMessages(locale: string) {
  return (await import(`../../../messages/${locale}.json`)).default;
}
