import { useEffect, useState } from "react";
import SelectedExercise from "./SelectedExercise";
import { CubeTransparentIcon, DropdownIcon } from "@/components/global/Icons";

interface Props {
  selectedExercises: Array<any>;
  setSelectedExercises: any;
}

export default function MappedExercises({
  selectedExercises,
  setSelectedExercises
}: Props) {
  const [draggedExercise, setDraggedExercise] = useState(null);
  const [showExerciseForm, setShowExerciseForm] = useState(true);
  const [checked, setChecked] = useState(false);
  const [showDropContainer, setShowDropContainer] = useState(false);

  const handleDrag = (exercise: any) => {
    setDraggedExercise(exercise);
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    const targetIndex = selectedExercises.indexOf(draggedExercise);
    
    if (index !== targetIndex && targetIndex !== -1) {
      const updatedArr = [...selectedExercises];
      updatedArr.splice(targetIndex, 1);
      updatedArr.splice(index, 0, draggedExercise);
      setSelectedExercises(updatedArr);
    }
    setDraggedExercise(null);
    setShowDropContainer(false);
  };

  const handleDropSuperset = (e, exercise) => {
    e.stopPropagation();
  
    // Get the dragged exercise from dataTransfer if available
    const dataDraggedExercise = JSON.parse(e.dataTransfer.getData("exercise") || null);
  
    const updatedExercises = [...selectedExercises];
    const sourceExercise = updatedExercises.find((ex) => ex._id === draggedExercise?._id);
    const targetExercise = updatedExercises.find((ex) => ex._id === exercise._id);
  
    if (targetExercise) {
      // Remove the source exercise from its original position
      if (sourceExercise) {
        updatedExercises.splice(updatedExercises.indexOf(sourceExercise), 1);
      }
  
      // Move the source exercise into the target exercise's supersetExercises array
      targetExercise.supersetExercises.push(sourceExercise || dataDraggedExercise);
      setSelectedExercises(updatedExercises);
    }
  
    setDraggedExercise(null);
    setShowDropContainer(false);  
  };

  const handleCheck = (exerciseId) => {
    setSelectedExercises((prevExercises) => {
      return prevExercises.map((prevExercise) => {
        if (exerciseId === prevExercise._id) {
          return {
            ...prevExercise,
            checked: !prevExercise.checked // Toggle the checked value
          };
        }
        return prevExercise;
      });
    });
  }

  return (
    <>
      {selectedExercises?.map((exercise: any, index: number) => (
        <div key={exercise._id} className="relative">
          <div
            className="bg-gray-200 w-full h-[180px] absolute rounded-lg"
            style={{
              visibility: draggedExercise === exercise ? "visible" : "hidden"
            }}
          ></div>
          <div
            draggable
            data-id={exercise._id}
            id={exercise._id}
            data-index={index}
            onDragStart={(e) => {
              e.dataTransfer.setData("text/plain", "");
              handleDrag(exercise);
            }}
            onDragOver={(e) => {
              e.preventDefault();
            }}
            onDrop={(e) => handleDrop(e, index)}
            onDrag={(e) => handleDrag(exercise)} // Update state during drag
            className="cursor-grab mt-4"
            style={{
              opacity: draggedExercise === exercise ? 0.01 : 1
            }}
          >
            {exercise?.supersetExercises?.length ? (
              <div
                className="border-[2px] relative cursor-grab border-solid border-indigo-950 rounded-lg overflow-hidden mt-5"
                onDragOver={(e) => {
                  e.preventDefault();
                }}
                onDragOver={() => setShowDropContainer(true)}
                onDrop={(e) => handleDrop(e, index)}
              >
                <div className="bg-indigo-950 px-5 py-3 flex justify-between">
                  <div className="flex gap-[10px] items-center">
                    <CubeTransparentIcon className="text-white w-4 h-4" />
                    <p className="text-white font-normal">Superset</p>
                  </div>
                  <button onClick={() => setShowExerciseForm(!showExerciseForm)}>
                    <DropdownIcon className="fill-white w-6 h-6" />
                  </button>
                </div>
                {showExerciseForm && (
                  <>
                    {exercise?.supersetExercises.map((superExercise) => (
                      <SelectedExercise
                        key={superExercise._id}
                        exercise={superExercise}
                        exerciseId={superExercise._id}
                        showCheckInput={false}
                        onCheck={() => handleCheck(superExercise._id)}
                      />
                    ))}
                    {showDropContainer && (
                      <div
                        className="h-[120px] my-5 bg-white w-[97%] rounded-lg m-auto flex items-center border-dashed border-[2px] border-indigo-900"
                        onDrop={(e) => handleDropSuperset(e, exercise)}
                      >
                        <p className="text-gray-500 m-auto text-center">Drop your exercise here</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            ) : (
              <SelectedExercise
                exercise={exercise}
                exerciseId={exercise._id}
                onCheck={() => handleCheck(exercise._id)}
              />
            )}
          </div>
        </div>
      ))}
    </>
  );
}
