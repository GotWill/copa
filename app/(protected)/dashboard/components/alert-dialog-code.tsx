"use client";

import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/app/_components/ui/alert-dialog";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface AlertDialogCodeType {
  code: string;
  isDialogCodeOpen: boolean;
  setIsDialogCode: () => void;
}

export default function AlertDialogCode({
  code,
  isDialogCodeOpen,
  setIsDialogCode,
}: AlertDialogCodeType) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
  };

  const handleCloseDialog = () => {
    setIsDialogCode();
    setCopied(false);
  };

  return (
    <AlertDialog open={isDialogCodeOpen} onOpenChange={handleCloseDialog}>
      <AlertDialogContent className="bg-[#1f1f23] border-[#f7dd43]/30 border shadow-2xl rounded-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-[#e1e1e6] text-2xl">
            Bolão criado com sucesso! 🎉
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[#e1e1e6]/70">
            Compartilhe este código único com seus amigos:
            <div className="mt-4 p-4 bg-black/40 rounded-xl flex justify-between items-center border border-[#f7dd43]/20">
              <span className="text-3xl font-mono font-bold tracking-[0.2em] text-[#f7dd43]">
                {code}
              </span>
              <button
                onClick={() => handleCopy(code)}
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
}
