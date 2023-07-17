'use client'

import { useEffect } from "react";
import HeaderActions from "./HeaderActions";
import { ArrowLeftIcon, PencilIcon } from "@/components/global/Icons";
import { useQuery } from "react-query";

import {
  primaryTextColor
} from "@/utils/themeColors";
import { getProgram } from "@/api/Program";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import IconButton from "@/components/global/IconButton";

// context and hooks
import useProgram from "@/contexts/Program/useProgram";
import { UseProgramContext } from "@/utils/programTypes";
import Board from "./Board";
import { useSidebar } from "@/contexts/Sidebar/useSidebar";

export default function EditProgram() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentWeek: any = searchParams?.get('week') ?? 0;

  const {
    setProgramName,
    setProgramDescription,
    weeks,
    setWeeks,
    setProgramDays,
  }: UseProgramContext = useProgram()!;

  // Get program data
  const {
    isError: isErrorFetchingProgram,
    isLoading: isLoadingProgram,
    data: programData,
    refetch: refetchProgram
  } = useQuery('program', () => getProgram(params.id), {
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    retry: false
  });
  
  const { setOpenNav }: any = useSidebar();

  useEffect(() => {
    refetchProgram();
    setOpenNav(false);

    return () => {
      setOpenNav(true);
    }
  }, []);

  if(isErrorFetchingProgram) {
    router.push('/manager/programs');
  }

  // set weeks
  useEffect(() => {
    if(programData) {
      setWeeks?.(programData?.weeks);
      setProgramName?.(programData?.name);
      setProgramDescription?.(programData?.description);
    }
  }, [programData, params.id, currentWeek]);

  // update programDays when the week changes on the route
  useEffect(() => {
    if(programData) {
      setProgramDays?.(programData?.weeks[currentWeek - 1]?.days);
    }
  }, [programData, currentWeek]);

  return (
    <div className="edit-program">
      <div className="w-full mb-[50px] flex items-center justify-between">
        <div className="flex gap-[10px] items-center">
          <button onClick={() => router.push("/manager/programs")}>
            <ArrowLeftIcon className={`${primaryTextColor} w-4 h-4`} />
          </button>
          <h5 className={`${primaryTextColor} text-[22px] text-medium`}>
            {programData?.name}
          </h5>
          <IconButton className="ml-1">
            <PencilIcon className={`${primaryTextColor} w-4 h-4`} />
          </IconButton>
        </div>
      </div>
      <HeaderActions weeks={weeks} />
      {!isLoadingProgram && (
        <Board />
      )}
    </div>
  );
};