import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function generateId(): string {
  const chars = "abcdefghjkmnpqrstuvwxyz23456789";
  let id = "";
  for (let i = 0; i < 8; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}

export async function POST(request: Request) {
  try {
    const { profile, radarScores } = await request.json();

    if (!profile || !radarScores) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    const id = generateId();

    const { error } = await supabase
      .from("shared_results")
      .insert({ id, profile, radar_scores: radarScores });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: "Failed to save" }, { status: 500 });
    }

    return NextResponse.json({ id });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
