const getMessageHeightOffset = (
  heightOfMessageBox: number,
  windowHeight: number
): number => {
  const maxHeightOfMessageBox = windowHeight * 0.3;
  if (heightOfMessageBox > maxHeightOfMessageBox) {
    return maxHeightOfMessageBox - windowHeight * 0.05;
  }
  if (heightOfMessageBox > 24) {
    return heightOfMessageBox - windowHeight * 0.035;
  }
  return 0;
};

export default getMessageHeightOffset;
