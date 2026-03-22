import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin-auth";
import { createClient } from "@supabase/supabase-js";

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function GET(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const search = searchParams.get("search");

  // Fetch users
  let usersQuery = supabase
    .from("users")
    .select("*")
    .order("created_at", { ascending: false });

  if (status && status !== "all") {
    usersQuery = usersQuery.eq("status", status);
  }
  if (search) {
    usersQuery = usersQuery.ilike("email", `%${search}%`);
  }

  const { data: users, error: usersError } = await usersQuery;

  if (usersError) {
    return NextResponse.json({ error: usersError.message }, { status: 500 });
  }

  // Fetch all test results
  const { data: results } = await supabase
    .from("test_results")
    .select("*");

  // Join results to users
  const resultsByUser = new Map<string, typeof results extends (infer T)[] | null ? T : never>();
  if (results) {
    for (const r of results) {
      resultsByUser.set(r.user_id, r);
    }
  }

  const usersWithResults = (users || []).map((user) => ({
    ...user,
    test_result: resultsByUser.get(user.id) || null,
  }));

  return NextResponse.json(usersWithResults);
}
