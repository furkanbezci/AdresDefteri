import React, { useState } from 'react';
import {
  Modal,
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Block } from '.';
import { AppImages, colors } from '../theme';
import { FormButton } from './FormButton';
import { Input } from './Input';

export const AddModal = ({
  modal,
  onPress,
  saveChanges,
  defaultName = null,
  defaultNumber = null,
  defaultEmail = null,
  title,
  btnTitle,
  namePlaceholder,
  numberPlaceholder,
  emailPlaceholder,

}) => {
  const [number, setNumber] = useState(defaultNumber);
  const [name, setName] = useState(defaultName);
  const [email, setEmail] = useState(defaultEmail)
  const [nameErr, setNameErr] = useState(null)
  const [numberErr, setNumberErr] = useState(null)
  const [emailErr, setEmailErr] = useState(null)

  const handleSubmit = () => {
    if (name == null)
      setNameErr('Ad alanını giriniz')
    if (number == null)
      setNumberErr('Numara alanını giriniz')
    if (email == null)
      setEmailErr('Email alanını giriniz')
    if (name !== null & number != null && email != null)
      saveChanges(name, number, email);
  };
  const {
    container,
    headerText,
    inputWrapper,
    closeBtn,
    exitImg,
    blockStyle,
    errorLabel,

  } = styles;
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
      isVisible={modal}
    >
      <Block center middle style={blockStyle}  >
        <View style={container}>
          <TouchableOpacity style={closeBtn} onPress={onPress}>
            <Image style={exitImg} source={AppImages.general.exit} />
          </TouchableOpacity>
          <Text style={headerText}>{title}</Text>

          <Block column middle style={inputWrapper} flex={false}>
            < Input
              value={name}
              onChangeText={(text) => { setName(text), text.length > 0 ? setNameErr(null) : setNameErr('Ad alanını giriniz') }}
              placeholder={namePlaceholder}
            />
            {nameErr && <Text style={errorLabel}>{nameErr}</Text>}
            <Input
              value={number}
              onChangeText={(num) => { setNumber(num), num.length > 0 ? setNumberErr(null) : setNumberErr('Numara alanını giriniz') }}
              placeholder={numberPlaceholder}
              keyboardType='numeric'
              maxLength={11}
            />
            {numberErr && <Text style={errorLabel}>{numberErr}</Text>}

            <Input
              value={email}
              onChangeText={(email) => { setEmail(email, email.length > 0 ? setEmailErr(null) : setEmailErr('Email alanını giriniz')) }}
              placeholder={emailPlaceholder}
              keyboardType='email-address'

            />
            {emailErr && <Text style={errorLabel}>{emailErr}</Text>}
          </Block>

          <Block center flex={false}  >
            <FormButton
              buttonTitle={btnTitle}
              OnPressButton={() => handleSubmit()}
              buttonColor={colors.accent}
              FBwidth='88%'
              FBmarginLeft={-5}

            />
          </Block>
        </View>
      </Block>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '90%',
    backgroundColor: colors.white,
    padding: 4,
    borderRadius: 10,
    paddingLeft: 30,
    paddingRight: 30,
    justifyContent: 'center'
  },
  headerText: {
    fontSize: 16,
    textAlign: 'center',
    paddingBottom: 20,
  },
  inputWrapper: {
    height: 250,
    margin: 5,
  },
  blockStyle: {
    backgroundColor: 'rgba(52, 52, 52, 0.7)',
  },
  closeBtn: {
    backgroundColor: 'transparent',
    right: 0,
    position: 'absolute',
    top: 15,
    right: 15,
  },
  exitImg: { width: 20, height: 20 },
  errorLabel: {
    color: colors.red
  },
});
