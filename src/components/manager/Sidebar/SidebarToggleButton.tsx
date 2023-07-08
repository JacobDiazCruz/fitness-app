import { useSidebar } from "@/contexts/Sidebar/useSidebar";
import { borderColor, primaryBgColor } from "@/utils/themeColors";

export default function SidebarToggleButton() {
  const {
    openNav,
    setOpenNav
  }: any = useSidebar();

  return (
    <>
      <div
        onClick={() => setOpenNav(!openNav)}
        className={`
          ${borderColor}
          ${primaryBgColor}
          absolute
          shadow-md rounded-full right-[-15px] w-[35px] h-[35px] flex border border-solid cursor-pointer z-[100]
        `}
      >
        {openNav ? (
          <svg className="icon m-auto" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4186" width="18" height="18"><path d="M268.8 480L633.6 149.333333c17.066667-14.933333 44.8-14.933333 59.733333 2.133334 6.4 8.533333 10.666667 19.2 10.666667 29.866666v661.333334c0 23.466667-19.2 42.666667-42.666667 42.666666-10.666667 0-21.333333-4.266667-27.733333-10.666666l-362.666667-330.666667c-17.066667-14.933333-19.2-42.666667-2.133333-59.733333-2.133333-2.133333 0-2.133333 0-4.266667z" fill="#666666" p-id="4187"></path></svg>
        ) : (
          <svg className="icon m-auto" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3213" width="18" height="18"><path d="M755.2 544L390.4 874.666667c-17.066667 14.933333-44.8 14.933333-59.733333-2.133334-6.4-8.533333-10.666667-19.2-10.666667-29.866666v-661.333334c0-23.466667 19.2-42.666667 42.666667-42.666666 10.666667 0 21.333333 4.266667 27.733333 10.666666l362.666667 330.666667c17.066667 14.933333 19.2 42.666667 2.133333 59.733333 2.133333 2.133333 0 2.133333 0 4.266667z" fill="#666666" p-id="3214"></path></svg>
        )}
      </div>
      <hr className={`${borderColor} mt-5 absolute w-full`} />
    </>
  );
};