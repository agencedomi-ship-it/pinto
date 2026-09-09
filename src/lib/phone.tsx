import { createContext, useContext, type ReactNode } from "react";
import { NATIONAL_PHONE, type Phone } from "@/data/zones";

const PhoneContext = createContext<Phone>(NATIONAL_PHONE);

/** Fournit le numéro à afficher (régional sur les pages de zone et de ville, national ailleurs). */
export function PhoneProvider({ phone, children }: { phone?: Phone; children: ReactNode }) {
  return <PhoneContext.Provider value={phone ?? NATIONAL_PHONE}>{children}</PhoneContext.Provider>;
}

export function usePhone(): Phone {
  return useContext(PhoneContext);
}
