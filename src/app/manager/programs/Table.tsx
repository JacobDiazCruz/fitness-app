'use client';

import { useEffect, useState } from "react";
import { AddIcon } from "@/components/global/Icons";
import TableActions from "@/components/global/TableActions";
import TableItem from "./TableItem";
import { useQuery } from "react-query";
import { listExercises } from "@/api/Exercise";
import TableLoader from "@/components/global/TableLoader";
import { primaryTextColor } from "@/utils/themeColors";
import { listPrograms } from "@/api/Program";
import { Program } from "@/utils/types";
import TableNoResults from "@/components/global/TableNoResults";
import useLocalStorage from "@/hooks/useLocalStorage";

const TableColumnHeaders = () => {
  return (
    <div className={`${primaryTextColor} flex justify-between px-5 py-3 text-[14px]`}>
      <div className="flex-1">
        <p>Programs</p>
      </div>
      <div className="flex-1">
        <p>Weeks</p>
      </div>
      <div className="flex-1">
        <p>Date added</p>
      </div>
      <div className="w-[32px]"></div>
    </div>
  );
};

export default function Table() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [filteredPrograms, setFilteredPrograms] = useState([]);

  const {
    isLoading, 
    isError,
    data: programs,
    error
  } = useQuery('programs', () => {
    const userRole = localStorage?.getItem("userRole");
    return listPrograms(userRole == 1 ? "client" : "");
  });

  // Search filter logic
  useEffect(() => {
    console.log("programs", programs)
    const filteredPrograms = programs?.filter((program: Program) =>
      program.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredPrograms(filteredPrograms);
  }, [searchValue, programs]);

  // Return loading state if data is still loading
  if (isLoading) {
    return (
      <>
        <TableActions
          primaryBtnContent="Add New Program"
          primaryBtnIcon={<AddIcon />}
          primaryBtnPath="/manager/programs/add"
          searchValue={searchValue}
          handleSearch={(value) => {
            setSearchValue(value)
          }}
        />
        <div className="page-table mt-8">
          <TableColumnHeaders />
          <TableLoader />
        </div>
      </>
    );
  }

  // Return error state
  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  // Return table if data is available
  return (
    <>
      <TableActions 
        primaryBtnContent="Add New Program"
        primaryBtnIcon={<AddIcon />}
        primaryBtnPath="/manager/programs/add"
        searchValue={searchValue}
        handleSearch={(value) => {
          setSearchValue(value)
        }}
      />
      <div className="page-table mt-8">
        <TableColumnHeaders primaryTextColor={primaryTextColor} />
        {filteredPrograms?.length <= 0 ? (
          <TableNoResults />
        ) : (
          filteredPrograms?.map((program: Program) => {
            const { _id, name, description, weeks, createdAt } = program;
            return (
              <TableItem
                key={_id}
                name={name}
                description={description}
                weeks={weeks}
                itemId={_id}
                createdAt={createdAt}
              />
            );
          })
        )}
      </div>
    </>
  );
}