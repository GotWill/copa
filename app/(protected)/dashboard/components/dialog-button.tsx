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

interface DialogButtonCreatePoolType {
  isButton?: boolean;
}

export const DialogButtonCreatePool = ({
  isButton,
}: DialogButtonCreatePoolType) => {
  const [open, setIsOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {isButton ? (
          <Button>
            <CirclePlus />
            Novo bolão
          </Button>
        ) : (
          <button className="text-button-yellow font-bold underline cursor-pointer">criar um novo</button>
        )}
      </DialogTrigger>
      <DialogContent className="bg-dialog border-3 border-input">
        <DialogHeader>
          <DialogTitle className="text-white">Crie seu novo bolão</DialogTitle>
        </DialogHeader>
        <CreatePoolForm onClose={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};
