import { useEffect, useState } from "react";
import { CloseIcon, SearchIcon } from "@/components/global/Icons";
import Modal from "@/components/global/Modal";
import TextField from "@/components/global/TextField";
import Button from "@/components/global/Button";

const initialWorkouts = [
  {
    name: "Lower Body 40:20 5x5 - Demo",
    selected: false,
    exercises: []
  },
  {
    name: "Chest workout",
    selected: false,
    exercises: []
  }
];

export default function SelectWorkoutModal({ onClose }: any) {
  const [searchVal, setSearchVal] = useState<string>("");
  const [workouts, setWorkouts] = useState([]);

  const toggleWorkoutSelection = (index: number) => {
    const updatedWorkouts = [...workouts];
    updatedWorkouts[index].selected = !updatedWorkouts[index].selected;
    setWorkouts(updatedWorkouts);
  };

  useEffect(() => {
    const filteredWorkouts = 
      initialWorkouts.filter((workout) => {
        if(workout.name.toLowerCase().includes(searchVal.toLowerCase())) {
          return workout
        }
      });
    setWorkouts(filteredWorkouts);
  }, [searchVal]);

  return (
    <Modal onClose={onClose} className="w-[350px] h-[80%] p-7">
      <div className="flex justify-between">
        <h2 className="font-semibold">Select a Workout</h2>
        <button onClick={onClose}>
          <CloseIcon className="w-5 h-5" />
        </button>
      </div>
      <div className="workouts-list mt-6">
        <TextField 
          startIcon={<SearchIcon />} 
          placeholder="Search workout"
          value={searchVal}
          className="bg-gray-100"
          onChange={(e) => setSearchVal(e.target.value)}
        />
        <p className="text-[13px] text-gray-500 mt-4 mb-2">{workouts?.length} workouts</p>
        {workouts.map((workout, index) => (
          <div
            className={`rounded-lg cursor-pointer mb-3 border border-gray-200 border-solid p-3 w-full ${
              workout.selected ? "bg-indigo-50 border-indigo-700" : ""
            }`}
            key={workout.name}
            onClick={() => toggleWorkoutSelection(index)}
          >
            <h3 className="font-medium text-[14px]">{workout.name}</h3>
            <p className="font-regular text-gray-500 mt-1 text-[13px]">
              {workout?.exercises.length} Exercises
            </p>
          </div>
        ))}
      </div>
      <div className="modal-footer absolute left-0 bottom-0 w-full p-4 bg-gray-100">
        <Button className="w-full text-center" variant="contained">
          Select
        </Button>
      </div>
    </Modal>
  );
}