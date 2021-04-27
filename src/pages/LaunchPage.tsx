import React from 'react';
import Nav from '../components/Nav';
import LaunchPage_1 from '../components/LaunchPage_1';
import LaunchPage_2 from '../components/LaunchPage_2';

export default function LaunchPage({ setIsLoading }: any) {
  return (
    <div>
      <Nav />
      <LaunchPage_1 setIsLoading={setIsLoading} />
      <LaunchPage_2 />
    </div>
  );
}