import Button from "@/components/global/Button";
import Container from "@/components/global/Container";
import FileModal from "@/components/global/FileModal";
import { ArrowRightIcon } from "@/components/global/Icons";
import { primaryTextColor } from "@/utils/themeColors";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface Props {
  portfolioImages: Array<any>;
};

export default function CoachDetailsPortfolio({
  portfolioImages
}: Props) {
  
  const [selectedFile, setSelectedFile] = useState<string>("");
  
  return (
    <Container className="mt-5">
      <div className="flex justify-between">
        <h4 className={`${primaryTextColor} text-[22px] font-semibold`}>
          My Portfolio
        </h4>
        <Link href="/trainer/portfolio/123">
          <Button
            endIcon={<ArrowRightIcon />}
            className={primaryTextColor}
          >
            View all
          </Button>
        </Link>
      </div>
      <div className="flex mt-5 gap-[15px] overflow-hidden">
        {portfolioImages?.slice(0, 4).map(image => (
          <div 
            className="w-[220px] relative h-[200px] cursor-pointer"
            onClick={() => setSelectedFile(image)}
          >
            <Image
              alt={"Portfolio Image"}
              src={image}
              style={{ objectFit: "cover" }}
              fill
            />
          </div>
        ))}
      </div>
      {selectedFile && (
        <FileModal 
          file={selectedFile} 
          onClose={() => setSelectedFile("")}
        />
      )}
    </Container>
  );
};