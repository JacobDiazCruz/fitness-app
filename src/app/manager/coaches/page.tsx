'use client';

import CoachList from '@/components/manager/coach/CoachList';
import Header from '../Header';

export default function CoachesPage() {
  return (
    <>
      <Header pageTitle="Coaches" />
      <CoachList />
    </>
  );
};