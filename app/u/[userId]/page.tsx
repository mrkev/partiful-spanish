import { genLogin } from "@/app/actions/auth";
import { getUserProfile } from "@/app/actions/user";
import { notFound } from "next/navigation";
import { UserProfilePage } from "./UserProfilePage";

export default async function Page({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const [user, { profile: currentUser }] = await Promise.all([
    getUserProfile(userId),
    genLogin(),
  ]);

  if (!user) notFound();

  return <UserProfilePage user={user} isOwner={currentUser?.id === userId} currentUser={currentUser ?? null} />;
}
