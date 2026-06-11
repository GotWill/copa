"use client";

import { Button } from "@/app/_components/ui/button";
import { createAuthClient } from "better-auth/react";

export default function ButtonSigin() {
  const handleSiginGoogle = async () => {
    const clientAuth = createAuthClient();
    clientAuth.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
  };

  return (
    <Button
      onClick={handleSiginGoogle}
      variant="secondary"
      className="py-4 px-6 bg-transparent border border-label font-bold rounded-full text-label hover:bg-label/40 hover:text-white cursor-pointer w-[140px]"
    >
      ENTRAR
    </Button>
  );
}
