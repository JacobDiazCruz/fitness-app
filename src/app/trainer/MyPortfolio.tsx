import Image from "next/image";
import styles from "./styles/MyPortfolio.module.scss";

interface Props {
  portfolioImages: Array<any>;
};

export default function MyPortfolio({
  portfolioImages
}: Props) {
  const rightArrow: SVGAElement = <svg t="1685070437747" class="icon" style={{marginBottom: "-5px", marginLeft: "5px"}} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2361" width="22" height="22"><path d="M524.501333 225.834667a42.666667 42.666667 0 0 1 60.330667 0l256 256a42.666667 42.666667 0 0 1 0 60.330666l-256 256a42.666667 42.666667 0 0 1-60.330667-60.330666L707.669333 554.666667H213.333333a42.666667 42.666667 0 1 1 0-85.333334h494.336l-183.168-183.168a42.666667 42.666667 0 0 1 0-60.330666z" fill="#595959" p-id="2362"></path></svg>
  
  return (
    <div className={styles.MyPortfolio_MainContainer}>
      <div className={styles.MyPortfolio_Header}>
        <h4>My Portfolio</h4>
        <div className={styles.ViewAll}>
          View all 
          {rightArrow}
        </div>
      </div>
      <div className={styles.MyPortfolio_ImagesContainer}>
        {portfolioImages.map(image => (
          <div className={styles.ImageContainer}>
            <Image
              alt={image?.name || "Portfolio Image"}
              src={image.imagePath}
              style={{ objectFit: "cover" }}
              fill
            />
          </div>
        ))}
      </div>
    </div>
  );
}