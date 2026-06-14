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
import AlertDialogCode from "./alert-dialog-code";

interface DialogButtonCreatePoolType {
  isButton?: boolean;
}

export const DialogButtonCreatePool = ({
  isButton,
}: DialogButtonCreatePoolType) => {
  const [open, setIsOpen] = useState(false);
  const [isDialogCodeOpen, setIsDialogCode] = useState(false);
  const [code, setIsCode] = useState("");

  const handleCloseModal = (code: string) => {
    setIsOpen(false);
    setTimeout(() => setIsDialogCode(true), 150);
    setIsCode(code);
  };

  return (
    <div className="flex-1  md:flex-none">
      <Dialog open={open} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          {isButton ? (
            <Button className="w-full md:w-fit text-sm">
              <CirclePlus />
              Novo bolão
            </Button>
          ) : (
            <button className="text-button-yellow font-bold underline cursor-pointer">
              criar um novo
            </button>
          )}
        </DialogTrigger>
        <DialogContent className="bg-dialog border-3 border-input">
          <DialogHeader>
            <DialogTitle className="text-white">
              Crie seu novo bolão
            </DialogTitle>
          </DialogHeader>
          <CreatePoolForm onClose={handleCloseModal} />
        </DialogContent>
      </Dialog>

      <AlertDialogCode
        code={code}
        isDialogCodeOpen={isDialogCodeOpen}
        setIsDialogCode={() => setIsDialogCode(false)}
      />
    </div>
  );
};
