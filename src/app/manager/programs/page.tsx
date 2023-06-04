'use client'

import TableActions from "@/components/global/TableActions";
import TableItem from "./TableItem";
import Header from "@/components/manager/Header";
import { useRouter } from "next/navigation";
import { AddIcon } from "@/components/global/Icons";

export default function Programs() {
  const router = useRouter();
  return (
    <>
      <Header pageTitle="Programs" />
      <TableActions 
        primaryBtnContent="Add New Program"
        primaryBtnIcon={<AddIcon />}
        primaryBtnPath="/manager/programs/add"
      />
      <div className="page-table mt-8">
        <div onClick={(e) => router.push('/manager/programs/123')}>
          <TableItem />
        </div>
        <TableItem />
      </div>
    </>
  );
}