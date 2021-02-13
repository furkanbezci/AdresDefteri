import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Modal,
  View
} from 'react-native';
import { Block } from '.';
import { AppImages, colors } from '../theme';
const { width } = Dimensions.get('window');

export const ModalComponent = ({
  onPress,
  title,
  modal,
  children,
}) => {
  const { container, closeBtn, headerText, exitImg } = styles;
  return (
    <Modal
      hasBackdrop={true}
      propagateSwipe={true}
      onRequestClose={onPress}
      swipeDirection={'down'}
      visible={modal}
      transparent={true}
      onSwipeComplete={onPress}
      onBackdropPress={onPress}
      onBackButtonPress={onPress}
      isVisible={modal}>
      <Block center middle >
        <View style={container}>
          <TouchableOpacity style={closeBtn} onPress={onPress}>
            <Image style={exitImg} source={AppImages.general.exit} />
          </TouchableOpacity>
          <Text style={headerText}>{title}</Text>
          {children}
        </View>
      </Block>
    </Modal>
  )
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
    backgroundColor: colors.white,
    height: 200,
    padding: 4,
    borderRadius: 10,
    paddingLeft: 30,
    paddingRight: 30,
  },
  headerText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 30
  },
  inputWrapper: {
    height: 145,
    margin: 5,
  },
  closeBtn: {
    backgroundColor: 'transparent',
    right: 0,
    position: 'absolute',
    top: 15,
    right: 15,
  },
  exitImg: { width: 20, height: 20 },
});

