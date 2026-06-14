"use client";

import { CardPool } from "@/app/_components/card-pool";
import { Button } from "@/app/_components/ui/button";
import { Separator } from "@/app/_components/ui/separator";
import { Field, FieldError } from "@/app/_components/ui/field";
import { Input } from "@/app/_components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { getPoolByCode } from "@/app/_actions/get-pool";
import { Loader } from "lucide-react";

interface ContentSearchPoolType {
  userId: string;
  onClose: () => void;
}

const schema = z.object({
  code: z.string().nonempty("Obrigatorio"),
});

export default function ContentSearchPool({
  userId,
  onClose,
}: ContentSearchPoolType) {
  type Schema = z.infer<typeof schema>;
  const { control, handleSubmit } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      code: "",
    },
  });

  const { execute, result, isPending, status } = useAction(getPoolByCode, {});

  const handleGetPool = async ({ code }: Schema) => {
    execute({ code });
  };


  return (
    <div className="flex flex-col space-y-4">
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(handleGetPool)}
      >
        <Controller
          name="code"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                type="text"
                placeholder="Nome do seu bolão"
                className="w-full  bg-input border font-medium text-white placeholder:text-white py-4 px-6 h-auto"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <>
              <Loader className="animate-spin" />
            </>
          ) : (
            "BUSCAR BOLÃO"
          )}
        </Button>
      </form>
      <Separator />

      {result?.data && (
        <CardPool
          poolId={result.data.id}
          userId={userId}
          code={result.data.code}
          title={result.data.name}
          createdBy={result.data.userName}
          participants={result.data.poolParticapantes}
          isButton={true}
          onClose={onClose}
        />
      )}

      {status === "hasSucceeded" && !result.data && <span className="text-white font-bold text-base">Nenhum bolão</span>}
    </div>
  );
}
