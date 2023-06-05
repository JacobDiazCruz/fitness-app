interface Props {
  onClose: any;
  className: string;
  children: React.ReactNode;
};

export default function Modal({
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
        className={`${className} bg-white shadow-sm rounded-xl m-auto overflow-x-hidden overflow-y-auto fixed inset-0 z-[100] outline-none focus:outline-none`}
      >
        {children}
      </div>
    </>
  );
}