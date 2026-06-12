import Image from "next/image";
import { DialogButtonCreatePool } from "../(protected)/dashboard/components/dialog-button";
import SearchPoolDialog from "../(protected)/dashboard/components/search-pool-dialog";

const Header = () => {
  return (
    <div className="border-b border-button-two pb-10">
      <div className="max-w-[1144px] w-full mx-auto pt-8">
        <div className="flex justify-between">
          <Image src="/logo-2.png" width={109} height={40} alt="COPA" />
          <div className="flex gap-2">
            <DialogButtonCreatePool isButton={true}/>
            <SearchPoolDialog/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
