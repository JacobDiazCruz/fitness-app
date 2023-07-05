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

export default function EditProgram() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentWeek: any = searchParams?.get('week') || 0;

  const {
    setProgramName,
    setProgramDescription,
    weeks,
    setWeeks,
    setProgramDays,
  }: UseProgramContext = useProgram()!;

  // Get program data
  const {
    isLoading,
    isError,
    data: programData
  } = useQuery('program', () => getProgram(params.id), {
    refetchOnMount: true
  });

  // set weeks
  useEffect(() => {
    if(programData) {
      setWeeks?.(programData?.weeks);
      setProgramName?.(programData?.name);
      setProgramDescription?.(programData?.description);
    }
  }, [programData]);

  // set progamDays via week params
  useEffect(() => {
    if(programData && searchParams.get('week') ) {
      setProgramDays?.(programData?.weeks[currentWeek - 1]?.days)
    }
  }, [searchParams.get('week'), programData]);

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
      <Board />
    </div>
  );
};