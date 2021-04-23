import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/index';
import { setUserInfo } from '../actions/index';

import { FcLike } from 'react-icons/fc';
import { FaRegHeart } from 'react-icons/fa';
import GuestModal from './GuestModal';

function FavoriteButton(props: any) {
  const [isLikeAdd, setIsLikeAdd] = useState(false);
  const isLogin = useSelector((state: RootState) => state.loginReducer.isLogin);
  const isGuest = useSelector((state: RootState) => state.guestReducer.isGuest);
  const isGuestModal = useSelector((state: RootState) => state.guestReducer.isGuestModal);
  const userInfo = useSelector((state: RootState) => state.userInfoReducer.userInfo);
  const [changeCard, setChangeCard] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo.likeCards) {
      userInfo.likeCards.forEach((card: any) => {
        if (card.id === props.cardData.id && card.category === props.cardData.category) {
          setIsLikeAdd(true);
        }
      });
    }
  }, []);

  const likeAddHandler = async () => {
    let action;
    if (!isLogin && !isGuestModal) {
      setModalOpen(true);
    } else {
      action = isLikeAdd ? 'cancel' : 'like';
      setIsLikeAdd(!isLikeAdd);
    }

    let newCards;
    let newUserInfo: any;

    if (action === 'like') {
      newCards = userInfo.likeCards ? [...userInfo.likeCards, props.cardData] : [props.cardData];
    } else {
      newCards = userInfo.likeCards.filter((el: any) => {
        if (el.id !== props.cardData.id || el.category !== props.cardData.category) {
          return el;
        }
      });
    }
    newUserInfo = Object.assign({}, userInfo, {
      likeCards: newCards,
    });

    console.log(newUserInfo);
    if (isGuest) {
      dispatch(setUserInfo(newUserInfo));
    }

    if (isLogin) {
      await axios({
        url: 'https://server.birthwiki.space/like',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {
          action,
          nickName: userInfo.nickName,
          cardId: props.cardData.id,
          category: props.cardData.category,
          accessToken: `Bearer ${userInfo.accessToken}`,
        },
      }).then(() => {
        dispatch(setUserInfo(newUserInfo));
      });
    }
  };

  const FavoriteBtn = styled.div`
    font-size: 1.7rem;
    width: 2.5rem;
    height: 1.5rem;
    margin: 5px;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 100;
    color: #fff;
    cursor: pointer;
  `;

  return (
    <div>
      {modalOpen ? <GuestModal /> : null}
      <FavoriteBtn onClick={likeAddHandler}>{isLikeAdd ? <FcLike /> : <FaRegHeart />}</FavoriteBtn>
    </div>
  );
}

export default FavoriteButton;
