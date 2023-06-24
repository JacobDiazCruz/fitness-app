import Image from "next/image";

interface Props {
  files: Array<any>;
  isLoading: boolean;
};

export default function FilesDisplay({
  files,
  isLoading
}: Props) {
  return (
    <div className="flex gap-[5px]">
      {files?.map((file) => (
        <div className="hover:opacity-[0.5] cursor-pointer w-[100px] h-[100px] rounded-md relative overflow-hidden">
          {file && (
            <Image
              alt="Other Chat Image"
              src={file}
              style={{ objectFit: "cover" }}
              fill
            />
          )}
        </div>
      ))}
    </div>
  );
}