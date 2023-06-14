export default function IconButton({
  className,
  onClick,
  children
}: any) {
  return (
    <button 
      onClick={onClick}
      className={`${className} p-2 rounded-full hover:bg-gray-100 text-left`}>
      {children}
    </button>
  );  
}