import { Dimensions, PixelRatio } from "react-native";
export const devicewidth = Dimensions.get("window").width
export const deviceheight = Dimensions.get("window").height
export const borderwidth = PixelRatio.getPixelSizeForLayoutSize(1);
export const borderradius = Math.min(devicewidth, deviceheight) * 0.5 * 0.1;
const { width, height } = Dimensions.get('window');
export const pxToPercentage = (pxValue, dimension) => {
  if (dimension === 'width') {
    return (pxValue / width) * 100;
  } else if (dimension === 'height') {
    return (pxValue / height) * 100;
  }
  return null;
};