const getMessageHeightOffset = (
  heightOfMessageBox: number,
  windowHeight: number
): number => {
  const maxHeightOfMessageBox = windowHeight * 0.3;
  if (heightOfMessageBox > maxHeightOfMessageBox) {
    return maxHeightOfMessageBox - windowHeight * 0.02;
  }
  if (heightOfMessageBox > 24) {
    return heightOfMessageBox - windowHeight * 0.005;
  } else return heightOfMessageBox + windowHeight * 0.03;
};

export default getMessageHeightOffset;
