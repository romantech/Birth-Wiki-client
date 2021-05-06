const getMovieRateStar = (rate: number) => {
  let starNum = 0;
  if (rate >= 0 && rate <= 2.9) {
    starNum = 1;
  } else if (rate >= 3 && rate <= 4.9) {
    starNum = 2;
  } else if (rate >= 5 && rate <= 6.9) {
    starNum = 3;
  } else if (rate >= 7 && rate <= 8.9) {
    starNum = 4;
  } else if (rate >= 9) {
    starNum = 5;
  }
  const grayNum = 5 - starNum;
  const starColorString = [];

  for (let i = 0; i < starNum; i++) {
    starColorString.push('black');
  }
  for (let i = 0; i < grayNum; i++) {
    starColorString.push('gray');
  }

  return starColorString;
};

export default getMovieRateStar;
