import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  min-width: 20%;
  min-height: 6rem;
  max-height: 8rem;
  margin-right: 1rem;
  border-radius: 20px;
  overflow: hidden;

  @media (max-width: 1200px) {
    min-width: 25%;
  }

  @media (max-width: 992px) {
    min-width: 30%;
  }

  @media (max-width: 768px) {
    min-width: 35%;
  }

  @media (max-width: 576px) {
    min-width: 40%;
  }
`;

const Category = styled.button<{ imagePath: string }>`
  cursor: pointer;
  font-size: 1.5rem;
  height: 100%;
  width: 100%;
  outline: none;
  border: none;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${(props) => props.imagePath});
  background-repeat: no-repeat;
  background-size: cover;
  color: white;
  transition: all 0.2s linear;

  &:hover {
    background: linear-gradient(rgba(0, 0, 0, 0.185), rgba(0, 0, 0, 0.185)),
      url(${(props) => props.imagePath});
    background-size: cover;
    background-repeat: no-repeat;
    -webkit-transform: scale(1.2);
    -moz-transform: scale(1.2);
    -ms-transform: scale(1.2);
    -o-transform: scale(1.2);
    transform: scale(1.2);
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
  return (
    <Wrapper>
      <Category imagePath={imagePath}>{categoryName}</Category>
    </Wrapper>
  );
};

export default FavoriteCategories;
