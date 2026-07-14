import Link from "next/link";

export function Button({
  children,
  variant = "primary",
  href = "/#prototype"
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  href?: string;
}) {
  const styles =
    variant === "primary"
      ? "bg-[#3B5D4A] text-[#F8F4ED] shadow-[0_16px_36px_rgba(59,93,74,0.18)] hover:bg-[#324f3f]"
      : "border border-[#2B211C]/25 bg-[#F8F4ED]/45 text-[#2B211C] hover:border-[#2B211C]";

  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center justify-center rounded-full px-7 text-sm font-semibold transition ${styles}`}
    >
      {children}
    </Link>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  body
}: {
  eyebrow?: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow ? (
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-[#9C8F84]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-editorial text-4xl leading-[1.02] text-[#2B211C] md:text-6xl">
        {title}
      </h2>
      {body ? (
        <p className="mt-6 text-base leading-8 text-[#2B211C]/75 md:text-lg">
          {body}
        </p>
      ) : null}
    </div>
  );
}

export function InfoCard({
  title,
  text,
  eyebrow,
  badge,
  href,
  image
}: {
  title: string;
  text: string;
  eyebrow?: string;
  badge?: string;
  href?: string;
  image?: string;
}) {
  const content = (
    <>
      {image ? (
        <div className="-mx-6 -mt-6 mb-6 h-40 overflow-hidden rounded-t-[1.35rem]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt="" className="h-full w-full object-cover" />
        </div>
      ) : null}
      <div className="mb-7 flex min-h-6 items-center justify-between gap-3">
        {eyebrow ? (
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#9C8F84]">
            {eyebrow}
          </p>
        ) : (
          <span />
        )}
        {badge ? (
          <span className="whitespace-nowrap rounded-full border border-[#C7A6A0]/45 bg-[#C7A6A0]/18 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[#2B211C]">
            {badge}
          </span>
        ) : null}
      </div>
      <h3 className="font-editorial text-[2rem] leading-[1.02] text-[#2B211C]">
        {title}
      </h3>
      <p className="mt-5 text-sm leading-7 text-[#2B211C]/68">{text}</p>
      {href ? (
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-[#2B211C]/55">
          Open module →
        </p>
      ) : null}
    </>
  );

  const className =
    "flex h-full flex-col rounded-[1.35rem] border border-[#2B211C]/10 bg-[#F8F4ED]/80 p-6 shadow-[0_18px_55px_rgba(43,33,28,0.055)] transition duration-300 hover:-translate-y-1 hover:border-[#C7A6A0]/55 hover:shadow-[0_26px_70px_rgba(43,33,28,0.09)]";

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return <article className={className}>{content}</article>;
}
