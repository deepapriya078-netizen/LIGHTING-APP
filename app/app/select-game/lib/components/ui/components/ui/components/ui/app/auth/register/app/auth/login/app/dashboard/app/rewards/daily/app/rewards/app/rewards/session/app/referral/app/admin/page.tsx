import { supabaseServer } from "@/lib/supabase";
import Card from "@/components/ui/Card";

export default async function AdminPage() {
  const sb = supabaseServer();
  const { data: { user } } = await sb.auth.getUser();

  if (!user) {
    return (
      <main className="p-6">
        <a className="underline" href="/auth/login">Please log in</a>
      </main>
    );
  }

  // Check if user is admin
  const { data: profile } = await sb
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    return (
      <main className="p-6">
        <p className="text-red-400">⛔ Access denied — admin only</p>
      </main>
    );
  }

  const { data: users } = await sb
    .from("profiles")
    .select("id, full_name, email, selected_game, role");

  const { data: stats } = await sb
    .from("user_stats")
    .select("user_id, tokens, diamonds, tokens_today");

  const merged = users?.map((u) => ({
    ...u,
    stats: stats?.find((s) => s.user_id === u.id) || null,
  }));

  return (
    <main className="max-w-4xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-semibold">Admin Panel</h1>

      <Card>
        <p className="opacity-70 mb-2">✅ Admin access verified</p>
        <p>Total users: <b>{merged?.length ?? 0}</b></p>
      </Card>

      <Card className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="opacity-60">
            <tr>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Game</th>
              <th className="p-2">Tokens</th>
              <th className="p-2">Diamonds</th>
              <th className="p-2">Today</th>
            </tr>
          </thead>
          <tbody>
            {merged?.map((u, i) => (
              <tr key={i} className="border-t border-white/10">
                <td className="p-2">{u.full_name}</td>
                <td className="p-2">{u.email}</td>
                <td className="p-2">{u.selected_game}</td>
                <td className="p-2 text-center">{u.stats?.tokens ?? 0}</td>
                <td className="p-2 text-center">{u.stats?.diamonds ?? 0}</td>
                <td className="p-2 text-center">{u.stats?.tokens_today ?? 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </main>
  );
}
