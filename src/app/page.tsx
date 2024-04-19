import Image from 'next/image';
import HomeImage from '../../public/home.webp';

export default function Home() {
  return (
    <>
      <main className="container p-2">
        <Image src={HomeImage} alt="Fridgefy HomeImage" />
      </main>
    </>
  );
}
