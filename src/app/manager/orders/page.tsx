"use client";

import Header from "../Header";
import Table from "./Table";

export default function Orders() {
  return (
    <div className="orders-page">
      <Header pageTitle="Orders" />
      <Table />
    </div>
  );
}