import Image from "next/image";
import IconButton from "@/components/global/IconButton";
import TableItemActions from "@/components/global/TableItemActions";

export default function TableItem({
  name,
  primaryFocus,
  category,
  coverImage
}) {
  return (
    <div className="bg-white cursor-pointer w-full border-t border-gray-100 border-t-solid rounded-lg py-4 px-5">
      <div className="flex items-center w-full justify-between">
        <div className="col-1 flex items-center gap-[20px] flex-1">
          <div className="rounded-md bg-gray-300 w-[50px] h-[50px] overflow-hidden relative">
            <Image
              alt="Trainer Image"
              src={coverImage}
              style={{ objectFit: "cover" }}
              fill
            />
          </div>
          <div>
            <h5 className="font-medium text-[14px]">
              {name || '--'}
            </h5>
          </div>
        </div>
        <div className="col-3 flex-1">
          <p className="text-[14px] text-gray-500">
            {primaryFocus || '--'}
          </p>
        </div>
        <div className="col-4 flex-1">
          <p className="text-[14px] text-gray-500">
            {category || '--'}
          </p>
        </div>
        <div className="col-5 flex-1">
          <p className="text-[14px] text-gray-500">July 12, 2023</p>
        </div>
        <div className="col-5">
          <TableItemActions />
        </div>
      </div>
    </div>
  );
}