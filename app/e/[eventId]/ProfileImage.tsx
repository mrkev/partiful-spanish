import { User } from "@/lib/generated/prisma";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

export function ProfileImage({
  profile,
  className,
}: {
  profile: User;
  className?: string;
}) {
  const initial = profile.name?.charAt(0).toUpperCase() ?? "?";

  return profile.image ? (
    <Image
      src={profile.image}
      alt={profile.name ?? "profile picture"}
      width={40}
      height={40}
      className={twMerge(
        "rounded-full object-cover inline-block w-10 h-10",
        className
      )}
    />
  ) : (
    <div
      className={twMerge(
        "w-10 h-10 inline-flex items-center justify-center rounded-full bg-gray-200 text-gray-700 font-semibold",
        className
      )}
    >
      {initial}
    </div>
  );
}
