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
    <div className="rounded-lg w-full mt-8 bg-white p-6">
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
          <p className="font-medium">{name}</p>
          <p>Certified Online Trainer</p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-gray-600">
          {about}
        </p>
      </div>
    </div>
  );
}