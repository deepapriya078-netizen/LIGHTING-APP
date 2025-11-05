import { supabaseServer } from "@/lib/supabase";
import Card from "@/components/ui/Card";

export default async function ReferralPage() {
  const sb = supabaseServer();
  const { data: { user } } = await sb.auth.getUser();

  if (!user) {
    return (
      <main className="p-6">
        <a className="underline" href="/auth/login">Please log in</a>
      </main>
    );
  }

  const referralCode = user.id.slice(0, 8);
  const url = `${process.env.NEXT_PUBLIC_APP_URL || "https://yourapp.com"}/select-game?ref=${referralCode}`;

  return (
    <main className="max-w-sm mx-auto p-4 space-y-4">
      <h1 className="text-xl font-semibold">Referral Program</h1>

      <Card>
        <p>Your referral code:</p>
        <p className="text-xl font-bold">{referralCode}</p>
      </Card>

      <Card>
        <p>Share this link:</p>
        <p className="break-all text-sm opacity-70">{url}</p>
      </Card>

      <Card>
        <p>Reward: +2 tokens every time invited user registers ✅</p>
      </Card>
    </main>
  );
}
