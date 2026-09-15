import clsx from "clsx";

export default function Marquee({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "marquee-row relative overflow-hidden border-y border-ink-50/10 py-6",
        className
      )}
    >
      <div className="marquee-track motion-reduce:!animate-none">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="label mx-6 flex items-center gap-6 whitespace-nowrap text-ink-400 sm:mx-10"
          >
            {item}
            <span className="text-ink-600" aria-hidden="true">
              &#9679;
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
