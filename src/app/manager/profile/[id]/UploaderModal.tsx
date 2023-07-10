import { editGalleryImages, editPortfolioImages } from "@/api/Profile";
import Button from "@/components/global/Button";
import Modal, { ModalContent, ModalFooter, ModalHeader, ModalTitle } from "@/components/global/Modal";
import Uploader from "@/components/global/Uploader";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";

interface UploaderModalProps {
  uploadType: 'PORTFOLIO_UPLOAD' | 'GALLERY_UPLOAD';
  headerTitle: string;
  existingServerFiles: string[];
  max?: number;
  onClose: () => void;
};

export default function UploaderModal({
  uploadType,
  headerTitle = "",
  existingServerFiles = [],
  max = 6,
  onClose
}: UploaderModalProps) {

  // states
  const [initialFiles, setInitialFiles] = useState<Array<string>>([]);
  const [existingFiles, setExistingFiles] = useState<Array<string>>([]);

  // mutations
  const editPortfolioImagesMutation = useMutation(editPortfolioImages);
  const editGalleryImagesMutation = useMutation(editGalleryImages);

  useEffect(() => {
    setExistingFiles(existingServerFiles);
  }, [existingServerFiles]);

  const handleSubmit = async () => {
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
    <Modal onClose={onClose} className="w-[700px] h-fit">
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
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};