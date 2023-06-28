export default function IconButton({
  className,
  onClick,
  noPadding,
  children
}: any) {
  return (
    <button 
      onClick={onClick}
      className={`
        ${className} 
        ${!noPadding && 'p-2'}
        dark:hover:bg-neutral-800 rounded-full hover:bg-neutral-100 text-left`}>
      {children}
    </button>
  );  
}