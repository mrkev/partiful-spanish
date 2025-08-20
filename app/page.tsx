"use server";

import { redirect } from "next/navigation";
import { genLogin } from "./actions/auth";
import { LandingPage } from "./LandingPage";

export default async function HomePage() {
  const { profile } = await genLogin();
  if (profile == null) {
    return <LandingPage />;
  } else {
    redirect("/inicio");
  }
}
