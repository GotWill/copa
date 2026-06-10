import { Button } from "@/components/ui/button";
import { CirclePlus, Search } from "lucide-react";
import Image from "next/image";

const Header = () => {
  return (
    <div className="max-w-[1144px] w-full mx-auto pt-8 border-b border-button-two pb-10">
      <div className="flex justify-between">
        <Image src="/logo-2.png" width={109} height={40} alt="COPA" />
        <div className="flex gap-2">
          <Button>
            <CirclePlus />
            Novo bolão
          </Button>
          <Button className="bg-button-two hover:bg-button-two/75"><Search /> BUSCAR BOLÃO </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
