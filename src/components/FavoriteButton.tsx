import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/index';
import { setUserInfo, setGuestModal } from '../actions/index';

import { FcLike } from 'react-icons/fc';
import { FaRegHeart } from 'react-icons/fa';

function FavoriteButton(props: any) {
  const [isLikeAdd, setIsLikeAdd] = useState(false);
  const isLogin = useSelector((state: RootState) => state.loginReducer.isLogin);
  const isGuest = useSelector((state: RootState) => state.guestReducer.isGuest);
  const userInfo = useSelector((state: RootState) => state.userInfoReducer.userInfo);
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
    let action = isLikeAdd ? 'cancel' : 'like';

    if (!isLogin && !isGuest) {
      dispatch(setGuestModal(true));
      return;
    } else {
      setIsLikeAdd(!isLikeAdd);
    }

    let newCards;
    if (action === 'like') {
      newCards = userInfo.likeCards ? [...userInfo.likeCards, props.cardData] : [props.cardData];
    } else {
      newCards = userInfo.likeCards.filter((el: any) => {
        if (el.id !== props.cardData.id || el.category !== props.cardData.category) {
          return el;
        }
      });
    }

    let newUserInfo = Object.assign({}, userInfo, {
      likeCards: newCards,
    });
    dispatch(setUserInfo(newUserInfo));

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
      }).catch((err) => {
        console.log(err);
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
    color: #000;
    cursor: pointer;
  `;

  return (
    <div>
      <FavoriteBtn onClick={likeAddHandler}>{isLikeAdd ? <FcLike /> : <FaRegHeart />}</FavoriteBtn>
    </div>
  );
}

export default FavoriteButton;
