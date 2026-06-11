"use client";

import { useEffect, useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { createPool } from "@/app/_actions/create-pool";

import { Check, Copy } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";

const PoolHandler = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { execute, result } = useAction(createPool, {
    onSuccess: () => {
      setIsOpen(true);
    },
  });

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
  };
  useEffect(() => {
    const pendignName = sessionStorage.getItem("bolao");

    if (pendignName) {
      execute({ name: pendignName });
      sessionStorage.removeItem("bolao");
    }
  }, [execute]);

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="bg-[#1f1f23] border-[#f7dd43]/30 border shadow-2xl rounded-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-[#e1e1e6] text-2xl">
            Bolão criado com sucesso! 🎉
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[#e1e1e6]/70">
            Compartilhe este código único com seus amigos:
            <div className="mt-4 p-4 bg-black/40 rounded-xl flex justify-between items-center border border-[#f7dd43]/20">
              <span className="text-3xl font-mono font-bold tracking-[0.2em] text-[#f7dd43]">
                {result.data?.code}
              </span>
              <button
                onClick={() => handleCopy(result.data?.code as string)}
                className="flex items-center gap-2 text-sm bg-[#f7dd43] text-black px-4 py-2 rounded-lg font-bold hover:bg-[#f7dd43]/90 transition-all"
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
                {copied ? "Copiado" : "Copiar"}
              </button>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogAction className="bg-[#f7dd43] text-black hover:bg-[#e6cc3a] font-bold">
            Entendido
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PoolHandler;
