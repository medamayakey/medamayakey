import { SignedIn } from '@clerk/nextjs';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Card from '@/components/ui/card';

export default function Search() {
  return (
    <>
      <Header />
      <div className="flex">
        <SignedIn>
          <Sidebar />
        </SignedIn>
        <main className="p-9">
          <Card />
        </main>
      </div>
    </>
  );
}
