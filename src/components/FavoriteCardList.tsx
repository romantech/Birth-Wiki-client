import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface Props {
  item: {
    webformatURL: string;
    tags: string;
  };
}

const Image = styled.img`
  max-width: 100%;
  border-radius: 20px;
`;

const FavoriteCardList = ({ item }: Props): JSX.Element => {
  const { webformatURL, tags } = item;

  return <Image src={webformatURL} alt={tags} />;
};

export default FavoriteCardList;
