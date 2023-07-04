import Modal from "./Modal";

export default function FileModal ({ 
  file, 
  onClose 
}: {
  file: string;
  onClose?: () => void;
}) {

  return (
    <Modal className="w-fit h-fit" onClose={onClose}>
      {file && (
        <img
          alt="Other Chat Image"
          className="w-auto h-auto"
          src={file}
          style={{ objectFit: "cover" }}
          fill
        />
      )}
    </Modal>
  );
}