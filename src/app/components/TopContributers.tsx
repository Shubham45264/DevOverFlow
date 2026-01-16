export const dynamic = "force-dynamic";

import { cn } from "@/lib/utils";
import { AnimatedList } from "@/components/magicui/animated-list";
import { users } from "@/models/server/config";
import { Models, Query } from "node-appwrite";
import { UserPrefs } from "@/store/Auth";
import convertDateToRelativeTime from "@/utils/relativeTime";

const Notification = ({ user }: { user: Models.User<UserPrefs> }) => {
  const avatarUrl = `https://cloud.appwrite.io/v1/avatars/initials?name=${encodeURIComponent(
    user.name
  )}&width=40&height=40&project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;

  return (
    <figure
      className={cn(
        "relative mx-auto w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        "bg-white/10 backdrop-blur-md dark:border dark:border-white/10"
      )}
    >
      <div className="flex items-center gap-3">
        <img
          src={avatarUrl}
          alt={user.name}
          className="h-10 w-10 rounded-2xl"
        />

        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex items-center text-sm font-medium text-white">
            <span>{user.name}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-gray-400">
              {convertDateToRelativeTime(new Date(user.$updatedAt))}
            </span>
          </figcaption>

          <p className="text-xs text-gray-400">
            Reputation · {user.prefs.reputation ?? 0}
          </p>
        </div>
      </div>
    </figure>
  );
};

export default async function TopContributers() {
  const res = await users.list<UserPrefs>([Query.limit(100)]);

  // ✅ REAL top contributors logic
  const contributors = res.users
    .filter(user => (user.prefs.reputation ?? 0) > 0)
    .sort(
      (a, b) =>
        (b.prefs.reputation ?? 0) - (a.prefs.reputation ?? 0)
    )
    .slice(0, 10);

  return (
    <div className="relative flex max-h-[400px] min-h-[400px] w-full max-w-[32rem] flex-col overflow-hidden rounded-lg bg-white/5 p-6 shadow-lg">
      <AnimatedList>
        {contributors.length === 0 ? (
          <p className="text-sm text-gray-500">No contributors yet.</p>
        ) : (
          contributors.map(user => (
            <Notification user={user} key={user.$id} />
          ))
        )}
      </AnimatedList>
    </div>
  );
}
