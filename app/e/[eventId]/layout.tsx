import { genLogin } from "@/app/actions/auth";
import { ownsEvent } from "@/app/actions/event";
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
  const initial = profile.name?.charAt(0).toUpperCase() ?? "?";

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm shadow-lg rounded-full px-3 py-2 border border-gray-200">
        {/* Action buttons */}
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
        {/* Profile link */}
        <Link href="/inicio" className="flex items-center space-x-2">
          <ProfileImage profile={profile} />
        </Link>
      </div>
    </div>
  );
}

function UnauthedPill() {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="flex items-center">
        <Link href={"/"}>
          <Button
            variant={"outline"}
            type="button"
            className="text-sm font-medium text-gray-800 hover:text-gray-900 hover:bg-gray-100 rounded-full px-3 py-1 transition"
          >
            Crea una invitación como esta
          </Button>
        </Link>
      </div>
    </div>
  );
}
