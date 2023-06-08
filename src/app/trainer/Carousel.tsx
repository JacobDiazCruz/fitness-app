import Image from "next/image";
interface Props {
  galleryImages: Array<any>;
};

export default function Carousel({
  galleryImages
}: Props) {

  const backIcon: SVGAElement = <svg t="1684992601027" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2371" width="50" height="50"><path d="M384 512L731.733333 202.666667c17.066667-14.933333 19.2-42.666667 4.266667-59.733334-14.933333-17.066667-42.666667-19.2-59.733333-4.266666l-384 341.333333c-10.666667 8.533333-14.933333 19.2-14.933334 32s4.266667 23.466667 14.933334 32l384 341.333333c8.533333 6.4 19.2 10.666667 27.733333 10.666667 12.8 0 23.466667-4.266667 32-14.933333 14.933333-17.066667 14.933333-44.8-4.266667-59.733334L384 512z" fill="#FFF" p-id="2372"></path></svg>;
  const nextIcon: SVGAElement = <svg t="1684992636496" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3337" width="50" height="50"><path d="M731.733333 480l-384-341.333333c-17.066667-14.933333-44.8-14.933333-59.733333 4.266666-14.933333 17.066667-14.933333 44.8 4.266667 59.733334L640 512 292.266667 821.333333c-17.066667 14.933333-19.2 42.666667-4.266667 59.733334 8.533333 8.533333 19.2 14.933333 32 14.933333 10.666667 0 19.2-4.266667 27.733333-10.666667l384-341.333333c8.533333-8.533333 14.933333-19.2 14.933334-32s-4.266667-23.466667-14.933334-32z" fill="#FFF" p-id="3338"></path></svg>;

  return (
    <div className="carousel-container">
      <div className="w-full h-[363px] overflow-hidden relative">
        <div className="z-[100] relative flex h-full items-center cursor-pointer justify-between">
          <div onClick={() => alert(1)}>
            {backIcon}
          </div>
          <div onClick={() => alert(2)}>
            {nextIcon}
          </div>
        </div>
        <Image
          alt="Cover Image"
          fill
          style={{ objectFit: "cover" }}
          src="https://res.cloudinary.com/dqrtlfjc0/image/upload/v1676531024/Oneguru%20Projects/Identifying%20the%20primary%20actions%20and%20sections/Q3_ITEM_B_zcgwbk.png"
        />
      </div>
      <div className="flex py-[14px] px-0">
        {galleryImages.map(image => (
          <div className="w-[150px] h-[104px] overflow-hidden relative mr-[14px]">
            <Image
              alt={image.alt}
              fill
              style={{ objectFit: "cover" }}
              src={image.src}
            />
          </div>
        ))}
      </div>
    </div>
  );
}