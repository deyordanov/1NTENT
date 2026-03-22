"use client";

import { useState } from "react";
import type { AdminUser } from "@/app/admin/page";
import { UserDetail } from "@/components/admin/user-detail";

interface UsersTableProps {
  users: AdminUser[];
  onStatusChange: (userId: string, status: string) => void;
}

const statusColors: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  contacted: "bg-blue-50 text-blue-700 border-blue-200",
  approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
  rejected: "bg-red-50 text-red-700 border-red-200",
};

export function UsersTable({ users, onStatusChange }: UsersTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (users.length === 0) {
    return (
      <div className="rounded-xl border bg-white p-12 text-center text-sm text-gray-400">
        Няма потребители
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white">
      {/* Header */}
      <div className="hidden grid-cols-[40px_1fr_120px_100px_80px] gap-4 border-b bg-gray-50 px-4 py-3 text-xs font-medium uppercase tracking-wider text-gray-400 sm:grid">
        <span>#</span>
        <span>Имейл</span>
        <span>Статус</span>
        <span>Дата</span>
        <span>Тест</span>
      </div>

      {/* Rows */}
      {users.map((user, i) => {
        const isExpanded = expandedId === user.id;
        return (
          <div key={user.id} className="border-b border-gray-50 last:border-0">
            <div
              className={`grid cursor-pointer grid-cols-1 gap-2 px-4 py-3 transition-colors hover:bg-gray-50 sm:grid-cols-[40px_1fr_120px_100px_80px] sm:gap-4 ${
                isExpanded ? "bg-gray-50" : ""
              }`}
              onClick={() => setExpandedId(isExpanded ? null : user.id)}
            >
              <span className="hidden text-sm text-gray-300 sm:block">
                {i + 1}
              </span>
              <span className="text-sm font-medium text-gray-800">
                {user.email}
              </span>
              <div onClick={(e) => e.stopPropagation()}>
                <select
                  value={user.status}
                  onChange={(e) => onStatusChange(user.id, e.target.value)}
                  className={`rounded-md border px-2 py-1 text-xs font-medium ${
                    statusColors[user.status] || "bg-gray-50 text-gray-600"
                  }`}
                >
                  <option value="pending">Pending</option>
                  <option value="contacted">Contacted</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <span className="text-xs text-gray-400">
                {new Date(user.created_at).toLocaleDateString("bg-BG", {
                  day: "numeric",
                  month: "short",
                })}
              </span>
              <span className="text-xs">
                {user.test_result ? (
                  <span className="text-green-500">&#10003;</span>
                ) : (
                  <span className="text-gray-300">&#x2014;</span>
                )}
              </span>
            </div>

            {/* Expanded detail */}
            {isExpanded && (
              <div className="border-t border-gray-100 bg-gray-50/50">
                <UserDetail user={user} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
