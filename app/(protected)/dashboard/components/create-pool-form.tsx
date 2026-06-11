"use client";
import { createPool } from "@/app/_actions/create-pool";
import { Button } from "@/app/_components/ui/button";
import { Field, FieldError } from "@/app/_components/ui/field";
import { Input } from "@/app/_components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const schema = z.object({
  name: z.string().min(3, "Minomo 3 caracteres"),
});

interface CreatePoolFormType {
  onClose: () => void;
}

export const CreatePoolForm = ({ onClose }: CreatePoolFormType) => {
  type SchemaForm = z.infer<typeof schema>;

  const { control, handleSubmit } = useForm<SchemaForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
    },
  });

  const { execute } = useAction(createPool, {
    onSuccess: () => {
      toast.success("Bolão criado com sucesso!");
      onClose();
    },
    onError: () => {
      toast.error("Error ao precessar essa operação");
    },
  });

  const handleForm = ({ name }: SchemaForm) => {
    execute({ name });
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(handleForm)}>
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              type="text"
              placeholder="Nome do seu bolão"
              className="w-full bg-input border font-medium text-white placeholder:text-white py-4 px-6 h-auto"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Button type="submit">CRIAR MEU BOLÃO</Button>
    </form>
  );
};

