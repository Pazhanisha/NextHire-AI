export default function SectionTitle({ eyebrow, title, description }) {
  return (
    <div>
      {eyebrow && (
        <p className="text-sm uppercase tracking-[0.3em] text-white/40">{eyebrow}</p>
      )}
      <h2 className="mt-2 text-3xl font-semibold tracking-tight">{title}</h2>
      {description && <p className="mt-3 max-w-2xl text-sm leading-7 text-white/60">{description}</p>}
    </div>
  );
}