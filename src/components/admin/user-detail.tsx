import type { AdminUser } from "@/app/admin/page";
import type { ProfileResult } from "@/types";

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

  const profile = result.scores as unknown as ProfileResult | undefined;
  const answers = result.answers as Record<string, string | number>;

  return (
    <div className="grid gap-6 px-4 py-6 sm:grid-cols-2">
      {/* Profile result */}
      <div className="flex flex-col items-center justify-center text-center">
        {profile ? (
          <>
            <span className="text-4xl">{profile.emoji}</span>
            <h3 className="mt-2 text-lg font-semibold text-gray-800">
              {profile.title}
            </h3>
            <p className="text-xs text-gray-400">{profile.subtitle}</p>
            <p className="mt-3 text-sm leading-relaxed text-gray-500">
              {profile.description}
            </p>
          </>
        ) : (
          <p className="text-sm text-gray-400">Стар формат (без профил)</p>
        )}
      </div>

      {/* Answers + meta */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-gray-700">Отговори</h4>
        {Object.entries(answers).map(([key, value]) => (
          <div key={key} className="flex items-center gap-2">
            <span className="w-10 text-xs font-mono text-gray-400">{key}</span>
            <span className="text-sm text-gray-600">{String(value)}</span>
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
