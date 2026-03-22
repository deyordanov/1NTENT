"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export function ReferralCapture() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const ref = searchParams.get("ref");
    if (ref) {
      sessionStorage.setItem("1ntent_ref", ref);
    }
  }, [searchParams]);

  return null;
}
