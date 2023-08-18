import Image from "next/image";
import FormContainer from "./FormContainer";

interface ProfileGalleryProps {
  handleShowUploaderModal: any;
  galleryImages: string[];
};

export default function ProfileGallery({
  handleShowUploaderModal,
  galleryImages = []
}: ProfileGalleryProps) {
  return (
    <FormContainer
      formTitle="Gallery"
      formIcon={<svg className="m-auto icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2413" width="30" height="30"><path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32z m-40 632H136v-39.9l138.5-164.3 150.1 178L658.1 489 888 761.6V792z m0-129.8L664.2 396.8c-3.2-3.8-9-3.8-12.2 0L424.6 666.4l-144-170.7c-3.2-3.8-9-3.8-12.2 0L136 652.7V232h752v430.2z" p-id="2414" fill="#ffffff"></path><path d="M304 456c48.6 0 88-39.4 88-88s-39.4-88-88-88-88 39.4-88 88 39.4 88 88 88z m0-116c15.5 0 28 12.5 28 28s-12.5 28-28 28-28-12.5-28-28 12.5-28 28-28z" p-id="2415" fill="#ffffff"></path></svg>}
      formDescription="This will be displayed in a carousel at the top of your profile."
      handleEdit={() => handleShowUploaderModal({
        headerTitle: "Upload Gallery Images",
        uploadType: "GALLERY_UPLOAD"
      })}
    >
      <div className="mt-7 flex gap-[15px]">
        {galleryImages.map((image: string, index: number) => (
          <div 
            key={index}
            className="image-container relative w-[100px] bg-black h-[100px] flex items-center rounded-md overflow-hidden"
          >
            <img
              alt={image}
              src={image}
              style={{ objectFit: "fill" }}
            />
          </div>
        ))}
      </div>
    </FormContainer>
  );
};