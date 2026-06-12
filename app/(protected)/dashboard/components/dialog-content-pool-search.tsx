"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { Search } from "lucide-react";
import ContentSearchPool from "./content-search-pool";
import { PoolDto } from "@/app/_data-access/dashboard/all-pool";
import { useState } from "react";

interface DialogContentPoolSearchType {
  userId: string;
  data: PoolDto | undefined;
}

export default function DialogContentPoolSearch({
  data,
  userId,
}: DialogContentPoolSearchType) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
          onClose={() => setIsOpen(false)}
          userId={userId}
          data={{ pools: data?.pools ?? [] }}
        />
      </DialogContent>
    </Dialog>
  );
}
