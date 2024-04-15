import Image from "next/image";
import HomeImage from "../../public/home.webp";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="container p-2">
        <Image src={HomeImage} alt="Fridgefy HomeImage" />
      </main>
    </>
  );
}
