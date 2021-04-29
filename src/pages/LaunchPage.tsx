import React from 'react';
import styled from 'styled-components';
import { GrLinkTop } from 'react-icons/gr';
import Nav from '../components/Nav';
import LaunchPage_1 from '../components/LaunchPage_1';
import LaunchPage_2 from '../components/LaunchPage_2';
import LaunchPage_3 from '../components/LaunchPage_3';
import LaunchPage_4 from '../components/LaunchPage_4';
import LaunchPage_5 from '../components/LaunchPage_5';

export default function LaunchPage({ setIsLoading }: any) {
  return (
    <div>
      <Nav />
      <LaunchPage_1 setIsLoading={setIsLoading} />
      <LaunchPage_2 />
      <LaunchPage_3 />
      <LaunchPage_4 />
      <LaunchPage_5 />
      <BacktoTop>
        <TopButton
          onClick={() => {
            window.scrollTo({ top: 0 });
          }}
        />
      </BacktoTop>
    </div>
  );
}

const BacktoTop = styled.div`
  background-color: #fff;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  box-shadow: 0 4px 11px 0 rgb(0 0 0 / 15%);
  text-align: center;
  position: fixed;
  right: 20px;
  top: 80vh;
  cursor: pointer;
  z-index: 1;
  @media (max-width: 600px) {
    width: 55px;
    height: 55px;
  }
  @media (max-width: 425px) {
    width: 40px;
    height: 40px;
  } ;
`;

const TopButton = styled(GrLinkTop)`
  width: 50%;
  height: 100%;
  padding: 0;
  border: none;
  background: 0 0;
  cursor: pointer;
`;
