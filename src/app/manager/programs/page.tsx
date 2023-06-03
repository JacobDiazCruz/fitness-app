'use client'

import TableActions from "@/components/global/TableActions";
import TableItem from "./TableItem";
import Header from "@/components/manager/Header";
import { useRouter } from "next/navigation";

export default function Programs() {
  const router = useRouter();
  return (
    <>
      <Header pageTitle="Programs" />
      {/* <TableActions /> */}
      <div className="page-table mt-8">
        <div className="flex justify-between px-5 py-3 text-[14px]">
          <div className="w-[235px]">Workouts</div>
          <div className="w-[100px]">Primary focus</div>
          <div className="w-[80px]">Category</div>
          <div className="w-[100px]">Date added</div>
          <div></div>
        </div>
        <div onClick={(e) => router.push('/manager/programs/123')}>
          <TableItem />
        </div>
        <TableItem />
      </div>
    </>
  );
}