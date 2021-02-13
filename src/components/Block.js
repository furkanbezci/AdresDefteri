import React, { Component } from 'react';
import { View } from 'react-native';
import * as theme from '../theme';

export default class Block extends Component {
  render() {
    const {
      flex,
      row,
      column,
      center,
      middle,
      left,
      right,
      top,
      bottom,
      card,
      shadow,
      shadowColor,
      color,
      space,
      style,
      children,
      spaceBetween,
      spaceEvenly,
      spaceAround,
      alignStart,
      ...props
    } = this.props;

    const blockStyles = [
      styles.block,
      flex && { flex },
      flex === false && { flex: 0 }, // reset / disable flex
      row && styles.row,
      column && styles.column,
      center && styles.center,
      middle && styles.middle,
      spaceBetween && styles.spaceBetween,
      spaceEvenly && styles.spaceEvenly,
      spaceAround && styles.spaceAround,
      alignStart && styles.alignStart,
      left && styles.left,
      right && styles.right,
      top && styles.top,
      bottom && styles.bottom,
      card && styles.card,
      shadow && styles.shadow,
      shadowColor && styles['shadow' + shadowColor],
      space && { justifyContent: `space-${space}` },
      color && styles[color], // predefined styles colors for backgroundColor
      color && !styles[color] && { backgroundColor: color }, // custom backgroundColor
      style, // rewrite predefined styles
    ];

    return (
      <View style={blockStyles} {...props}>
        {children}
      </View>
    );
  }
}

const styles = {
  block: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  card: {
    borderRadius: theme.sizes.border,
  },
  center: {
    alignItems: 'center',
  },
  middle: {
    justifyContent: 'center',
  },
  left: {
    justifyContent: 'flex-start',
  },
  right: {
    justifyContent: 'flex-end',
  },
  top: {
    justifyContent: 'flex-start',
  },
  bottom: {
    justifyContent: 'flex-end',
  },
  shadow: {
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 13,
  },
  accent: { backgroundColor: theme.colors.accent },
  primary: { backgroundColor: theme.colors.primary },
  secondary: { backgroundColor: theme.colors.secondary },
  tertiary: { backgroundColor: theme.colors.tertiary },
  black: { backgroundColor: theme.colors.black },
  white: { backgroundColor: theme.colors.white },
  gray: { backgroundColor: theme.colors.gray },
  gray2: { backgroundColor: theme.colors.gray2 },
  gray3: { backgroundColor: theme.colors.gray3 },

  shadowgreen: {
    shadowColor: theme.colors.green,
    shadowOpacity: 0.4,
  },
  shadowprimary: {
    shadowColor: theme.colors.primary,
    shadowOpacity: 0.4,
  },
  shadowaccent: {
    shadowColor: theme.colors.accent,
    shadowOpacity: 0.4,
  },
  spaceAround: {
    justifyContent: 'space-around',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  spaceEvenly: {
    justifyContent: 'space-evenly',
  },
  alignStart: {
    alignItems: 'flex-start',
  },
};
