import YourExercises from "./YourExercises";
import TextArea from "@/components/global/TextArea";
import TextField from "@/components/global/TextField";
import ExercisesBoard from "./ExercisesBoard";
import Container from "@/components/global/Container";

interface Props {
  workoutName: string;
  workoutDescription: string;
  setWorkoutName: any;
  setWorkoutDescription: any;
};

export default function WorkoutForm ({
  workoutName,
  workoutDescription,
  setWorkoutName,
  setWorkoutDescription
}: Props) {
  return (
    <div className="flex gap-[40px]">
      <div className="md:w-[40%] form dark:bg-neutral-950 dark:border-neutral-950 bg-white sticky top-[5em] h-[80vh] shadow-sm border border-solid border-gray-200 rounded-lg mt-5">
        <Container>
          <YourExercises />
        </Container>
      </div>

      <div className="form dark:bg-neutral-950 dark:border-neutral-950 border border-solid border-gray-200 shadow-sm w-full p-8 rounded-lg mt-5">
        <div className="field w-[50%]">
          <p className="dark:text-neutral-50 text-neutral-950 mb-3 text-[14px]">
            Workout name
          </p>
          <TextField
            placeholder="e.g. Chest workout"
            value={workoutName}
            onChange={(e) => setWorkoutName(e.target.value)}
          />
        </div>
        <div className="field w-[50%] mt-7">
          <p className="dark:text-neutral-50 text-neutral-950 mb-3 text-[14px]">
            Description
          </p>
          <TextArea
            rows={2}
            value={workoutDescription}
            onChange={(e) => setWorkoutDescription(e.target.value)}
          />
        </div>
        <ExercisesBoard />
      </div>
    </div>
  );
}