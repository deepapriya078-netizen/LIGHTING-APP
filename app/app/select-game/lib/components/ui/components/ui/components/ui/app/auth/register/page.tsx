"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabase";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function RegisterPage() {
  const sp = useSearchParams();
  const router = useRouter();
  const game = sp.get("game") || "";
  const sb = supabaseBrowser();

  const [fullName, setFullName] = useState("");
  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!game) return alert("Please go back and select a game first.");
    setLoading(true);

    // 1) create auth user
    const { data, error } = await sb.auth.signUp({ email, password });
    if (error) { setLoading(false); return alert(error.message); }
    const user = data.user;
    if (!user) { setLoading(false); return alert("Signup failed"); }

    // 2) create profile + initial stats rows
    const { error: pErr } = await sb.from("profiles").insert([{
      id: user.id,
      email,
      full_name: fullName,
      selected_game: game,
      role: "user"
    }]);
    if (pErr) { setLoading(false); return alert(pErr.message); }

    await sb.from("user_stats").insert([{ user_id: user.id }]);

    // 3) go to dashboard
    router.replace("/dashboard");
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <h1 className="text-xl font-semibold">Create your account</h1>
        <p className="text-sm opacity-70 mb-4">Selected game: {game || "-"}</p>

        <form onSubmit={onSubmit} className="space-y-3">
          <Input placeholder="Full name" value={fullName} onChange={e=>setFullName(e.target.value)} />
          <Input placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
          <Input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          <Button disabled={loading}>{loading ? "Creating..." : "Create account"}</Button>
        </form>

        <p className="text-sm opacity-70 mt-3">
          Already have an account?{" "}
          <a className="underline" href="/auth/login">Log in</a>
        </p>
      </Card>
    </main>
  );
}
