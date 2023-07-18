import Image from "next/image";

interface Props {
  files: Array<any>;
  isLoading: boolean;
  setSelectedFile?: any;
}

export default function FilesDisplay({
  files,
  isLoading,
  setSelectedFile
}: Props) {
  const getFile = (file: string) => {
    const isVideo = file.includes('video');
    const isImage = file.includes('image');

    if (isVideo) {
      return "video";
    } else if (isImage) {
      return "image";
    }
  };

  return (
    <div className="flex gap-[5px]">
      {files?.map((file, key) => (
        <>
          {file && getFile(file) === "image" && (
            <div
              key={key}
              onClick={() => {
                setSelectedFile(file);
              }}
              className="hover:opacity-[0.5] cursor-pointer w-[200px] h-[200px] rounded-md relative overflow-hidden"
            >
              <Image
                alt="Chat Image"
                src={file}
                style={{ objectFit: "cover" }}
                fill
              />
            </div>
          )}
          {file && getFile(file) === "video" && (
            <div
              key={key}
              className="w-[400px] mt-2 rounded-md relative overflow-hidden"
            >
              <video
                className="w-auto h-auto"
                src={file}
                controls
                muted
              ></video>
            </div>
          )}
        </>
      ))}
    </div>
  );
}
