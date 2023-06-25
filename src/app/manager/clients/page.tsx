import Header from "@/app/manager/Header";
import Table from "./Table";

export default function Clients() {
  return (
    <div className="clients-page">
      <Header pageTitle="Clients" />
      <Table />
    </div>
  );
}