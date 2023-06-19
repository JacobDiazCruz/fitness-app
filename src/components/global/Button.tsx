import useTheme from "@/contexts/Theme";
import { LoadingIcon } from "./Icons";

export default function Button({
  id,
  variant = "",
  className = "h-[45px]",
  startIcon,
  endIcon,
  onClick,
  loading = false,
  disabled = false,
  children
}: any) {
  const { darkMode } = useTheme();
  
  const variantsCollection = {
    contained: `${darkMode ? 'bg-white text-black' : 'bg-[#24282C] border-[#24282C] text-white'} border border-solid`,
    outlined: `${darkMode ? 'bg-black border-neutral-700 text-neutral-400' : 'bg-white border-neutral-300 text-neutral-900'} border border-solid`
  };

  return (
    <button
      id={id}
      type="button"
      className={`${variantsCollection[variant]} ${className} text-center h-[45px] px-4 rounded-lg overflow-hidden relative`}
      disabled={disabled}
      onClick={onClick}
    >
      <div className="flex items-center justify-center">
        {startIcon && <span className="mr-2">{startIcon}</span>}
        {loading && <LoadingIcon />}
        <div className={`text-[14px] text-center`}>
          {children}
        </div>
        {endIcon && <span className="ml-2">{endIcon}</span>}
      </div>
    </button>
  );
}