interface Props {
  width: number;
  height: number;
  onClose: any;
  className: string;
  children: React.ReactNode;
};

export default function Modal({
  width,
  height,
  onClose,
  className,
  children
}: Props) {
  return (
    <>
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div
        className={`${className} bg-white shadow-sm p-5 rounded-xl m-auto overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none`}
      >
        {children}
      </div>
    </>
  );
}

Modal.defaultProps = {
  width: 400,
  height: 100
}