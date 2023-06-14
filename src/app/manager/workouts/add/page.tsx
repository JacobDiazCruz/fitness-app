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
        <div className="form bg-white sticky top-[5em] h-[80vh] shadow-sm border border-solid border-gray-200 w-[25%] py-8 rounded-lg mt-5">
          <YourExercises />
        </div>

        <div className="form bg-white border border-solid border-gray-200 shadow-sm w-[75%] p-8 rounded-lg mt-5">
          <EditExercises />
        </div>
      </div>
    </>
  );
}