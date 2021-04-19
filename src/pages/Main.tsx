import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/index';
import LaunchPage from '../components/LaunchPage';
import SidebarSignUp from '../components/SidebarSignUp';

function Main() {
  const isSignup = useSelector((state: RootState) => state.signupReducer.isSignup);
  return <div>{isSignup ? <SidebarSignUp /> : <LaunchPage />}</div>;
}

export default Main;
