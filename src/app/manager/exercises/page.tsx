import Header from "@/app/manager/Header";
import { AddIcon } from "@/components/global/Icons";
import TableActions from "@/components/global/TableActions";
import TableItem from "./TableItem";

export default function Exercises() {
  return (
    <>
      <Header pageTitle="Exercises" />
      <TableActions 
        primaryBtnContent="Add New Exercise"
        primaryBtnIcon={<AddIcon />}
        primaryBtnPath="/manager/exercises/add"
      />
      <div className="page-table mt-8">
        <div className="flex justify-between px-5 py-3 text-[14px]">
          <div className="w-[235px]">Exercises</div>
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