'use client';

import { useEffect, useState } from "react";
import { AddIcon } from "@/components/global/Icons";
import TableActions from "@/components/global/TableActions";
import TableItem from "./TableItem";
import { useQuery } from "react-query";
import { listExercises } from "@/api/Exercise";
import TableLoader from "@/components/global/TableLoader";
import TableNoResults from "@/components/global/TableNoResults";
import { IExercise } from "@/types/exercise";
import TableColumnHeader from "@/components/global/TableColumnHeader";

export default function Table() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [filteredExercises, setFilteredExercises] = useState([]);
  const { 
    isLoading, 
    data: exercises
  } = useQuery('exercises', listExercises, {
    refetchOnMount: true
  });

  // Search filter logic
  useEffect(() => {
    const filteredExercises = exercises?.filter((exercise: IExercise) =>
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
          <TableColumnHeader 
            items={["Exercises", "Primary focus", "Category", "Date added"]}
          />
          <TableLoader />
        </div>
      </>
    );
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
        {filteredExercises?.length <= 0 ? (
          <TableNoResults />
        ) : (
          <>
            <TableColumnHeader
              items={["Exercises", "Primary focus", "Category", "Date added"]}
            />
            {filteredExercises?.map(({
              _id = "",
              name,
              primaryFocus,
              videoLink,
              category,
              createdAt = ""
            }: IExercise) => {
              return (
                <TableItem
                  key={_id}
                  itemId={_id}
                  name={name}
                  videoLink={videoLink}
                  primaryFocus={primaryFocus}
                  category={category}
                  createdAt={createdAt}
                />
              );
            })}
          </>
        )}
      </div>
    </>
  );
}
