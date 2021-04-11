import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface Props {
  item: {
    webformatURL: string;
    tag: string;
  };
}

const Image = styled.img`
  max-width: 100%;
  border-radius: 20px;
`;

const FavoriteCardList = ({ item }: Props): JSX.Element => {
  const { webformatURL, tag } = item;

  return <Image src={webformatURL} alt={tag} />;
};

export default FavoriteCardList;
