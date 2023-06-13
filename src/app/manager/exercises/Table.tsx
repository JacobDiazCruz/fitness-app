'use client';

import { AddIcon } from "@/components/global/Icons";
import TableActions from "@/components/global/TableActions";
import TableItem from "./TableItem";
import { useQuery } from "react-query";
import { listExercises } from "@/api/Exercise";
import { useEffect } from "react";

export default function Table() {
  const { isLoading, isError, data, error, refetch } = useQuery('exercises', listExercises);

  useEffect(() => {
    // Call the refetch function here whenever you want to manually trigger a refetch
    // For example, you can call it after adding a new exercise
    refetch();
  }, []);

  return (
    <>
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
        {data?.map((exercise: Exercise) => {
          const { name, focus, category } = exercise;
          return (
            <TableItem 
              name={name}
              focus={focus}
              category={category}
            />
          );
        })}
      </div>
    </>
  );
}
