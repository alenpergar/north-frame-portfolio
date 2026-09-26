"use client";

import { useEffect, useState } from "react";
import { useMotionReady } from "@/components/ui/use-motion-ready";

type NetworkInformation = EventTarget & {
  saveData?: boolean;
  effectiveType?: string;
};

const SLOW = new Set(["slow-2g", "2g", "3g"]);

/**
 * Whether silent loops and previews may download and play on their own.
 *
 * False on the server and first client render, for `prefers-reduced-motion`,
 * in a background tab (all via useMotionReady), with Save-Data on, and on a
 * connection the browser reports as 3G or slower. Browsers that do not expose
 * the Network Information API (Safari) count as "fine"; there the budget is
 * one small file at a time anyway. When this is false every film stays a
 * poster with a play button: nothing is fetched until someone presses play.
 */
export function useAutoplayPolicy() {
  const motionReady = useMotionReady();
  const [networkOk, setNetworkOk] = useState(false);

  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: NetworkInformation })
      .connection;
    const check = () =>
      setNetworkOk(!connection?.saveData && !SLOW.has(connection?.effectiveType ?? ""));
    check();
    connection?.addEventListener?.("change", check);
    return () => connection?.removeEventListener?.("change", check);
  }, []);

  return motionReady && networkOk;
}
