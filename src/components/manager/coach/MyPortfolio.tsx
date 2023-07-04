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

export default function MyPortfolio({
  portfolioImages
}: Props) {
  const [selectedFile, setSelectedFile] = useState<string>("");
  const rightArrow: SVGAElement = <svg t="1685070437747" className="icon" style={{marginBottom: "-5px", marginLeft: "5px"}} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2361" width="22" height="22"><path d="M524.501333 225.834667a42.666667 42.666667 0 0 1 60.330667 0l256 256a42.666667 42.666667 0 0 1 0 60.330666l-256 256a42.666667 42.666667 0 0 1-60.330667-60.330666L707.669333 554.666667H213.333333a42.666667 42.666667 0 1 1 0-85.333334h494.336l-183.168-183.168a42.666667 42.666667 0 0 1 0-60.330666z" fill="#595959" p-id="2362"></path></svg>
  
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
          onClose={() => setSelectedFile(!selectedFile)}
        />
      )}
    </Container>
  );
};