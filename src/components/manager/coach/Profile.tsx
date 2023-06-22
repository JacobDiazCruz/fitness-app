import Container from "@/components/global/Container";
import { primaryTextColor, secondaryTextColor } from "@/utils/themeColors";
import Image from "next/image";

interface Props {
  imagePath: string;
  name: string;
  about: string;
};

export default function Profile({
  imagePath,
  name,
  about
}: Props) {
  return (
    <Container>
      <div className="flex">
        <div className="rounded-full relative overflow-hidden w-16 h-16">
          <Image 
            alt="Trainer Image"
            src={imagePath}
            style={{ objectFit: "cover" }}
            fill
          />
        </div>
        <div className="ml-3">
          <h4 className={`${primaryTextColor} font-semibold`}>
            {name}
          </h4>
          <p className={`${secondaryTextColor} font-light`}>
            Certified Online Trainer
          </p>
        </div>
      </div>
      <div className="mt-4">
        <p className={`${secondaryTextColor} font-light`}>
          {about}
        </p>
      </div>
    </Container>
  );
}