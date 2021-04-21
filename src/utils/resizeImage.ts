const getVerticalImg = (imgPath: any) => {
  const splited = imgPath.split('&');
  let width = splited[splited.length - 1];
  let resizedWidth = splited[splited.length - 1].split('=')[1] * 0.5;
  let height = resizedWidth * 1.4;

  imgPath = imgPath.replace('fit=max', 'fit=crop');
  imgPath = imgPath.replace(width, 'w=' + resizedWidth);
  imgPath = imgPath + `&h=${height}`;
  return imgPath;
};

export default getVerticalImg;
