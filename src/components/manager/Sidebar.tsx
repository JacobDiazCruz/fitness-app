import { useState } from "react";
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import Link from "next/link";
import UserMenu from '../global/UserMenu';
import { ChatIcon, DoubleUserIcon } from "../global/Icons";

export default function Sidebar () {
  const router = useRouter();
  const pathname = usePathname();

  const [openNav, setOpenNav] = useState(true);
  const [navItems, setNavItems] = useState([
    {
      icon: <DoubleUserIcon className="w-6 h-6 text-gray-400" />,
      name: "Clients",
      path: "/manager/clients"
    },
    {
      icon: <svg t="1685421363075" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5058" width="25" height="25"><path d="M745.813333 279.466667l-121.173333-121.173334a42.666667 42.666667 0 0 0-60.586667 0 42.666667 42.666667 0 0 0 0 60.16l90.453334 90.453334-345.6 345.6-90.453334-90.453334a42.666667 42.666667 0 0 0-60.16 0 42.666667 42.666667 0 0 0 0 60.586667l119.893334 119.893333 119.893333 119.893334a42.666667 42.666667 0 0 0 30.293333 12.8 42.666667 42.666667 0 0 0 30.293334-72.96l-89.173334-89.173334 345.6-345.6 90.453334 90.453334a42.666667 42.666667 0 1 0 60.16-60.586667zM158.293333 744.96a42.666667 42.666667 0 0 0-60.586666 60.586667l120.746666 120.746666a42.666667 42.666667 0 0 0 30.293334 12.373334 42.666667 42.666667 0 0 0 30.293333-12.373334 42.666667 42.666667 0 0 0 0-60.586666z m768-526.506667l-120.746666-120.746666a42.666667 42.666667 0 0 0-60.586667 60.586666l120.746667 120.746667a42.666667 42.666667 0 0 0 60.586666 0 42.666667 42.666667 0 0 0 0-60.586667z" p-id="5059" fill="#90959A"></path></svg>,
      name: "Exercises",
      path: "/manager/exercises"
    },
    {
      icon: <svg t="1685421566511" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5724" width="25" height="25"><path d="M696.888889 294.4v-76.8c0-31.288889-25.6-56.888889-56.888889-56.888889H384c-31.288889 0-56.888889 25.6-56.888889 56.888889v76.8H184.888889c-31.288889 0-56.888889 25.6-56.888889 56.888889v455.111111c0 31.288889 25.6 56.888889 56.888889 56.888889h654.222222c31.288889 0 56.888889-25.6 56.888889-56.888889v-455.111111c0-31.288889-25.6-56.888889-56.888889-56.888889H696.888889z m-312.888889-76.8h256v76.8H384v-76.8z m455.111111 588.8H184.888889v-455.111111h654.222222v455.111111z" p-id="5725" fill="#90959A"></path></svg>,
      name: "Workouts",
      path: "/manager/workouts"
    },
    {
      icon: <svg width="25" height="25" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M26.1215 2.18354H21.8231V1.67944C21.8231 1.20933 21.4567 0.829834 21.0028 0.829834C20.5489 0.829834 20.1824 1.20933 20.1824 1.67944V2.18354H7.60979V1.67944C7.60979 1.20933 7.24338 0.829834 6.78948 0.829834C6.33557 0.829834 5.96917 1.20933 5.96917 1.67944V2.18354H1.89221C1.28791 2.18354 0.798462 2.69048 0.798462 3.31636V27.0233C0.798462 27.6492 1.28791 28.1561 1.89221 28.1561H26.1215C26.7258 28.1561 27.2153 27.6492 27.2153 27.0233V3.31636C27.2153 2.69048 26.7258 2.18354 26.1215 2.18354ZM25.3039 26.1737H2.71252V10.6598H25.3039V26.1737ZM25.3039 8.9606H2.71252V3.88276H5.96917V4.38686C5.96917 4.85698 6.33557 5.23647 6.78948 5.23647C7.24338 5.23647 7.60979 4.85698 7.60979 4.38686V3.88276H20.1852V4.38686C20.1852 4.85698 20.5516 5.23647 21.0055 5.23647C21.4594 5.23647 21.8258 4.85698 21.8258 4.38686V3.88276H25.3039V8.9606ZM12.8625 15.613H21.6508C22.1485 15.613 22.5531 15.1939 22.5531 14.6785C22.5531 14.163 22.1485 13.7439 21.6508 13.7439H12.8625C12.3649 13.7439 11.9602 14.163 11.9602 14.6785C11.9602 15.1939 12.3649 15.613 12.8625 15.613ZM5.75042 15.9331L7.52229 17.7682L10.552 14.6303C10.8117 14.3613 10.8117 13.9223 10.552 13.6533C10.2922 13.3842 9.86838 13.3842 9.60862 13.6533L7.52229 15.8141L6.69377 14.956C6.43401 14.687 6.01018 14.687 5.75042 14.956C5.49065 15.225 5.49065 15.664 5.75042 15.9331ZM12.8625 22.2315H21.6508C22.1485 22.2315 22.5531 21.8124 22.5531 21.2969C22.5531 20.7815 22.1485 20.3624 21.6508 20.3624H12.8625C12.3649 20.3624 11.9602 20.7815 11.9602 21.2969C11.9602 21.8124 12.3649 22.2315 12.8625 22.2315ZM8.66252 20.368H6.80588C6.30823 20.368 5.90354 20.7872 5.90354 21.3026C5.90354 21.818 6.30823 22.2372 6.80588 22.2372H8.66252C9.16018 22.2372 9.56487 21.818 9.56487 21.3026C9.56487 20.7872 9.16018 20.368 8.66252 20.368Z" fill="#90959A"/></svg>,
      name: "Programs",
      path: "/manager/programs"
    },
    {
      icon: <ChatIcon className="w-6 h-6 text-gray-400" />,
      name: "Messages",
      path: "/manager/messages"
    },
    {
      icon: <svg t="1685199933183" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8018" width="25" height="25"><path d="M858.5 763.6c-18.9-44.8-46.1-85-80.6-119.5-34.5-34.5-74.7-61.6-119.5-80.6-0.4-0.2-0.8-0.3-1.2-0.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-0.4 0.2-0.8 0.3-1.2 0.5-44.8 18.9-85 46-119.5 80.6-34.5 34.5-61.6 74.7-80.6 119.5C146.9 807.5 137 854 136 901.8c-0.1 4.5 3.5 8.2 8 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c0.1 4.4 3.6 7.8 8 7.8h60c4.5 0 8.1-3.7 8-8.2-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z" fill="#90959A" p-id="8019"></path></svg>,
      name: "Profile",
      path: "/manager/profile"
    }
  ]);

  const ToggleButton = () => {
    return (
      <div
        onClick={() => setOpenNav(!openNav)}
        className={`bg-white ${openNav ? 'ml-[210px]' : 'ml-[60px]'} shadow-md rounded-full w-[45px] h-[45px] flex border border-solid border-[#ECECEC] cursor-pointer z-[100] absolute`}
      >
        {openNav ? (
          <svg t="1685329522863" className="icon m-auto" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4186" width="22" height="22"><path d="M268.8 480L633.6 149.333333c17.066667-14.933333 44.8-14.933333 59.733333 2.133334 6.4 8.533333 10.666667 19.2 10.666667 29.866666v661.333334c0 23.466667-19.2 42.666667-42.666667 42.666666-10.666667 0-21.333333-4.266667-27.733333-10.666666l-362.666667-330.666667c-17.066667-14.933333-19.2-42.666667-2.133333-59.733333-2.133333-2.133333 0-2.133333 0-4.266667z" fill="#666666" p-id="4187"></path></svg>
        ) : (
          <svg t="1685329505482" className="icon m-auto" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3213" width="22" height="22"><path d="M755.2 544L390.4 874.666667c-17.066667 14.933333-44.8 14.933333-59.733333-2.133334-6.4-8.533333-10.666667-19.2-10.666667-29.866666v-661.333334c0-23.466667 19.2-42.666667 42.666667-42.666666 10.666667 0 21.333333 4.266667 27.733333 10.666666l362.666667 330.666667c17.066667 14.933333 19.2 42.666667 2.133333 59.733333 2.133333 2.133333 0 2.133333 0 4.266667z" fill="#666666" p-id="3214"></path></svg>
        )}
      </div>
    );
  };

  return (
    <>
      <div className={`bg-[#f7f7f7] ${openNav ? 'w-[270px]' : 'w-[85px]'} h-[100vh] border-r border-r-solid border-gray-200 sticky top-0`}>
        <div className="px-6 pt-8">
          <div className="bg-[#495dff] w-[40px] h-[40px] rounded-lg flex items-center shadow-md">
            <div className="m-auto text-white font-medium">L.</div>
          </div>
        </div>
        <hr className="mt-6 absolute w-full"/>
        <ToggleButton />
        <ul className="pt-9 pb-3 px-3">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.path);
            return (
              <li
                className={`${isActive && 'bg-[#eeeeee]'} rounded-lg group relative hover:bg-gray-100 cursor-pointer px-3 py-4`}
                onClick={() => router.push(item.path)}
                key={item.name}
              >
                <div className="flex items-center" >
                  {item.icon}
                  {openNav && (
                    <p className={`${isActive ? 'text-[#24282C] font-medium' : 'text-gray-500'} font-light ml-4 text-[14px]`}>{item.name}</p>
                  )}
                </div>
                {!openNav && (
                  <span className="absolute z-100 scale-0 left-20 top-5 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
                    {item.name}
                  </span>
                )}
              </li>
            )
          })}
        </ul>
        <hr />
        <div className="p-5">
          <UserMenu openNav={openNav} />
        </div>

        {/* {openNav && (
          <div className="rounded-xl bg-[#24282C] w-[85%] mx-auto mt-5 p-5">
            <h4 className="font-medium text-white">How to use</h4>
            <p className="text-[#A8AAAE] mt-1 text-[14px]">Get more clients by purchasing our latest AI client finder</p>
            <div className="bg-[#D3F26C] rounded-full w-full h-[40px] mt-5 text-center flex flex-center">
              <div className="text-center m-auto">Coming soon</div>
            </div>
          </div>
        )} */}
      </div>
    </>
  );
}