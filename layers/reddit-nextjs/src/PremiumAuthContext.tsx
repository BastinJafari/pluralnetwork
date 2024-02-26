import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import * as jwt from "jsonwebtoken";
// @ts-ignore-all

type useAuthReturn = ReturnType<typeof useAuth>;
type premiumInfo = {
  isPremium: boolean;
  expires?: Date;
};
type PremiumAuthContextType = Partial<
  Pick<
    useAuthReturn,
    "getToken" | "isSignedIn" | "sessionId" | "signOut" | "userId" | "actor"
  >
> & {
  isLoaded: boolean;
  premium?: {
    isPremium: boolean;
    expires?: Date;
  };
};

const FREE_USE = JSON.parse(process?.env?.NEXT_PUBLIC_FREE_ACCESS ?? "true");

export const PremiumAuthContext = createContext<
  PremiumAuthContextType | undefined
>(undefined);

export const PremiumAuthContextProvider = (props: { [prop: string]: any }) => {
  const auth = useAuth();
  // @ts-ignore
  const [premiumInfo, setPremiumInfo] = useState<premiumInfo>(() =>
    FREE_USE ? { isPremium: true } : undefined
  );
  useEffect(() => {
    if (auth.isLoaded) {
      auth.getToken({ template: "withPublicMetadata" }).then((token) => {
        if (token) {
          const decoded = jwt.verify(token, "asssdfas");
          // @ts-ignore
          const isPremium = JSON.parse(          // @ts-ignore

            decoded?.["pmd"]?.["isPremium"] ?? "false"
          );          // @ts-ignore

          const expires = new Date(decoded?.["pmd"]?.["expires"] ?? "0");

          setPremiumInfo({
            isPremium,
            expires,
          });
        } else {
          setPremiumInfo({ isPremium: false });
        }
      });
    }
  }, [auth.isLoaded, auth.isSignedIn]);

  const value = {
    ...auth,
    isLoaded: auth.isLoaded && typeof premiumInfo?.isPremium === "boolean",
    premium: premiumInfo,
  };

  return <PremiumAuthContext.Provider value={value} {...props} />;
};

export const PremiumAuthContextFreeProvider = (props: {
  [props: string]: any;
}) => {
  const value = {
    isLoaded: true,
    premium: {
      isPremium: true,
    },
  };

  return <PremiumAuthContext.Provider value={value} {...props} />;
};

export const useTAuth = () => {
  const context = useContext(PremiumAuthContext);
  if (context === undefined) {
    throw new Error("useTAuth must be used within PremiumAuthUserContext");
  }
  return context;
};
