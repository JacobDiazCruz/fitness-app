import { addCoachingService, editCoachingService } from "@/api/CoachingService";
import Button from "@/components/global/Button";
import { AddIcon } from "@/components/global/Icons";
import Modal, { ModalContent, ModalFooter, ModalHeader, ModalTitle } from "@/components/global/Modal";
import TextField from "@/components/global/TextField";
import useAlert from "@/store/Alert";
import { CoachingService } from "@/utils/coachTypes";
import { useParams } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useMutation } from "react-query";

interface Props {
  initialServicesList: any;
  onClose: Dispatch<SetStateAction<boolean>>;
  refetchProfile: any;
};

export default function EditServicesModal({
  initialServicesList,
  refetchProfile,
  onClose
}: Props) {

  const params = useParams();
  const { dispatchAlert }: any = useAlert();
  const [servicesList, setServicesList] = useState<CoachingService[]>([
    {
      title: "",
      description: ""
    }
  ]);

  useEffect(() => {
    if(initialServicesList.length) {
      setServicesList(initialServicesList);
    }
  }, [initialServicesList]);

  const addCoachingServiceMutation = useMutation(addCoachingService);
  const editCoachingServiceMutation = useMutation(editCoachingService);

  const saveForm = async () => {
    const existingServicesList: CoachingService[] = [];
    const newServicesList: CoachingService[] = [];
    servicesList.map((service) => {
      if(service?._id) {
        existingServicesList.push(service)
      } else {
        newServicesList.push(service)
      }
    });

    try {
      if(existingServicesList.length) {
        await editCoachingServiceMutation.mutateAsync({
          profileId: params.id,
          coachingServices: existingServicesList
        });
      }
      if(newServicesList.length) {
        await addCoachingServiceMutation.mutateAsync({
          profileId: params.id,
          coachingServices: newServicesList
        });
      }
      dispatchAlert({
        type: "SUCCESS",
        message: "Coaching services edited successfully."
      });
      refetchProfile();
      onClose();
    } catch(err) {
      console.log(err);
    }
  };
  
  return (
    <Modal className="w-[950px] h-[800px]" onClose={onClose}>
      <ModalHeader>
        <ModalTitle>
          Edit Coaching Services
        </ModalTitle>
      </ModalHeader>
      <ModalContent>
        {servicesList.map((service: any, index: number) => (
          <div className="pb-5 flex gap-[20px] w-full">
            <div className="w-[226px]">
              <p className="dark:text-neutral-50 text-darkTheme-900 mb-2 text-[14px]">
                Title
              </p>
              <TextField
                value={service.title}
                onChange={(e) => {
                  setServicesList(prev => {
                    const copy = [...prev];
                    copy[index].title = e.target.value;
                    return copy;
                  })
                }}
                placeholder="e.g. Nutrition plan"
                className="h-[49px]"
              />
            </div>
            <div className="w-[350px]">
              <p className="dark:text-neutral-50 text-darkTheme-900 mb-2 text-[14px]">
                Description
              </p>
              <TextField
                value={service.description}
                onChange={(e) => {
                  setServicesList(prev => {
                    const copy = [...prev];
                    copy[index].description = e.target.value;
                    return copy;
                  })
                }}
                className="h-[49px]"
                placeholder="e.g. I will guide you on how to plan your meals"
              />
            </div>
            <div>
              <p className="mb-2 invisible">Actions</p>
              {index == servicesList.length - 1 && (
                <Button 
                  onClick={() => {
                    setServicesList([...servicesList, 
                      { 
                        title: "", 
                        description: ""
                      }
                    ])
                  }}
                  variant="outlined"
                  startIcon={<AddIcon />}
                >
                  Add a Service
                </Button>
              )}
            </div>
          </div>
        ))}
      </ModalContent>
      <ModalFooter>
        <div className="flex justify-between">
          <div></div>
          <Button
            variant="contained"
            onClick={saveForm}
            loading={addCoachingServiceMutation.isLoading}
          >
            Save
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};