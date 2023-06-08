'use client';
import Navbar from "@/components/global/Navbar";
import styles from "@/layouts/HomeLayout/HomeLayout.module.scss"

export default function HomeLayout({ 
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <div className={styles.HomeLayout_Main}>
        {children}
      </div>
    </>
  );
}