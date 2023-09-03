import { useRouter } from "next/router";
import { Button } from "@material-tailwind/react";
import { useAuth } from "./layout";
import AvatarMenu from "./avatar";

const Navbar = () => {
  const router = useRouter();
  const { session } = useAuth();

  return (
    <header className="fixed w-full top-0 z-50 flex items-center px-12 py-1 border-b border-gray-300 bg-white">

      {/* Hamburger */}
      <Button variant="text" color="white" className="p-0 sm:hidden">
        <div className="space-y-1 px-2 py-2 block">
          <span className="block w-5 h-0.5 bg-gray-600 rounded-lg"></span>
          <span className="block w-5 h-0.5 bg-gray-600 rounded-lg"></span>
          <span className="block w-3 h-0.5 bg-gray-600 rounded-lg"></span>
        </div>
      </Button>

      {/* Logo */}
      <button className="flex items-center py-1.5" onClick={() => router.push("/")}>
        <img className="h-full" src="/assets/logo.svg" alt="Logo" />
      </button>

      {/* Search */}
      <div className="hidden sm:flex flex-grow justify-center mx-4">
        <div className="max-w-2xl w-full flex items-center px-5 py-2 bg-white border border-gray-300 text-gray-200 rounded-lg transition-all focus-within:text-gray-600 focus-within:shadow-md">
            <img className="h-5 w-5" src="/assets/search.svg" alt="Search" />
            <input 
                type="text"
                placeholder="Type to search"
                className="flex-grow px-3 py-1 text-xs text-gray-700 bg-transparent outline-none font-medium"
            />
        </div>
      </div>

      {/* Menu Icon */}
      <div className="ms-auto flex me-4">
        <Button variant="text" color="white" className="p-0 hidden md:block">
          <div className="w-11 h-11 mx-1 p-2.5">
            <img className="h-full" src="/assets/navbar/mail.svg" alt="Menu" />
          </div>
        </Button>

        <Button variant="text" color="white" className="p-0 hidden md:block">
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