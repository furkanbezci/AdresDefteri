import React from 'react';
import { FormButton } from './FormButton';
import { colors } from '../theme';
import { Block } from '.';

export const DeleteModalContent = ({ onConfirmPress, onCancelPress }) => {
  return (
    <Block row center style={{ margin: 20, }}>
      <FormButton
        buttonTitle={'Evet'}
        OnPressButton={onConfirmPress}
        buttonColor={colors.primary}
        FBwidth='50%'
      />
      <FormButton
        buttonTitle={'İptal'}
        OnPressButton={onCancelPress}
        buttonColor={colors.accent}
        FBwidth='50%'
      />
    </Block>
  );
};
