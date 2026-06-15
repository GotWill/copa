"use client";

import Image from "next/image";
import { DialogButtonCreatePool } from "../(protected)/dashboard/components/dialog-button";
import Link from "next/link";
import DialogContentPoolSearch from "../(protected)/dashboard/components/dialog-content-pool-search";
import { useEffect, useState } from "react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`border-b border-button-two px-6 md:px-0 pb-10 fixed w-full ${isScrolled && "z-99 bg-input shadow-2xl"}`}
    >
      <div className="max-w-[1144px] w-full mx-auto pt-8">
        <div className="flex flex-col items-center gap-6 md:flex-row md:gap-0 md:justify-between">
          <Link href="/dashboard">
            <Image
              src="/logo-2.png"
              width={109}
              height={40}
              alt="COPA"
              loading="eager"
            />
          </Link>
          <div className="flex gap-2 w-full md:w-fit">
            <DialogButtonCreatePool isButton={true} />
            <DialogContentPoolSearch />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
