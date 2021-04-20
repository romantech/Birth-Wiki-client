import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Axios from 'axios';

import { FcLike } from 'react-icons/fc';
import { FaRegHeart } from 'react-icons/fa';

function FavoriteButton(props: any) {
  const [isLikeAdd, setIsLikeAdd] = useState(false);
  const [getCardData, setGetCardData] = useState(null);

  const likeAddHandler = () => {
    setIsLikeAdd(!isLikeAdd);
    if (!isLikeAdd) {
      setGetCardData(props.cardData);
    } else {
      setGetCardData(null);
    }
  };

  console.log(getCardData);

  useEffect(() => {
    const cardId = getCardData;
    const fovorite = async () => {
      await Axios({
        url: 'https://server.birthwiki.space/data/action',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: {},
      });
    };
    fovorite();
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

  return <FavoriteBtn onClick={likeAddHandler}>{isLikeAdd ? <FcLike /> : <FaRegHeart />}</FavoriteBtn>;
}

export default FavoriteButton;
