'use client';

import { useEffect, useState } from "react";
import { AddIcon } from "@/components/global/Icons";
import TableActions from "@/components/global/TableActions";
import TableItem from "./TableItem";
import { useQuery } from "react-query";
import TableLoader from "@/components/global/TableLoader";
import { primaryTextColor } from "@/utils/themeColors";
import { listWorkouts } from "@/api/Workout";
import TableNoResults from "@/components/global/TableNoResults";

const TableColumnHeaders = ({ primaryTextColor }: string) => {
  return (
    <div className={`${primaryTextColor} flex justify-between px-5 py-3 text-[14px]`}>
      <div className="flex-1">
        <p>Workouts</p>
      </div>
      <div className="flex-1">
        <p>Exercises</p>
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
  const [filteredWorkouts, setFilteredWorkouts] = useState([]);
  const { 
    isLoading, 
    isError,
    data: workouts,
    error
  } = useQuery('workouts', listWorkouts, {
    refetchOnMount: true
  });

  // Search filter logic
  useEffect(() => {
    const filteredWorkouts = workouts?.filter((workout: any) =>
      workout?.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredWorkouts(filteredWorkouts);
  }, [searchValue, workouts]);

  // Return loading state if data is still loading
  if (isLoading) {
    return (
      <>
        <TableActions 
          primaryBtnContent="Add New Workout"
          primaryBtnIcon={<AddIcon />}
          primaryBtnPath="/manager/workouts/add"
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
        primaryBtnContent="Add New Workout"
        primaryBtnIcon={<AddIcon />}
        primaryBtnPath="/manager/workouts/add"
        searchValue={searchValue}
        handleSearch={(value) => {
          setSearchValue(value)
        }}
      />
      <div className="page-table mt-8">
        <TableColumnHeaders primaryTextColor={primaryTextColor} />
        {filteredWorkouts?.length <= 0 ? (
          <TableNoResults />
        ) : (
          filteredWorkouts?.map((workout: any) => {
            const { _id, name, description, exercises, createdAt } = workout;
            return (
              <TableItem
                key={_id}
                name={name}
                description={description}
                itemId={_id}
                exercisesCount={exercises.length}
                createdAt={createdAt}
              />
            );
          })
        )}
      </div>
    </>
  );
}
