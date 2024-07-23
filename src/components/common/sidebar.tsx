"use client";
import { useState } from "react";
import { CloseIcon, LogOutIcon, MenuIcon } from "./Icons";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {} from "lucide-react";
import { useCharacterStore } from "@/store/character-store";

const options = [
  {
    placeholder: "PERSONAJES",
    path: "/character",
  },
  {
    placeholder: "EPISODIOS",
    path: "/episode",
  },
];

export function Sidebar() {
  const router = useRouter();
  const [showSidebar, setShowSidebar] = useState(false);
  const { removeCharacters } = useCharacterStore((state) => ({
    removeCharacters: state.removeCharacters,
  }));

  const pathname = usePathname();

  const handleMotion = () => {
    setShowSidebar((prevState) => !prevState);
  };

  const handleLogOut = () => {
    removeCharacters();
    router.push("/auth/login");
  };

  return (
    <>
      <div
        className="p-1 pl-2 bg-primary fixed block rounded-r-3xl z-50 top-0 left-0"
        onMouseEnter={() => handleMotion()}
      >
        <button
          className="text-white bg-transparent shadow-none rounded-full p-2 hover:text-accent"
          onClick={() => handleMotion()}
        >
          <MenuIcon className="shadow-none" />
        </button>
      </div>

      <div
        onClick={() => handleMotion()}
        className={`${
          !showSidebar && "hidden"
        } z-40 bg-gray-600/50 min-h-screen h-full w-full fixed top-0 left-0 right-0 backdrop-blur-sm`}
      ></div>

      <aside
        onMouseLeave={() => handleMotion()}
        className={`${
          showSidebar ? "w-72" : "w-0"
        } z-50 bg-primary rounded-r-3xl fixed min-h-screen h-full top-0 left-0 shadow-xl transition-all duration-250 flex flex-col`}
      >
        <div className={`${!showSidebar && "hidden"} pt-3`}>
          <button
            className="ml-4 text-white hover:text-accent"
            onClick={() => handleMotion()}
          >
            <CloseIcon />
          </button>
        </div>

        <div
          className={`${
            !showSidebar && "hidden"
          } flex-grow flex flex-col items-center space-y-0 align-middle justify-center `}
        >
          <Image
            src="/logo.svg"
            alt="official logo for the rick and morty web application"
            width={120}
            height={120}
            className="mb-5"
          ></Image>
          {options.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="flex w-full p-0 m-0 "
            >
              <Button
                variant="default"
                className={`${
                  pathname === item.path
                    ? "text-secondary hover:bg-gray-800/20 bg-gray-800/20"
                    : "hover:text-secondary hover:bg-gray-800/20"
                } w-full  p-0 m-0 rounded-none`}
              >
                {item.placeholder}
              </Button>
            </Link>
          ))}
        </div>
        <footer
          className={` ${
            !showSidebar && "hidden"
          } flex text-white justify-end mb-5 mr-5 bg-transparent`}
        >
          <Button
            className="hover:text-accent"
            size="lg"
            onClick={() => handleLogOut()}
          >
            <LogOutIcon />
            SALIR
          </Button>
        </footer>
      </aside>
    </>
  );
}
