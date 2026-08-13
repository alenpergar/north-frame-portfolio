import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

const ASPECT = 1663 / 213;

export function Logo({ className, height = 32 }: { className?: string; height?: number }) {
  const width = Math.round(height * ASPECT);

  return (
    <Link
      href="/"
      aria-label="DRYPOINT — home"
      className={clsx("inline-flex items-center shrink-0", className)}
    >
      <Image
        src="/drypoint-logo-dark.png"
        alt="DRYPOINT"
        width={width}
        height={height}
        priority
        style={{ width: `${width}px`, height: `${height}px` }}
      />
    </Link>
  );
}
