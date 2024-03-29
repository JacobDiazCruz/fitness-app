import HomeLayout from '@/layouts/HomeLayout';
import Landing from './landing';

export const metadata = {
  title: 'Home',
  description: 'Generated by create next app',
}

export default function Home() {
  return (
    <HomeLayout>
      <Landing />
    </HomeLayout>
  );
}