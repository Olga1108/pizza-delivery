export const createImgPath = imgName => {
    return (imgName.endsWith('.jpg') || imgName.endsWith('.png') || imgName.endsWith('.jpeg'))?
    `img/${imgName}` :
    imgName;
};