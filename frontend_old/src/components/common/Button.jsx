export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const styles = {
    primary:
      "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-[0_0_28px_rgba(59,130,246,0.22)] hover:opacity-95",
    secondary:
      "border border-white/10 bg-white/5 text-white/80 hover:bg-white/10",
    glass:
      "border border-white/10 bg-white/5 text-white/75 backdrop-blur-xl hover:bg-white/10",
  };

  return (
    <button
      className={`rounded-2xl px-5 py-3 font-medium transition ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}