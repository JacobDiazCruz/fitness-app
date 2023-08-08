'use client';

import ProgramContextProvider from "@/store/Program";
import EditProgram from "./EditProgram";

export default function EditProgramPage() {
  return (
    <ProgramContextProvider>
      <EditProgram />
    </ProgramContextProvider>
  );
}