import { useState } from "react";

export default function TableLoader() {
  const [loaders, setLoaders] = useState([1,2,3]);

  return (
    <div className="table-loader">
      {loaders.map(loader => (
        <div className="flex gap-[40px] py-4 px-5 border-t border-t-solid dark:border-neutral-900 border-gray-100 items-center">
          <div className="flex-1 flex gap-[15px] items-center">
            <div className="w-[50px] h-[50px] rounded-lg dark:bg-neutral-900 bg-gray-100"></div>
            <div className="w-full h-[20px] rounded-lg dark:bg-neutral-900 bg-gray-100"></div>
          </div>
          <div className="flex-1 dark:bg-neutral-900 bg-gray-100 rounded-lg h-[20px]"></div>
          <div className="flex-1 dark:bg-neutral-900 bg-gray-100 rounded-lg h-[20px]"></div>
          <div className="flex-1 dark:bg-neutral-900 bg-gray-100 rounded-lg h-[20px]"></div>
        </div>
      ))}
    </div>
  );
}