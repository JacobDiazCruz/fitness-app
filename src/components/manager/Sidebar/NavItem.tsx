import { useSidebar } from '@/contexts/Sidebar/useSidebar';
import useTheme from '@/contexts/Theme';
import { usePathname, useRouter } from 'next/navigation';

interface NavItemProps {
  index: number;
  path: string;
  name: string;
  icon: React.ReactNode;
};

export default function NavItem({
  index, 
  path, 
  name, 
  icon,
}: NavItemProps) {
  const router = useRouter();
  const { openNav }: any = useSidebar();
  const pathname = usePathname();
  const { darkMode }: any = useTheme();
  const isActive = pathname.startsWith(path);

  return (
    <li
      key={index}
      className={`
        ${(isActive && darkMode) && 'bg-darkTheme-700'} 
        ${(isActive && !darkMode) && 'bg-[#eeeeee]'}
        ${darkMode ? 'hover:bg-darkTheme-800' : 'hover:bg-[#f2f2f2]'}
        rounded-lg group relative cursor-pointer px-3 py-2
      `}
      onClick={() => router.push(path)}
    >
      <div className="flex items-center">
        {icon}
        {openNav && (
          <p
            className={`
              ${(isActive && darkMode) ? "text-white font-medium" : "text-[#898995]"}
              ${(isActive && !darkMode) ? 'text-[#24282C] font-medium' : 'text-[#898995]'} 
              font-light ml-4 text-[12px]
            `}
          >
            {name}
          </p>
        )}
      </div>
      {!openNav && (
        <span className="absolute z-100 scale-0 left-20 top-5 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
          {name}
        </span>
      )}
    </li>
  );
};