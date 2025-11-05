export default function Input(
  { className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement>
) {
  return (
    <input
      {...props}
      className={`w-full px-3 py-2 rounded border border-white/20 bg-black text-white placeholder-white/40 ${className}`}
    />
  );
}
