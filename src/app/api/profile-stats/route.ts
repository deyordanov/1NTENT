import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Fallback percentages when we have too few users
const FALLBACK: Record<string, number> = {
  ready: 18,
  selective: 12,
  grounded: 22,
  emerging: 14,
};

const MIN_USERS_FOR_REAL_DATA = 50;

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("test_results")
      .select("profile_type")
      .not("profile_type", "is", null);

    if (error || !data || data.length < MIN_USERS_FOR_REAL_DATA) {
      return NextResponse.json({
        percentages: FALLBACK,
        total: data?.length || 0,
        isEstimate: true,
      });
    }

    // Count each profile type
    const counts: Record<string, number> = {};
    for (const row of data) {
      const type = row.profile_type as string;
      counts[type] = (counts[type] || 0) + 1;
    }

    // Convert to percentages
    const total = data.length;
    const percentages: Record<string, number> = {};
    for (const [type, count] of Object.entries(counts)) {
      percentages[type] = Math.round((count / total) * 100);
    }

    // Ensure all types have a value
    for (const type of Object.keys(FALLBACK)) {
      if (!percentages[type]) percentages[type] = 1;
    }

    return NextResponse.json({
      percentages,
      total,
      isEstimate: false,
    });
  } catch {
    return NextResponse.json({
      percentages: FALLBACK,
      total: 0,
      isEstimate: true,
    });
  }
}
