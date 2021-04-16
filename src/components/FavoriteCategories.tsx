import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  /* min-width: 20%;
  min-height: 6rem;
  max-height: 8rem; */
  height: 5rem;
  width: 18rem;
  margin-right: 1rem;
  border-radius: 20px;
  overflow: hidden;
  isolation: isolate; // 사파리 웹킷 버그 수정

  // 반응형 박스 크기
  @media (max-width: 1500px) {
    width: 16rem;
  }

  @media (max-width: 1200px) {
    width: 14rem;
  }

  @media (max-width: 922px) {
    width: 10rem;
  }

  @media (max-width: 576px) {
    width: 7.3rem;
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

  // 반응형 폰트
  @media (max-width: 1200px) {
    font-size: 1.4rem;
  }

  @media (max-width: 992px) {
    font-size: 1.3rem;
  }

  @media (max-width: 576px) {
    font-size: 1.2rem;
  }
`;

interface Props {
  category: {
    categoryName: string;
    imagePath: string;
  };
  selected: string;
}

const FavoriteCategories = ({ category, selected }: Props): JSX.Element => {
  const { imagePath, categoryName } = category;

  return (
    <Wrapper>
      <Category className={`menu-item ${selected ? 'active' : ''}`} imagePath={imagePath}>
        {categoryName}
      </Category>
    </Wrapper>
  );
};

export default FavoriteCategories;
