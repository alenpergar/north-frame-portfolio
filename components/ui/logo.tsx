import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

const ASPECT = 3761 / 552;

export function Logo({ className, height = 32 }: { className?: string; height?: number }) {
  const width = Math.round(height * ASPECT);

  return (
    <Link
      href="/"
      aria-label="North Frame — home"
      className={clsx("inline-flex items-center shrink-0", className)}
    >
      <Image
        src="/logo-mark-new.png"
        alt="North Frame"
        width={width}
        height={height}
        priority
        style={{ width: `${width}px`, height: `${height}px` }}
      />
    </Link>
  );
}
