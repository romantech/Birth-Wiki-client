import React from 'react';
import { UserProfileCard } from '../types/index';
import styled from 'styled-components';

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
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

interface ImgPath {
  imgPath?: string;
}

const ProfileImg = styled.img.attrs<ImgPath>(({ imgPath }) => ({
  src: imgPath || `${process.env.PUBLIC_URL}/img/profile.png`,
}))<ImgPath>`
  display: block;
  max-width: 150px;
  max-height: 150px;
`;

const ProfileCard = ({ ...props }: UserProfileCard): JSX.Element => {
  return (
    <CardWrapper>
      <ProfileImg imgPath={props.profileImage} />
      <div>
        <span>
          Hello
          <b>{` ${props.nickName}`}</b>
        </span>
        <span>
          You have <b>{` ${props.likeCards}`}</b> cards
        </span>
      </div>
    </CardWrapper>
  );
};

export default ProfileCard;
