"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { CirclePlus } from "lucide-react";
import { CreatePoolForm } from "./create-pool-form";
import { useState } from "react";

export const DialogButtonCreatePool = () => {
  const [open, setIsOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <CirclePlus />
          Novo bolão
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-label">
        <DialogHeader>
          <DialogTitle className="text-white">Crie seu novo bolão</DialogTitle>
        </DialogHeader>
        <CreatePoolForm onClose={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};
