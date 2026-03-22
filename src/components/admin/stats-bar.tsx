import type { AdminUser } from "@/app/admin/page";

interface StatsBarProps {
  users: AdminUser[];
}

export function StatsBar({ users }: StatsBarProps) {
  const total = users.length;
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const thisWeek = users.filter((u) => new Date(u.created_at) > weekAgo).length;
  const withResults = users.filter((u) => u.test_result !== null).length;
  const referred = users.filter((u) => u.referred_by !== null).length;
  const pending = users.filter((u) => u.status === "pending").length;
  const approved = users.filter((u) => u.status === "approved").length;

  const stats = [
    { label: "Общо", value: total, color: "text-gray-900" },
    { label: "Тази седмица", value: thisWeek, color: "text-blue-600" },
    { label: "С тест", value: withResults, color: "text-green-600" },
    { label: "Препоръчани", value: referred, color: "text-purple-600" },
    { label: "Pending", value: pending, color: "text-amber-600" },
    { label: "Approved", value: approved, color: "text-emerald-600" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border border-gray-100 bg-white p-4"
        >
          <p className="text-xs font-medium text-gray-400">{stat.label}</p>
          <p className={`mt-1 text-2xl font-bold ${stat.color}`}>
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}
