import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/index';
import { setUserInfo } from '../actions/index';

import { FcLike } from 'react-icons/fc';
import { FaRegHeart } from 'react-icons/fa';

function FavoriteButton(props: any) {
  const [isLikeAdd, setIsLikeAdd] = useState(false);
  const [getCardData, setGetCardData] = useState(null);
  const isLogin = useSelector((state: RootState) => state.loginReducer.isLogin);
  const userInfo = useSelector((state: RootState) => state.userInfoReducer.userInfo);

  const dispatch = useDispatch();

  console.log(props.cardData);

  const likeAddHandler = async () => {
    setIsLikeAdd(!isLikeAdd);
    if (!isLikeAdd) {
      let addLikeCard;
      if (userInfo.likeCards) {
        addLikeCard = Object.assign({}, userInfo, {
          likeCards: [...userInfo.likeCards, props.cardData],
        });
      } else {
        addLikeCard = Object.assign({}, userInfo, {
          likeCards: [props.cardData],
        });
      }
      dispatch(setUserInfo(addLikeCard));
      await Axios({
        url: 'https://server.birthwiki.space/like',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {
          action: 'like',
          nickName: userInfo.nickName,
          cardId: props.cardData.id,
          category: props.cardData.category,
          accessToken: `Bearer ${userInfo.accessToken}`,
        },
      });
    } else {
      let newCard = userInfo.likeCards;
      newCard = newCard.filter((card: any) => {
        if (card.id !== props.cardData.id || card.category !== props.cardData.category) {
          return card;
        }
      });
      const cancelLikeCard = Object.assign({}, userInfo, {
        likeCards: newCard,
      });
      dispatch(setUserInfo(cancelLikeCard));
      await Axios({
        url: 'https://server.birthwiki.space/like',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {
          action: 'cancel',
          nickName: userInfo.nickName,
          cardId: props.cardData.id,
          category: props.cardData.category,
          accessToken: `Bearer ${userInfo.accessToken}`,
        },
      });
    }
  };

  useEffect(() => {
    if (userInfo.likeCards) {
      userInfo.likeCards.forEach((card: any) => {
        if (card.id === props.cardData.id && card.category === props.cardData.category) {
          setIsLikeAdd(true);
        }
      });
    }
  }, []);

  const FavoriteBtn = styled.div`
    font-size: 1.7rem;
    width: 2.5rem;
    height: 1.5rem;
    margin: 5px;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 100;
    cursor: pointer;
  `;

  return (
    <div>
      {isLogin ? (
        <FavoriteBtn onClick={likeAddHandler}>{isLikeAdd ? <FcLike /> : <FaRegHeart />}</FavoriteBtn>
      ) : null}
    </div>
  );
}

export default FavoriteButton;
