'use client';

import ProgramContextProvider from "@/contexts/Program";
import EditProgram from "./EditProgram";

export default function EditProgramPage() {
  return (
    <ProgramContextProvider>
      <EditProgram />
    </ProgramContextProvider>
  );
}