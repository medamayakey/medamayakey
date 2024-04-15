import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/logo.svg";
import { Button } from "./ui/button";
import { LogOut, NotebookPen, Search, SmilePlus } from "lucide-react";

export default function Header() {
  return (
    <header className="flex bg-slate-50 h-16 px-6">
      <div className="flex w-full justify-between items-center">
        <div className="logo">
          <Link href="/">
            <Image src={Logo} alt="Fridgefy" width={144} height={40} />
          </Link>
        </div>
        <nav>
          <ul className="flex items-center gap-6">
            <li>
              <Link href="/">
                <span className="mr-2">
                  <SmilePlus />
                </span>
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link href="/search">
                <span className="mr-2">
                  <Search />
                </span>
                <span>Search</span>
              </Link>
            </li>
            <li>
              <Link href="/myrecipes">
                <span className="mr-2">
                  <NotebookPen />
                </span>
                <span>My Recipes</span>
              </Link>
            </li>
            <li>
              <Button variant="outline">Sign up with Google</Button>
            </li>
            <li className="ml-16">
              <Link href="/">
                <span className="mr-2">
                  <LogOut />
                </span>
                <span>Log out</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
