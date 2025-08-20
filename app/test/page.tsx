"use client";

import { Button } from "@/components/ui/button";
import { testAction } from "./action";

export default function Test() {
  return (
    <Button onClick={async () => console.log(await testAction())}>test</Button>
  );
}
