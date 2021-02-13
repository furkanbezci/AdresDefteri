import {Dimensions} from 'react-native';

export const sizes = {
  screenWidth: Dimensions.get('screen').width,
  screenHeight: Dimensions.get('screen').height,
  windowWidth: Dimensions.get('window').width,
  windowHeight: Dimensions.get('window').height,
  headerHeight: 120,

  // global sizes
  base: 16,
  font: 14,
  border: 15,
  padding: 25,

  // font sizes
  h1: 39,
  h2: 29,
  h3: 19,
  title: 18,
  header: 24,
  body: 15,
  caption: 12,
  small: 8,
};
