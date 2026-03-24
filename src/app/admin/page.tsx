"use client";

import { useState, useEffect, useCallback } from "react";
import { StatsBar } from "@/components/admin/stats-bar";
import { UsersTable } from "@/components/admin/users-table";
import { Logo } from "@/components/logo";

interface TestResult {
  scores: Record<string, string> | null;
  answers: Record<string, string | number>;
  completed_at: string;
}

export interface AdminUser {
  id: string;
  email: string;
  status: string;
  referral_code: string | null;
  referred_by: string | null;
  created_at: string;
  test_result: TestResult | null;
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [fetching, setFetching] = useState(false);

  const fetchUsers = useCallback(async () => {
    setFetching(true);
    const params = new URLSearchParams();
    if (statusFilter !== "all") params.set("status", statusFilter);
    if (search) params.set("search", search);

    const res = await fetch(`/api/admin/users?${params}`);
    if (res.status === 401) {
      setAuthenticated(false);
      setFetching(false);
      return;
    }
    const data = await res.json();
    setUsers(data);
    setFetching(false);
  }, [statusFilter, search]);

  // Check if already authenticated
  useEffect(() => {
    fetch("/api/admin/users")
      .then((res) => {
        if (res.ok) {
          setAuthenticated(true);
          return res.json();
        }
        return null;
      })
      .then((data) => {
        if (data) setUsers(data);
      });
  }, []);

  useEffect(() => {
    if (authenticated) fetchUsers();
  }, [authenticated, fetchUsers]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      setAuthenticated(true);
      setPassword("");
    } else {
      setError("Грешна парола");
    }
    setLoading(false);
  }

  async function handleStatusChange(userId: string, newStatus: string) {
    await fetch(`/api/admin/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    // Update locally
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, status: newStatus } : u))
    );
  }

  if (!authenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-sm rounded-2xl border bg-white p-8 shadow-sm">
          <div className="mb-6 text-center">
            <Logo />
            <p className="mt-2 text-sm text-gray-500">Admin Dashboard</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Парола"
              className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-gray-400 focus:outline-none"
              autoFocus
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-gray-900 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800 disabled:opacity-50"
            >
              {loading ? "..." : "Вход"}
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500">
              Admin
            </span>
          </div>
          <button
            onClick={() => {
              document.cookie = "admin_session=; Max-Age=0; path=/";
              setAuthenticated(false);
            }}
            className="text-sm text-gray-400 transition-colors hover:text-gray-600"
          >
            Изход
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-8">
        <StatsBar users={users} />

        {/* Filters */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="text"
            placeholder="Търси по имейл..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-gray-400 focus:outline-none sm:w-64"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-gray-400 focus:outline-none"
          >
            <option value="all">Всички статуси</option>
            <option value="pending">Pending</option>
            <option value="contacted">Contacted</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <button
            onClick={fetchUsers}
            disabled={fetching}
            className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm transition-colors hover:bg-gray-50 disabled:opacity-50"
          >
            {fetching ? "..." : "Обнови"}
          </button>
        </div>

        {/* Table */}
        <div className="mt-4">
          <UsersTable users={users} onStatusChange={handleStatusChange} />
        </div>
      </div>
    </main>
  );
}
