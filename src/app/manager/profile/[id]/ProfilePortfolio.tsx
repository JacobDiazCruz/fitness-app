import Image from "next/image";
import FormContainer from "./FormContainer";

interface ProfilePortfolioProps {
  handleShowUploaderModal: any;
  portfolioImages: string[];
};

export default function ProfilePortfolio({
  handleShowUploaderModal,
  portfolioImages = []
}: ProfilePortfolioProps) {
  return (
    <FormContainer
      formTitle="Portfolio"
      formIcon={<svg className="m-auto icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2413" width="30" height="30"><path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32z m-40 632H136v-39.9l138.5-164.3 150.1 178L658.1 489 888 761.6V792z m0-129.8L664.2 396.8c-3.2-3.8-9-3.8-12.2 0L424.6 666.4l-144-170.7c-3.2-3.8-9-3.8-12.2 0L136 652.7V232h752v430.2z" p-id="2414" fill="#ffffff"></path><path d="M304 456c48.6 0 88-39.4 88-88s-39.4-88-88-88-88 39.4-88 88 39.4 88 88 88z m0-116c15.5 0 28 12.5 28 28s-12.5 28-28 28-28-12.5-28-28 12.5-28 28-28z" p-id="2415" fill="#ffffff"></path></svg>}
      formDescription="Upload images of your client's transformation"
      handleEdit={() => handleShowUploaderModal({
        headerTitle: "Upload Portfolio Images",
        uploadType: "PORTFOLIO_UPLOAD"
      })}
    >
      <div className="mt-7 flex gap-[15px]">
        {portfolioImages.map((image: string, index: number) => (
          <div 
            key={index}
            className="image-container relative w-[100px] bg-black h-[100px] flex items-center rounded-md overflow-hidden"
          >
            <Image 
              alt={image}
              src={image}
              fill
            />
          </div>
        ))}
      </div>
    </FormContainer>
  );
};