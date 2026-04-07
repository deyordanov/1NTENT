import type { AdminUser } from "@/app/admin/page";
import type { ProfileResult } from "@/types";

interface UserDetailProps {
  user: AdminUser;
}

export function UserDetail({ user }: UserDetailProps) {
  const result = user.test_result;

  // Try new format first (profile_data), fall back to legacy (scores held the profile)
  let profile: ProfileResult | undefined;
  if (result?.profile_data && typeof result.profile_data === "object") {
    profile = result.profile_data as unknown as ProfileResult;
  } else if (result?.scores && typeof result.scores === "object" && "title" in result.scores) {
    // legacy: profile was stored in `scores`
    profile = result.scores as unknown as ProfileResult;
  }

  // Radar scores (new format)
  let radar: Record<string, number> | null = null;
  if (
    result?.scores &&
    typeof result.scores === "object" &&
    !("title" in result.scores)
  ) {
    radar = result.scores as Record<string, number>;
  }

  return (
    <div className="grid gap-6 px-4 py-6 sm:grid-cols-2">
      {/* Profile result + radar */}
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
        ) : result ? (
          <p className="text-sm text-gray-400">Тестът няма зареден профил</p>
        ) : (
          <p className="text-sm text-gray-400">Няма попълнен тест</p>
        )}

        {radar && (
          <div className="mt-4 w-full space-y-1.5 text-left">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Радар
            </p>
            {Object.entries(radar).map(([k, v]) => (
              <div key={k} className="flex items-center gap-2">
                <span className="w-32 text-xs text-gray-500">{k}</span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-rose-400"
                    style={{ width: `${Math.min(100, Math.max(0, v))}%` }}
                  />
                </div>
                <span className="w-8 text-right text-xs font-mono text-gray-500">
                  {v}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Answers + meta */}
      <div className="space-y-3">
        {result?.answers && (
          <>
            <h4 className="text-sm font-semibold text-gray-700">Отговори</h4>
            <div className="max-h-80 space-y-1 overflow-y-auto">
              {Object.entries(result.answers).map(([key, value]) => (
                <div key={key} className="flex items-start gap-2">
                  <span className="w-10 flex-shrink-0 font-mono text-xs text-gray-400">
                    {key}
                  </span>
                  <span className="flex-1 break-words text-sm text-gray-600">
                    {Array.isArray(value) ? value.join(", ") : String(value)}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Meta info */}
        <div className="mt-4 space-y-1 border-t pt-3 text-xs text-gray-400">
          {user.phone && (
            <p>
              Телефон: <span className="font-mono text-gray-600">{user.phone}</span>
            </p>
          )}
          {user.gender && (
            <p>
              Пол: <span className="text-gray-600">{user.gender === "male" ? "Мъж" : "Жена"}</span>
            </p>
          )}
          <p>
            Referral код:{" "}
            <span className="font-mono text-gray-600">{user.referral_code || "—"}</span>
          </p>
          <p>
            Препоръчан от:{" "}
            <span className="font-mono text-gray-600">{user.referred_by || "—"}</span>
          </p>
          {result && (
            <p>
              Тест попълнен:{" "}
              {new Date(result.completed_at).toLocaleString("bg-BG")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
