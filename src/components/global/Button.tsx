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
  return (
    <button
      id={id}
      type="button"
      className={`${className} text-center btn-${variant} h-[45px] px-4 rounded-lg overflow-hidden relative`}
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