export default function IconButton({
  className,
  onClick,
  children
}: any) {
  return (
    <button 
      onClick={onClick}
      className={`${className} dark:hover:bg-neutral-800 p-2 rounded-full hover:bg-neutral-100 text-left`}>
      {children}
    </button>
  );  
}