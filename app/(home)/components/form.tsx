"use client";

import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { authClient } from "@/app/_lib/auth-client";
import { createAuthClient } from "better-auth/react";
import { Field } from "@/app/_components/ui/field";

const formSchema = z.object({
  name: z.string().nonempty(),
});

const FormCreatePool = () => {
  type Schema = z.infer<typeof formSchema>;

  const { handleSubmit, control } = useForm<Schema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const sendForm = async ({ name }: Schema) => {
    const { data: session } = await authClient.getSession();
    if (!session) {
     sessionStorage.setItem("bolao", name)
      const clientAuth = createAuthClient();
      clientAuth.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });
    }
  };

  return (
    <form
      className="flex flex-col md:flex-row md:items-center gap-2"
      onSubmit={handleSubmit(sendForm)}
    >
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
              className="w-full bg-input border-none font-medium text-white placeholder:text-white py-4 px-6 h-auto"
            />
          </Field>
        )}
      />
      <Button>CRIAR MEU BOLÃO</Button>
    </form>
  );
};

export default FormCreatePool;
