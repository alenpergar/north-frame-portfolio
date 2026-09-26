import clsx from "clsx";

/**
 * The metadata line under every film and project: name on the left, status
 * and length on the right. Mono, small, uppercase: information, not a label
 * laid over the picture.
 */
export function StatusLine({
  name,
  status,
  detail,
  className,
}: {
  name: string;
  status: string;
  /** Duration ("0:30") or format ("Website"). */
  detail?: string;
  className?: string;
}) {
  return (
    <p
      className={clsx(
        "flex items-baseline justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.14em]",
        className
      )}
    >
      <span className="text-ink">{name}</span>
      <span className="text-right text-ink-muted">
        {status}
        {detail ? ` · ${detail}` : null}
      </span>
    </p>
  );
}
