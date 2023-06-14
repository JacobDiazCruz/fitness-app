'use client'

import ManagerLayout from "../ManagerLayout";
import TableItem from "./TableItem";
import Header from "@/app/manager/Header";
import TableActions from "@/components/global/TableActions";
import { AddIcon } from "@/components/global/Icons";

export default function Workouts() {
  return (
    <>
      <Header pageTitle="Workouts" />
      <TableActions 
        primaryBtnContent="Add New Workout"
        primaryBtnIcon={<AddIcon />}
        primaryBtnPath="/manager/workouts/add"
      />
      <div className="page-table mt-8">
        <div className="flex justify-between px-5 py-3 text-[14px]">
          <div className="w-[235px]">Workouts</div>
          <div className="w-[100px]">Primary focus</div>
          <div className="w-[80px]">Category</div>
          <div className="w-[100px]">Date added</div>
          <div></div>
        </div>
        <TableItem />
        <TableItem />
      </div>
    </>
  );
}