import { supabaseServer } from "@/lib/supabase";
import Card from "@/components/ui/Card";

export default async function Dashboard() {
  const sb = supabaseServer();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) {
    return (
      <main className="p-6">
        <a className="underline" href="/auth/login">Please log in</a>
      </main>
    );
  }

  const { data: profile } = await sb.from("profiles").select("*").eq("id", user.id).single();
  const { data: stats } = await sb.from("user_stats").select("*").eq("user_id", user.id).single();

  return (
    <main className="max-w-3xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <Card>
        <div>Selected game: <b>{profile?.selected_game || "-"}</b></div>
      </Card>
      <Card>
        <div>Tokens: <b>{stats?.tokens ?? 0}</b></div>
        <div>Diamonds: <b>{stats?.diamonds ?? 0}</b></div>
        <div>Tokens today: <b>{stats?.tokens_today ?? 0}</b></div>
      </Card>
      <Card>
        <a className="underline" href="/rewards/daily">Daily Reward</a> •{" "}
        <a className="underline" href="/rewards/spin">Spin</a>
      </Card>
    </main>
  );
}
