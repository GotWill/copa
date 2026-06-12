"use client";

import { useEffect, useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { createPool } from "@/app/_actions/create-pool";

import AlertDialogCode from "./alert-dialog-code";

const PoolHandler = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { execute, result } = useAction(createPool, {
    onSuccess: () => {
      setIsOpen(true);
    },
  });


  useEffect(() => {
    const pendignName = sessionStorage.getItem("bolao");

    if (pendignName) {
      execute({ name: pendignName });
      sessionStorage.removeItem("bolao");
    }
  }, [execute]);

  return (
    <AlertDialogCode
      code={result.data?.code as string}
      isDialogCodeOpen={isOpen}
      setIsDialogCode={() => setIsOpen(false)}
    />
  );
};

export default PoolHandler;
