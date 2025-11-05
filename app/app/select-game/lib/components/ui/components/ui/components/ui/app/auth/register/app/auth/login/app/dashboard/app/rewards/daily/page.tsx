"use client";
import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

const dailyRewards = [2, 4, 6, 8, 10, 15, 20]; // day 1 → day 7

export default function DailyRewardPage() {
  const sb = supabaseBrowser();
  const r = useRouter();
  const [day, setDay] = useState(1);
  const [loading, setLoading] = useState(false);

  async function load() {
    const { data: { user } } = await sb.auth.getUser();
    if (!user) return r.replace("/auth/login");

    const { data: stats } = await sb.from("user_stats").select("*").eq("user_id", user.id).single();
    setDay(stats?.daily_streak ?? 1);
  }

  useEffect(() => { load(); }, []);

  async function claim() {
    setLoading(true);
    const reward = dailyRewards[day - 1];

    const { error } = await sb.rpc("claim_daily_reward", { amount: reward });
    setLoading(false);
    if (error) return alert(error.message);
    alert(`+${reward} diamonds added!`);
    load();
  }

  return (
    <main className="max-w-sm mx-auto p-4 space-y-4">
      <h1 className="
