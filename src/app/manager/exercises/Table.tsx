'use client';

import { useEffect, useState } from "react";
import { AddIcon } from "@/components/global/Icons";
import TableActions from "@/components/global/TableActions";
import TableItem from "./TableItem";
import { useQuery } from "react-query";
import { listExercises } from "@/api/Exercise";
import TableLoader from "@/components/global/TableLoader";

const TableColumnHeaders = () => {
  return (
    <div className="flex justify-between px-5 py-3 text-[14px]">
      <div className="flex-1">
        <p>Exercises</p>
      </div>
      <div className="flex-1">
        <p>Primary focus</p>
      </div>
      <div className="flex-1">
        <p>Category</p>
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
  const [filteredExercises, setFilteredExercises] = useState([]);
  const { 
    isLoading, 
    isError,
    data: exercises,
    error
  } = useQuery('exercises', listExercises, {
    refetchOnMount: true
  });

  // Search filter logic
  useEffect(() => {
    const filteredExercises = exercises?.filter((exercise: Exercise) =>
      exercise.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredExercises(filteredExercises);
  }, [searchValue, exercises]);

  // Return loading state if data is still loading
  if (isLoading) {
    return (
      <>
        <TableActions 
          primaryBtnContent="Add New Exercise"
          primaryBtnIcon={<AddIcon />}
          primaryBtnPath="/manager/exercises/add"
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
        primaryBtnContent="Add New Exercise"
        primaryBtnIcon={<AddIcon />}
        primaryBtnPath="/manager/exercises/add"
        searchValue={searchValue}
        handleSearch={(value) => {
          setSearchValue(value)
        }}
      />
      <div className="page-table mt-8">
        <TableColumnHeaders />
        {filteredExercises?.length <= 0 ? (
          <p className="text-center mt-[100px] text-[14px] text-gray-500 font-light">
            No results found.
          </p>
        ) : (
          filteredExercises?.map((exercise: Exercise) => {
            const { _id, name, primaryFocus, category, files } = exercise;
            return (
              <TableItem
                key={_id}
                name={name}
                primaryFocus={primaryFocus}
                category={category}
                itemId={_id}
                coverImage={files[0] || ""}
              />
            );
          })
        )}
      </div>
    </>
  );
}
