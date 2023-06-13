'use client';
import Navbar from "@/components/global/Navbar";

export default function HomeLayout({ 
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <div className="my-[100px] mx-auto w-[1250px] xl:w-[1450px]">
        {children}
      </div>
    </>
  );
}