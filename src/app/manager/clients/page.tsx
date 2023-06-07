import Header from "@/components/manager/Header";
import TableActions from "./TableActions";
import TableItem from "./TableItem";

export default function Clients() {
  return (
    <>
      <Header pageTitle="Clients" />
      <TableActions />
      <div className="page-table mt-8">
        <div className="flex justify-between px-5 py-3 text-[14px]">
          <div className="w-[235px]">Clients</div>
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