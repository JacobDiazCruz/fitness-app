'use client';

import CoachList from '@/components/global/CoachList';
import Header from '../Header';

export default function CoachesPage() {
  return (
    <>
      <Header pageTitle="Coaches" />
      <CoachList />
    </>
  );
};