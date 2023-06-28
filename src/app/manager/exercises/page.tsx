'use client';
import Header from "@/app/manager/Header";
import PaddedWrapper from "@/components/global/PaddedWrapper";
import Table from "./Table";

export default function Exercises() {
  return (
    <div className="exercises-page">
      <Header pageTitle="Exercises" />
      <Table />
    </div>
  );
}