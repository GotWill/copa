import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogDescription,
} from "@/app/_components/ui/dialog";
import { allPool } from "@/app/_data-access/dashboard/all-pool";
import { Search } from "lucide-react";
import ContentSearchPool from "./content-search-pool";
import { auth } from "@/app/_lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function SearchPoolDialog() {
  const data = await allPool();
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }

  console.log("meu user", session.user);
  console.log(data?.pools);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-button-two hover:bg-button-two/75">
          <Search /> BUSCAR BOLÃO{" "}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl! bg-dialog border-3 border-input">
        <DialogHeader>
          <DialogTitle className="text-white">Buscar bolão</DialogTitle>
          <DialogDescription className="text-white">
            Encontre um bolão pelo nome e participe.
          </DialogDescription>
        </DialogHeader>
        <ContentSearchPool
          userId={session.user.id}
          data={{ pools: data?.pools ?? [] }}
        />
      </DialogContent>
    </Dialog>
  );
}
