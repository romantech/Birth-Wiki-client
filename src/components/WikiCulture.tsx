import React from 'react';
import styled from 'styled-components';

const WikiCulture = (props: any) => {
  const data = props.data.weatherCard[1];
  console.log(data);

  return (
    <TopCulture>
      {/* {data.map((element: any) => {
        <p>{element}</p>;
        console.log(element);
      })} */}
    </TopCulture>
  );
};

const TopCulture = styled.div`
  min-width: 400px;
  height: 200px;
  margin: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  background-color: rgba(255, 255, 255, 1);
  border-radius: 16px;
  color: #000;
`;
export default WikiCulture;
