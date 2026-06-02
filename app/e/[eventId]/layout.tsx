import { genLogin } from "@/app/actions/auth";
import { ownsEvent } from "@/app/actions/event";
import { Pill } from "@/components/Pill";
import { Button } from "@/components/ui/button";
import { User } from "@/lib/generated/prisma";
import { Pencil, Share2 } from "lucide-react";
import Link from "next/link";
import { ProfileImage } from "./ProfileImage";

export default async function Layout({
  children,
  params: paramsPromise,
}: {
  children: React.ReactNode;
  params: Promise<{ eventId: string }>;
}) {
  const { profile } = await genLogin();

  if (profile == null) {
    return (
      <>
        <UnauthedPill />
        {children}
      </>
    );
  }

  const params = await paramsPromise;
  if (await ownsEvent(profile.id, params.eventId)) {
    return (
      <>
        <OwnerPill profile={profile} eventId={params.eventId} isOwner />
        {children}
      </>
    );
  } else {
    return (
      <>
        <OwnerPill profile={profile} eventId={params.eventId} isOwner={false} />
        {children}
      </>
    );
  }
}

function OwnerPill({
  profile,
  eventId,
  isOwner,
}: {
  profile: User;
  eventId: string;
  isOwner: boolean;
}) {
  return (
    <div className="fixed top-4 right-4 z-50">
      <Pill>
        <div className="flex items-center gap-2 border-r border-gray-100 pr-3">
          {isOwner && (
            <Link href={`/editar/${eventId}`}>
              <Button
                type="button"
                variant="outline"
                className="p-2 rounded-full hover:bg-gray-100 transition"
              >
                <Pencil className="w-5 h-5 text-gray-600" />
              </Button>
            </Link>
          )}
          <Button
            type="button"
            variant="outline"
            className="p-2 rounded-full hover:bg-gray-100 transition"
            disabled
          >
            <Share2 className="w-5 h-5 text-gray-600" />
          </Button>
        </div>
        <Link href="/inicio">
          <ProfileImage profile={profile} />
        </Link>
      </Pill>
    </div>
  );
}

function UnauthedPill() {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Pill>
        <Link
          href="/"
          className="text-sm font-medium text-gray-800 hover:text-gray-900 transition-colors"
        >
          Crea una invitación como esta
        </Link>
      </Pill>
    </div>
  );
}
