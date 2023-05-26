'use client';

import Image from 'next/image'
import styles from '../page.module.css';
import TrainerCard from './TrainerCard';

export default function Landing() {
  return (
    <main className={styles.main}>
      <TrainerCard />
    </main>
  );
};