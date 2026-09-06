"use client";

import { useEffect } from "react";
import { captureUtm } from "@/lib/utm";

/** Records first-touch UTM parameters for the session. Renders nothing. */
export default function UtmCapture() {
  useEffect(() => {
    captureUtm();
  }, []);
  return null;
}
