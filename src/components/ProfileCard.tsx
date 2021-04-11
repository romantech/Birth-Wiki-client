import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ProfileCard = (): JSX.Element => {
  const CardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 15px;
    font-size: 1.1rem;

    & > img {
      margin-bottom: 10px;
    }

    & > div {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  `;

  const ProfileImg = styled.img.attrs({
    src: `${process.env.PUBLIC_URL}/img/profile.png`,
  })`
    display: block;
    max-width: 200px;
    max-height: 200px;
  `;

  const userId = 'DummyUser';
  const favoriteCards = 52;

  return (
    <CardWrapper>
      <ProfileImg />
      <div>
        <span>
          Hello
          <b>{` ${userId}`}</b>
        </span>
        <span>
          You Pinned
          <b>{` ${favoriteCards}`}</b> cards
        </span>
      </div>
    </CardWrapper>
  );
};

export default ProfileCard;
