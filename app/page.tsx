import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-[url(/bg.png)] bg-cover bg-center min-h-screen w-screen">
      <div className="max-w-[1124px] mx-auto h-full p-5 md:p-0">
        <div className="flex flex-col md:flex-row items-center justify-between min-h-screen py-10">
          <div className="flex flex-col space-y-15">
            <Image src="/logo.png" alt="logo" width={100} height={100} />
            <div className="flex flex-col space-y-8 border-b border-[#323238] pb-12">
              <h1 className="text-5xl font-bold text-white max-w-[489px] w-full">
                Crie seu próprio bolão da copa e compartilhe entre amigos!
              </h1>
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <div className="flex items-center gap-2">
                  <AvatarGroup className="grayscale">
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/maxleiter.png"
                        alt="@maxleiter"
                      />
                      <AvatarFallback>LR</AvatarFallback>
                    </Avatar>
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/evilrabbit.png"
                        alt="@evilrabbit"
                      />
                      <AvatarFallback>ER</AvatarFallback>
                    </Avatar>
                    <AvatarGroupCount>+3</AvatarGroupCount>
                  </AvatarGroup>
                </div>
                <div className="flex items-center gap-2 text-white font-bold text-lg md:text-2xl">
                  <p className="text-green-600">+12.592</p> pessoas já estão
                  usando
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <Input
                  type="text"
                  placeholder="Nome do seu bolão"
                  className="md:max-w-[306px] w-full bg-input border-none font-medium text-white placeholder:text-white py-4 px-6 h-auto"
                />
                <Button className="py-4 px-6 h-auto bg-button-yellow text-black font-bold cursor-pointer hover:bg-button-yellow/60 transition-all duration-300">
                  CRIAR MEU BOLÃO
                </Button>
              </div>
              <div className="max-w-[400px] w-full">
                <p className="text-label text-sm font-medium">
                  Após criar seu bolão, você receberá um código único que poderá
                  usar para convidar outras pessoas 🚀
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-6">
                <div className="w-10 h-10 bg-green rounded-full flex items-center justify-center">
                  <Check className="text-white" />
                </div>
                <div className="text-white">
                  <p className="text-white font-bold text-2xl">+2.034</p> Bolões
                  criados
                </div>
              </div>
              <div className="hidden md:block border border-white self-stretch" />
              <div className="flex items-center gap-6">
                <div className="w-10 h-10 bg-green rounded-full flex items-center justify-center">
                  <Check className="text-white" />
                </div>
                <div className="text-white">
                  <p className="text-white font-bold text-2xl">+192.847</p>{" "}
                  Palpites enviados
                </div>
              </div>
            </div>
          </div>
          <div className="hidden md:block relative w-[498px] h-[596px]">
            <Image src="/phone.png" fill alt=""/>
          </div>
        </div>
      </div>
    </div>
  );
}
