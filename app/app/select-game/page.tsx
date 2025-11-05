"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const games = [
  "FREEFIRE",
  "BGMI",
  "CANDY CRUSH SAGA",
  "ROBLOX",
  "ROYAL MATCH",
  "COIN MASTER",
  "SUBWAY SURFERS",
  "FISHDOM",
  "TOWNSHIP",
  "BRAWL STARS",
];

export default function SelectGame() {
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();

  const handleContinue = () => {
    if (!selected) return;
    router.push(`/auth/register?game=${encodeURIComponent(selected)}`);
  };

  return (
    <main className="min-h-screen flex flex-col items-center pt-10 text-white">
      <h1 className="text-2xl font-bold mb-4">Choose Your Game</h1>

      <div className="w-full max-w-sm space-y-2">
        {games.map((g) => (
          <button
            key={g}
            className={`w-full p-3 rounded border ${
              selected === g ? "bg-white text-black" : "border-white/20"
            }`}
            onClick={() => setSelected(g)}
          >
            {g}
