"use client";
import Link from "next/link";
import { supabaseBrowser } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const sb = supabaseBrowser();
  const router = useRouter();

  async function logout() {
    await sb.auth.signOut();
    router.replace("/auth/login");
  }

  return (
    <nav className="w-full p-3 flex gap-3 text-sm border-b border-white/10">
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/rewards/daily">Daily</Link>
      <Link href="/rewards/spin">Spin</Link>
      <Link href="/rewards/session">Session</Link>
      <Link href="/referral">Referral</Link>
      <button onClick={logout} className="ml-auto opacity-70 hover:opacity-100">
        Logout
      </button>
    </nav>
  );
}
