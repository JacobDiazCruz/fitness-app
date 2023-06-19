import ManagerLayout from "../../ManagerLayout";
import PageActions from "../TableActions";
import TableItem from "../TableItem";
import EditExercises from "./EditExercise";
import YourExercises from "./YourExercises";
import Header from "../../Header";

export default function AddWorkout() {

  return (
    <>
      <Header 
        pageTitle="Add New Workout"
        backIcon
        backPath="/manager/workouts"
        showActionButtons
      />
      <div className="flex gap-[40px]">
        <div className="md:w-[40%] form dark:bg-neutral-950 dark:border-neutral-950 bg-white sticky top-[5em] h-[80vh] shadow-sm border border-solid border-gray-200 py-8 rounded-lg mt-5">
          <YourExercises />
        </div>

        <div className="form dark:bg-neutral-950 dark:border-neutral-950 border border-solid border-gray-200 shadow-sm w-full p-8 rounded-lg mt-5">
          <EditExercises />
        </div>
      </div>
    </>
  );
}