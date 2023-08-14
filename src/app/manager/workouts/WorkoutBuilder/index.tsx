import TextArea from "@/components/global/TextArea";
import TextField from "@/components/global/TextField";
import Container from "@/components/global/Container";
import FieldName from "@/components/global/FieldName";

import YourExercises from "./YourExercises";
import ExercisesBuilder from "./ExercisesBuilder";
import { Dispatch, SetStateAction } from "react";

interface WorkoutBuilderProps {
  workoutName: string;
  workoutDescription: string;
  setWorkoutName: Dispatch<SetStateAction<string>>;
  setWorkoutDescription: Dispatch<SetStateAction<string>>;
  workoutData: any;
};

export default function WorkoutBuilder ({
  workoutName,
  workoutDescription,
  setWorkoutName,
  setWorkoutDescription,
  workoutData
}: WorkoutBuilderProps) {

  console.log('WorkoutBuilder is rendering');

  return (
    <div className="flex gap-[40px]">
      <div className="md:w-[40%] hidden md:block form dark:bg-darkTheme-950 dark:border-darkTheme-950 bg-white sticky top-[5em] h-[80vh] shadow-sm border border-solid border-gray-200 rounded-lg mt-5">
        <Container>
          <YourExercises />
        </Container>
      </div>

      <div className="form shadow-sm w-full rounded-lg mt-5">
        <Container>
          <div className="field w-full md:w-[50%]">
            <FieldName>
              Workout name
            </FieldName>
            <TextField
              placeholder="e.g. Chest workout"
              value={workoutName}
              onChange={(e) => setWorkoutName(e.target.value)}
            />
          </div>
          <div className="field w-full md:w-[50%] mt-7">
            <FieldName>
              Description
            </FieldName>
            <TextArea
              rows={2}
              value={workoutDescription}
              onChange={(e) => setWorkoutDescription(e.target.value)}
            />
          </div>

          <ExercisesBuilder workoutData={workoutData}>
            <ExercisesBuilder.ActionButtons />
            <ExercisesBuilder.SelectedExercises />
            <ExercisesBuilder.Desktop />
            <ExercisesBuilder.MobileSelection />
          </ExercisesBuilder>
        </Container>
      </div>
    </div>
  );
};