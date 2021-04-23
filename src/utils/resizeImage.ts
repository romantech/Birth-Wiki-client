const getVerticalImg = (imgPath: any, category: string, contentsLength: number) => {
  let width;
  let resizedWidth;
  let height;
  const splited = imgPath.split('&');

  if (category === 'music') {
    width = splited[splited.length - 1];
    resizedWidth = splited[splited.length - 1].split('=')[1] * 1;
    height = resizedWidth * 1;
  } else {
    if (contentsLength <= 10) {
      width = splited[splited.length - 1];
      resizedWidth = splited[splited.length - 1].split('=')[1] * 0.5;
      height = resizedWidth * 1.2;
    }
    if (contentsLength >= 11 && contentsLength <= 20) {
      width = splited[splited.length - 1];
      resizedWidth = splited[splited.length - 1].split('=')[1] * 0.5;
      height = resizedWidth * 1.4;
    }
    if (contentsLength >= 21) {
      width = splited[splited.length - 1];
      resizedWidth = splited[splited.length - 1].split('=')[1] * 0.5;
      height = resizedWidth * 1.6;
    }
  }
  imgPath = imgPath.replace('fit=max', 'fit=crop');
  imgPath = imgPath.replace(width, 'w=' + resizedWidth);
  imgPath = imgPath + `&h=${height}`;
  return imgPath;
};

export default getVerticalImg;
