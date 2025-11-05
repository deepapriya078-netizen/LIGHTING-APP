"use client";
import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function SessionPage() {
  const sb = supabaseBrowser();
  const r = useRouter();

  const [game, setGame] = useState("");
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tokensToday, setTokensToday] = useState(0);

  async function load() {
    const { data: { user } } = await sb.auth.getUser();
    if (!user) return r.replace("/auth/login");

    const { data: profile } = await sb.from("profiles").select("*").eq("id", user.id).single();
    setGame(profile?.selected_game || "");

    const { data: stats } = await sb.from("user_stats").select("*").eq("user_id", user.id).single();
    setTokensToday(stats?.tokens_today ?? 0);

    const { data: session } = await sb.rpc("has_active_session");
    setActive(session === true);
  }

  async function startSession() {
    setLoading(true);
    const { error } = await sb.rpc("start_game_session");
    setLoading(false);
    if (error) return alert(error.message);
    load();
  }

  async function finishSession() {
    setLoading(true);
    const { error } = await sb.rpc("finish_game_session");
    setLoading(false);
    if (error) return alert(error.message);
    alert("Session completed & tokens added!");
    load();
  }

  useEffect(() => { load(); }, []);

  return (
    <main className="max-w-sm mx-auto p-4 space-y-4">
      <h1 className="text-xl font-semibold">Game Session</h1>

      <Card>
        <p>Selected Game: <b>{game}</b></p>
        <p>Tokens earned today: <
