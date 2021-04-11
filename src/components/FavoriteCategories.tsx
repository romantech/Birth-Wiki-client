import React from 'react';
import styled from 'styled-components';

const Category = styled.button<{ imagePath: string }>`
  border: none;
  border-radius: 20px;
  outline: none;
  min-width: 17%;
  height: 8rem;
  margin-right: 1rem;
  font-size: 1.8rem;
  cursor: pointer;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${props => props.imagePath});
  background-repeat: no-repeat;
  background-size: cover;
  color: white;

  @media (max-width: 1200px) {
    font-size: 1.8rem;
    min-width: 20%;
  }

  @media (max-width: 992px) {
    font-size: 1.6rem;
    min-width: 20%;
  }

  @media (max-width: 768px) {
    font-size: 1.4rem;
    min-width: 25%;
  }

  @media (max-width: 576px) {
    font-size: 1.2rem;
    min-width: 25%;
  }
`;

interface Props {
  category: {
    categoryName: string;
    imagePath: string;
  };
}

const FavoriteCategories = ({ category }: Props): JSX.Element => {
  const { imagePath, categoryName } = category;
  return <Category imagePath={imagePath}>{categoryName}</Category>;
};

export default FavoriteCategories;
