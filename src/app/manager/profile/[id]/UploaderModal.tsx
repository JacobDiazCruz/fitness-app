import { editGalleryImages, editPortfolioImages } from "@/api/Profile";
import Button from "@/components/global/Button";
import Modal, { ModalContent, ModalFooter, ModalHeader, ModalTitle } from "@/components/global/Modal";
import Uploader from "@/components/global/Uploader";
import useAlert from "@/store/Alert";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";

interface UploaderModalProps {
  uploadType: 'PORTFOLIO_UPLOAD' | 'GALLERY_UPLOAD';
  headerTitle: string;
  existingServerFiles: string[];
  max?: number;
  refetchProfile: any;
  onClose: () => void;
};

export default function UploaderModal({
  uploadType,
  headerTitle = "",
  existingServerFiles = [],
  refetchProfile,
  max = 6,
  onClose
}: UploaderModalProps) {
  const { dispatchAlert }: any = useAlert();

  // states
  const [initialFiles, setInitialFiles] = useState<Array<string>>([]);
  const [existingFiles, setExistingFiles] = useState<Array<string>>([]);

  // mutations
  const editPortfolioImagesMutation = useMutation(editPortfolioImages, {
    onSuccess: async () => {
      dispatchAlert({
        type: "SUCCESS",
        message: "Portfolio saved successfully."
      })
      refetchProfile();
      onClose();
    },
    onError: (err) => {
      console.log(err);
    }
  });

  const editGalleryImagesMutation = useMutation(editGalleryImages, {
    onSuccess: async () => {
      dispatchAlert({
        type: "SUCCESS",
        message: "Gallery saved successfully."
      });
      refetchProfile();
      onClose();
    },
    onError: (err) => {
      console.log(err);
    }
  });

  useEffect(() => {
    setExistingFiles(existingServerFiles);
  }, [existingServerFiles]);

  const handleSave = async () => {
    try {
      const formData = new FormData();
      initialFiles.forEach((file) => {
        formData.append('files', file);
      });
      existingFiles.forEach((file) => {
        formData.append('existingFiles', file);
      });

      if(uploadType === "PORTFOLIO_UPLOAD") {
        await editPortfolioImagesMutation.mutateAsync(formData);
      } else if (uploadType === "GALLERY_UPLOAD") {
        await editGalleryImagesMutation.mutateAsync(formData);
      }
    } catch(err) {
      console.log(err);
    }
  };

  return (
    <Modal onClose={onClose} className="w-[800px] h-[80%]">
      <ModalHeader>
        <ModalTitle>
          {headerTitle}
        </ModalTitle>
      </ModalHeader>
      <ModalContent>
        <Uploader
          id={uploadType}
          max={max}
          initialFilesList={initialFiles}
          setInitialFilesList={setInitialFiles}
          existingFilesList={existingFiles}
          setExistingFilesList={setExistingFiles}
        />
      </ModalContent>
      <ModalFooter>
        <div className="flex justify-between">
          <div></div>
          <Button
            variant="contained"
            onClick={handleSave}
            loading={editPortfolioImagesMutation.isLoading || editGalleryImagesMutation.isLoading}
          >
            Save
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};