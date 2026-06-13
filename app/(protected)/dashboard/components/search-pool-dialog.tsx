
import { allPool } from "@/app/_data-access/dashboard/all-pool";
import { auth } from "@/app/_lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import DialogContentPoolSearch from "./dialog-content-pool-search";

export default async function SearchPoolDialog() {
  const data = await allPool();
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }

  return (
    <DialogContentPoolSearch
      data={{ pools: data?.pools ?? [] }}
      userId={session.user.id}
    />
  );
}
