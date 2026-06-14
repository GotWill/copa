"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { Search } from "lucide-react";
import ContentSearchPool from "./content-search-pool";
import { useState } from "react";

interface DialogContentPoolSearchType {
  isButton?: boolean
}

export default function DialogContentPoolSearch({
  isButton = true
}: DialogContentPoolSearchType) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {isButton ? (
            <Button className="bg-button-two hover:bg-button-two/75">
            <Search /> BUSCAR BOLÃO{" "}
          </Button>
          ) : (
            <button className="text-button-yellow font-bold underline cursor-pointer">
              buscar um por código
            </button>
          )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl! bg-dialog border-3 border-input">
        <DialogHeader>
          <DialogTitle className="text-white">
            Encontre um bolão pelo nome e participe.
          </DialogTitle>
        </DialogHeader>
        <ContentSearchPool
          onClose={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
