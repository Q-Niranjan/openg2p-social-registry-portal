"use client";
import { prefixBaseApiPath, prefixBasePath } from "@/utils/path";
import Link from "next/link";
import Image from "next/image";
import { Avatar, Button } from "@mui/material";
import { cursorLogo, welcomeImg } from "@/assets/imageIndex";
import { LoginProvider } from "@/types/auth";
import { SyntheticEvent } from "react";
import { useTranslations } from "next-intl";


type LoginBoxContentProps = {
  t: ReturnType<typeof useTranslations>;
  loginProviders: LoginProvider[];
  handleLoginSubmit: (e: SyntheticEvent) => void;
};

export default function LoginBoxContent({
  t,
  loginProviders,
  handleLoginSubmit
}: LoginBoxContentProps) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-white p-5 box-border">
      <div className="flex flex-col md:flex-row w-[95%] md:w-[90%] md:max-w-[1100px]">
        {/* Left Section */}

        <div className="flex flex-col justify-center items-center flex-1 bg-[#082246] text-white font-light p-[30px] relative">

          <Image src={welcomeImg} alt="Welcome" width={200} height={200}
            className="relative z-[1] opacity-20 top-[110px] left-[-190px] rotate-[340deg]" />


          <div className="mt-[10px] inline-block font-medium text-[24px]">
            <h3>Welcome to</h3>
            <h4>Self Registration Portal</h4>
            <h4 className="text-[20px] font-medium text-[#f07b1b]">by OpenG2P</h4>

          </div>

          <Image src={welcomeImg} alt="Welcome" width={200} height={200}
            className="relative z-[1] opacity-20 bottom-[-160px] right-[-170px] rotate-[170deg]" />
        </div>

        {/* Right Section */}
        <div className="flex justify-center items-center p-5 flex-[1.2]">

          <div className="w-full max-w-[400px] bg-white p-5">
            <div className="flex justify-center mb-6">
              <Image src={cursorLogo} alt="OpenG2P Logo" width={70} height={70} />
            </div>

            <form onSubmit={handleLoginSubmit}>
              <div className="flex justify-center w-full mb-[10px]">
                <h2 className="text-[20px] font-bold mb-[10px] text-center">Log in to Your Account</h2>

              </div>


              {/* Email Input */}
              <div className="mb-4">
                <label htmlFor="login" className="block text-sm font-medium mb-2 text-gray-800">
                  {t("Email or Phone")}
                </label>
                <input
                  type="text"
                  placeholder={t("Enter email or phone")}
                  name="login"
                  id="login"
                  className="w-full px-4 py-2 text-sm border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Password Input */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="password" className="text-sm font-medium text-gray-800">
                    {t("Password")}
                  </label>
                  <Link href="/en/resetpassword" className="text-xs text-blue-600 hover:underline">
                    {t("Reset Password")}
                  </Link>
                </div>
                <input
                  type="password"
                  placeholder={t("Enter password")}
                  name="password"
                  id="password"
                  className="w-full px-4 py-2 text-sm border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Login Button */}
              <div className="mt-4">
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-[#f07b1b] text-white font-bold rounded-full hover:bg-[#d96a18] transition duration-300"
                >
                  {t("Login")}
                </button>
              </div>

              {/* OR Separator */}
              <div className="flex items-center my-4 text-gray-300 font-semibold text-sm">
                <span className="flex-1 border-t border-gray-300"></span>
                <span className="px-2">{t("OR")}</span>
                <span className="flex-1 border-t border-gray-300"></span>
              </div>

              {/* Social Login Providers */}
              <div className="flex flex-col gap-[10px] mt-[20px]">
                {loginProviders?.map((provider) => (
                  <div
                    key={`provider-${provider.id}`}
                    className="flex items-center justify-center w-full mb-3 bg-[#f4f5f9] border border-[#cfcfcf] rounded-[20px] hover:bg-[#e0e4f0] transition-colors"
                  >
                    <a
                      href={prefixBaseApiPath(
                        `/auth/getLoginProviderRedirect/${provider.id}?redirect_uri=${prefixBasePath("/")}`
                      )}
                      className="w-full"
                    >
                      <Button
                        startIcon={
                          <Avatar
                            src={provider.displayIconUrl}
                            className="w-[15px] h-[15px] object-contain rounded-full mr-[10px]"
                          />
                        }
                        style={{ color: "black", justifyContent: "center", textTransform: "none", width: "100%" }}
                        className="w-full py-2 px-4 rounded-[20px]"
                      >
                        {provider.displayName}
                      </Button>
                    </a>
                  </div>
                ))}
              </div>



            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
