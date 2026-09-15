import Image from "next/image";

const NAV_LINKS = [
  { label: "Story", id: "story" },
  { label: "Services", id: "services" },
  { label: "Work", id: "work" },
  { label: "Process", id: "process" },
  { label: "Contact", id: "contact" },
];

const SOCIALS = ["Instagram", "LinkedIn", "TikTok"];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-ink-50/10 bg-ink-950 px-6 py-16 sm:px-10">
      <div className="mx-auto flex max-w-content flex-col gap-12 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/images/logo/koryu-mark.png"
            alt=""
            width={32}
            height={32}
            className="h-8 w-8"
          />
          <span className="flex flex-col leading-none">
            <span className="font-display text-base font-semibold tracking-[0.3em] text-ink-50">
              KORYU
            </span>
            <span className="text-[0.55rem] font-medium tracking-[0.4em] text-ink-400">
              CREATIVES
            </span>
          </span>
        </div>

        <nav className="flex flex-wrap gap-x-8 gap-y-3">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              data-cursor="link"
              className="text-sm text-ink-400 transition-colors hover:text-ink-50"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex gap-5">
          {SOCIALS.map((social) => (
            <a
              key={social}
              href="#"
              data-cursor="link"
              className="text-sm text-ink-400 transition-colors hover:text-ink-50"
            >
              {social}
            </a>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-content flex-col gap-2 border-t border-ink-50/10 pt-8 text-xs text-ink-600 sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {year} KORYU Creatives. All rights reserved.</p>
        <p>Website design and development, content, video, and paid ads. One team.</p>
      </div>
    </footer>
  );
}
