import type { AdminUser } from "@/app/admin/page";
import { RadarChart } from "@/components/radar-chart";
import { dimensionLabels } from "@/lib/scoring";
import type { Scores } from "@/types";

interface UserDetailProps {
  user: AdminUser;
}

export function UserDetail({ user }: UserDetailProps) {
  const result = user.test_result;

  if (!result) {
    return (
      <div className="px-4 py-6 text-center text-sm text-gray-400">
        Няма попълнен тест
      </div>
    );
  }

  const scores = result.scores as Scores;

  return (
    <div className="grid gap-6 px-4 py-6 sm:grid-cols-2">
      {/* Radar chart */}
      <div className="flex items-center justify-center">
        <div className="w-64">
          <RadarChart scores={scores} />
        </div>
      </div>

      {/* Scores breakdown */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-gray-700">Резултати</h4>
        {Object.entries(scores).map(([key, value]) => (
          <div key={key} className="flex items-center gap-3">
            <span className="w-28 text-xs text-gray-500">
              {dimensionLabels[key as keyof typeof dimensionLabels] || key}
            </span>
            <div className="flex-1">
              <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${value}%` }}
                />
              </div>
            </div>
            <span className="w-8 text-right text-xs font-medium text-gray-600">
              {value}
            </span>
          </div>
        ))}

        {/* Meta info */}
        <div className="mt-4 space-y-1 border-t pt-3 text-xs text-gray-400">
          <p>
            Referral код: <span className="font-mono text-gray-600">{user.referral_code || "—"}</span>
          </p>
          <p>
            Препоръчан от: <span className="font-mono text-gray-600">{user.referred_by || "—"}</span>
          </p>
          <p>
            Тест попълнен: {new Date(result.completed_at).toLocaleString("bg-BG")}
          </p>
        </div>
      </div>
    </div>
  );
}
