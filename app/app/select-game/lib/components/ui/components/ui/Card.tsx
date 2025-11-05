export default function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-white/15 p-4 bg-white/5 ${className}`}>
      {children}
    </div>
  );
}
