'use client';

import { AddIcon } from "@/components/global/Icons";
import TableActions from "@/components/global/TableActions";
import TableItem from "./TableItem";
import { useQuery } from "react-query";
import { listExercises } from "@/api/Exercise";
import { useEffect } from "react";

export default function Table() {
  const { 
    isLoading, 
    isError, 
    data, 
    error, 
    refetch 
  } = useQuery('exercises', listExercises);

  useEffect(() => {
    // Call the refetch function here whenever you want to manually trigger a refetch
    // For example, you can call it after adding a new exercise
    refetch();
  }, []);

  if (isLoading) {
    // Return loading state UI
    return <div>Loading...</div>;
  }

  if (isError) {
    // Return error state UI
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <TableActions 
        primaryBtnContent="Add New Exercise"
        primaryBtnIcon={<AddIcon />}
        primaryBtnPath="/manager/exercises/add"
      />
      <div className="page-table mt-8">
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
        {data?.map((exercise: Exercise) => {
          const { _id, name, primaryFocus, category, files } = exercise;
          return (
            <TableItem
              name={name}
              primaryFocus={primaryFocus}
              category={category}
              itemId={_id}
              coverImage={files[0] || ""}
            />
          );
        })}
      </div>
    </>
  );
}
