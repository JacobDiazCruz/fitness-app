import { useEffect, useState } from "react";
import SelectedExercise from "./SelectedExercise";
import { CubeTransparentIcon, DropdownIcon } from "@/components/global/Icons";
import useWorkout from "@/contexts/Workout";
import Button from "@/components/global/Button";

interface Props {
  selectedExercises: Array<any>;
  setSelectedExercises: any;
};

// few things to make sure this component works
// 1. Make sure draggedExercise state always have value during drag events
// 2. Make sure drop event removes draggedExercise value and other values

// note:
// 1. find height of every droppable element
// 2. calculate if the draggable element is on the top half of the droppable element
   // if yes, drag the element to the top
   // if it's in the bottom half no, drag the element to the bottom
export default function DraggableExercises() {
  const { 
    selectedExercises,
    handleUnmergeSuperset,
    setSelectedExercises
  } = useWorkout();

  const [draggedExercise, setDraggedExercise] = useState(null);
  const [draggedExerciseId, setDraggedExerciseId] = useState(null);
  const [showExerciseForm, setShowExerciseForm] = useState(true);
  const [checked, setChecked] = useState(false);
  const [checkedSuperset, setCheckedSuperset] = useState(false);
  const [showDropContainer, setShowDropContainer] = useState(false);
  const [targetExerciseId, setTargetExerciseId] = useState("");

  const handleDrag = (exercise: any) => {
    setDraggedExercise(exercise);
  };

  const handleDrop = (e, index, exercise) => {
    e.preventDefault();
    const targetIndex = selectedExercises.indexOf(draggedExercise);
    const currentY = e.clientY;
 
    if (index !== targetIndex && targetIndex !== -1) {
      const updatedArr = [...selectedExercises];
      updatedArr.splice(targetIndex, 1);
      updatedArr.splice(index, 0, draggedExercise);

      setSelectedExercises(updatedArr);
    }

    setTargetExerciseId("");
    setDraggedExercise(null);
    setShowDropContainer(false);
  }

  const handleDropSuperset = (e, exercise) => {
    e.stopPropagation();
  
    // Get the dragged exercise from dataTransfer if available
    const dataDraggedExercise = JSON.parse(e.dataTransfer.getData("exercise") || null);
  
    const updatedExercises = [...selectedExercises];
    const sourceExercise = updatedExercises.find((ex) => ex.secondaryId === draggedExercise?.secondaryId);
    const targetExercise = updatedExercises.find((ex) => ex.secondaryId === exercise.secondaryId);

    if (targetExercise) {
      // Remove the source exercise from its original position
      if (sourceExercise) {
        updatedExercises.splice(updatedExercises.indexOf(sourceExercise), 1);
      }

      // Move the source exercise into the target exercise's supersetExercises array
      targetExercise.supersetExercises.push(sourceExercise || dataDraggedExercise);
      setSelectedExercises(updatedExercises);
    }
    
    setTargetExerciseId("");
    setDraggedExercise(null);
    setShowDropContainer(false);  
  };

  const handleRemoveExercise = (secondaryId) => {
    setSelectedExercises((prevExercises) => {
      return prevExercises.filter((prevExercise) => {
        if(prevExercise.secondaryId !== secondaryId) {
          return {
            ...prevExercise
          }
        }
      })
    })
  };

  const handleCheck = (exerciseId) => {
    setSelectedExercises((prevExercises) => {
      return prevExercises.map((prevExercise) => {
        if (exerciseId === prevExercise.secondaryId) {
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
        <div key={exercise.secondaryId} className="relative">
          <div
            className="dark:bg-darkTheme-900 bg-neutral-200 w-full h-[180px] absolute rounded-lg"
            style={{
              display: draggedExercise === exercise ? "block" : "none"
            }}
          ></div>
          <div
            draggable
            data-id={exercise.secondaryId}
            id={exercise.secondaryId}
            data-index={index}
            onDragStart={(e) => {
              e.dataTransfer.setData("text/plain", "");
            }}
            onDragOver={(e) => {
              e.preventDefault();
            }}
            onDrop={(e) => handleDrop(e, index, exercise)}
            onDrag={(e) => handleDrag(exercise)} // Update state during drag
            // onDragEnter={(e) => handleDragEnter(e, index, exercise)}
            className="cursor-grab mt-4"
            style={{
              opacity: draggedExercise === exercise ? 0.01 : 1,
            }}
          >
            {exercise?.supersetExercises?.length ? (
              <div
                className="border-[2px] relative cursor-grab border-solid border-blue-900 rounded-lg overflow-hidden mt-5"
                onDragOver={(e) => {
                  e.preventDefault();
                  setTargetExerciseId(exercise.secondaryId)
                }}
                onDrop={(e) => handleDrop(e, index)}
              >
                <div className="bg-blue-900 px-5 py-3 flex justify-between">
                  <div className="flex gap-[10px] items-center">
                    <CubeTransparentIcon className="text-white w-4 h-4" />
                    <p className="text-white font-normal">Superset</p>
                  </div>
                  <div>
                    <Button
                      variant="outlined"
                      className="mr-2"
                      startIcon={<CubeTransparentIcon />}
                      onClick={() => handleUnmergeSuperset(exercise.secondaryId)}
                    >
                      Unmerge Superset
                    </Button>
                    <button onClick={() => setShowExerciseForm(!showExerciseForm)}>
                      <DropdownIcon className="fill-white w-6 h-6" />
                    </button>
                  </div>
                </div>
                {showExerciseForm && (
                  <>
                    {exercise?.supersetExercises.map((superExercise, supersetIndex) => {
                      const { 
                        secondaryId, 
                        name, 
                        checked, 
                        videoLink,
                        files, 
                        primaryFocus,
                        sets
                      } = superExercise;

                      return (
                        <SelectedExercise
                          exerciseType="superset"
                          key={secondaryId}
                          name={name}
                          checked={checked}
                          imageSrc={files[0]}
                          videoLink={videoLink}
                          exerciseId={secondaryId}
                          sets={sets}
                          exerciseIndex={index}
                          supersetIndex={supersetIndex}
                          primaryFocus={primaryFocus}
                          handleRemoveExercise={() => handleRemoveExercise(secondaryId)}
                          showCheckInput={false}
                          onCheck={() => handleCheck(secondaryId)}
                        />
                      )
                    })}
                    {(targetExerciseId == exercise.secondaryId) && (
                      <div
                        className="h-[120px] my-5 bg-white w-[97%] rounded-lg m-auto flex items-center border-dashed border-[2px] border-indigo-900"
                        onDrop={(e) => handleDropSuperset(e, exercise)}
                      >
                        <p className="text-gray-500 m-auto text-center">
                          Drop your exercise here
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>
            ) : (
              <SelectedExercise
                exerciseType="normal"
                name={exercise.name}
                exerciseId={exercise.secondaryId}
                sets={exercise?.sets}
                exerciseIndex={index}
                videoLink={exercise.videoLink}
                imageSrc={exercise.files[0]}
                primaryFocus={exercise.primaryFocus}
                handleRemoveExercise={() => handleRemoveExercise(exercise.secondaryId)}
                checked={exercise.checked}
                onCheck={() => handleCheck(exercise.secondaryId)}
              />
            )}
          </div>
        </div>
      ))}
    </>
  );
}