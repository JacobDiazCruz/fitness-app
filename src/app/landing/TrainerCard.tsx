import React, { useState } from 'react';
import styles from './styles/TrainerCard.module.scss';
import TrainerRating from '../trainer/TrainerRating';
import Image from 'next/image';

interface Trainer {
  name: string;
  description: string;
  displayedPrice: number;
  status: string;
};

export default function TrainerCard() {
  const [trainerData, setTrainerData] = useState<Trainer>({
    name: "John Doe",
    description: "I will be your online personal trainer and nutritionist",
    displayedPrice: 200,
    status: "Top Coach"
  });

  return (
    <div className={styles.TrainerCard}>
      <div className={styles.TrainerCard_CoverImage}>
        <Image
          alt="Cover Image"
          width={200}
          height={200}
          src="https://res.cloudinary.com/dqrtlfjc0/image/upload/v1676531024/Oneguru%20Projects/Identifying%20the%20primary%20actions%20and%20sections/Q3_ITEM_B_zcgwbk.png" 
        />
      </div>
      <div className={styles.TrainerCard_Details}>
        <div className={styles.TrainerCard_Header}>
          <div className={styles.TrainerCard_Avatar}>
            <Image
              alt="Cover Image"
              width={200}
              height={200}
              src="https://res.cloudinary.com/dqrtlfjc0/image/upload/v1676531024/Oneguru%20Projects/Identifying%20the%20primary%20actions%20and%20sections/Q3_ITEM_B_zcgwbk.png" 
            />
          </div>
          <p>John Doe</p>
        </div>
        <div className={styles.TrainerCard_Body}>
          <p className="TrainerCard_Description">
            I will be your online personal trainer and nutritionist
          </p>
          <TrainerRating />
          <div className={styles.TrainerCard_Footer}>
            <div className={styles.TrainerCard_Status}>
              Top Coach
            </div>
            <div className={styles.TrainerCard_Price}>
              $200<span>/hr</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}