"use client";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {useAuth} from "@/context/global";
import {prefixBaseApiPath} from "@/utils/path";

// On client side directly call this function. Example:
// AuthUtil({failedRedirectUrl: "/en/dashboard"});
// On server side render this element. Example:
// <AuthUtil failedRedirectUrl="/en/dashboard" />
export function AuthUtil(params: {successRedirectUrl?: string; failedRedirectUrl?: string}) {
  const auth = useAuth();
  const {push} = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(false);
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);
  const checkAuth = async () => {
    setIsCheckingAuth(true);
    try {
      const res = await fetch(prefixBaseApiPath("/auth/profile"));
      if (res.ok) {
        const resJson = await res.json();
        console.log(resJson)
        auth.setProfile(resJson); // Update profile in context
      } else {
        auth.setProfile(null); // Set profile to null if not authenticated
      }
    } catch (err) {
      console.error("Error checking authentication:", err);
    } finally {
      setIsCheckingAuth(false);
      setHasCheckedAuth(true); // Set the flag after the first check
    }
  };

  useEffect(() => {
    // Initial check on component mount
    checkAuth();

    // Periodic check every 1 minutes (adjust as needed)
    const intervalId = setInterval(checkAuth, 1 * 60 * 1000);

    return () => clearInterval(intervalId); // Cleanup on unmount
    // TODO: Fix this
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Redirect based on authentication status
  useEffect(() => {
    if (!hasCheckedAuth) return; // Redirect only after initial check
    if (params.successRedirectUrl && auth.profile) {
      push(params.successRedirectUrl);
    } else if (params.failedRedirectUrl && !auth.profile) {
      push(params.failedRedirectUrl);
    }
  }, [
    auth.profile,
    hasCheckedAuth,
    isCheckingAuth,
    params.failedRedirectUrl,
    params.successRedirectUrl,
    push,
  ]);

  return <></>;
}
