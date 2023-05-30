import ManagerLayout from "../ManagerLayout";
import PageActions from "./PageActions";
import TableItem from "./TableItem";

export default function Exercises() {
  return (
    <ManagerLayout pageTitle="Exercises">
      <PageActions />
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
    </ManagerLayout>
  );
}