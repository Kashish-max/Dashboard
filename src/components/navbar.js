import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Button, Badge } from "@material-tailwind/react";
import Search from "./search";
import AvatarMenu from "./menus/avatar-menu";

const Navbar = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  return (
    <header className="fixed w-full top-0 z-50 flex items-center px-12 py-1 border-b-[1.5px] border-gray-200 bg-white">

      {/* Hamburger */}
      <Button variant="text" color="white" className="p-0 sm:hidden">
        <div className="space-y-1 px-2 py-2 block">
          <span className="block w-5 h-0.5 bg-gray-600 rounded-lg"></span>
          <span className="block w-5 h-0.5 bg-gray-600 rounded-lg"></span>
          <span className="block w-3 h-0.5 bg-gray-600 rounded-lg"></span>
        </div>
      </Button>

      {/* Logo */}
      <button className="flex items-center py-1" onClick={() => router.push("/")}>
        <img className="h-full" src="/assets/logo.svg" alt="Logo" />
      </button>

      {/* Search */}
      <div className="hidden sm:flex flex-grow justify-center mx-4">
        <div className="max-w-5xl w-full px-3"> 
          <Search />
        </div>
      </div>

      {/* Menu Icon */}
      <div className="ms-auto flex me-4">
        <Button variant="text" color="white" className="p-0 hidden md:block hover:bg-gray-100">
            <div className="w-10 h-10 mx-1 p-2.5 flex items-end">
              <Badge content="2" color="indigo" className="p-0 min-h-[17px] min-w-[17px] text-[11px]">
                <img className="h-full" src="/assets/navbar/mail.svg" alt="Menu" />
              </Badge>
            </div>
        </Button>

        <Button variant="text" color="white" className="p-0 hidden md:block hover:bg-gray-100">
          <div className="w-11 h-11 mx-1 p-2.5">
            <img className="h-full" src="/assets/navbar/bell.svg" alt="Menu" />
          </div>
        </Button>

        {/* Profile Icon */}
        <div>
          <AvatarMenu user={session?.user}/>
        </div>
      </div>

    </header>
  );
}

export default Navbar;