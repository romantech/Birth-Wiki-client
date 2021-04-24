import React from 'react';
import styled from 'styled-components';

const Pafination = ({ cardsPerPage, totalCards, paginate }: any) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <Pagination>
      <ul className='pagination'>
        {pageNumbers.map((number) => (
          <li key={number} className='page-item'>
            <a onClick={() => paginate(number)} className='page-link'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </Pagination>
  );
};

const Pagination = styled.nav`
  & .pagination {
    display: flex;
    justify-content: center;
  }
  & .page-item {
    width: 80%;
    list-style: none;
  }
  & .page-link {
    border-bottom: 1px solid #000;
  }
`;

export default Pafination;
