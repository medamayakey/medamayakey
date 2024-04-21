import Image from "next/image";
import HomeImage from "../../public/home.webp";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Home() {
  return (
    <>
      <main>
        <div className="sm:flex w-full home-h">
          <Image src={HomeImage} className="object-cover w-12/12 sm:w-6/12" alt="Fridgefy HomeImage" />
          <div className="flex justify-center items-center w-screen p-20">
            <div>
              <h1 className="mb-6">
                <div className="flex items-center">
                  <p className="text-2xl">Team</p>
                </div>
              </h1>
              <div>
                <ul>
                  <li className="flex items-center mb-6">
                    <Avatar className="mr-4">
                      <AvatarImage src="/kai.png" alt="kai" />
                      <AvatarFallback>K</AvatarFallback>
                    </Avatar>
                    <p className="text-xl">Kai</p>
                  </li>
                  <li className="flex items-center mb-6">
                    <Avatar className="mr-4">
                      <AvatarImage src="/yuki.png" alt="Yuki" />
                      <AvatarFallback>Y</AvatarFallback>
                    </Avatar>
                    <p className="text-xl">Yuki</p>
                  </li>
                  <li className="flex items-center mb-6">
                    <Avatar className="mr-4">
                      <AvatarImage src="/rina.png" alt="Rina" />
                      <AvatarFallback>R</AvatarFallback>
                    </Avatar>
                    <p className="text-xl">Rina</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
