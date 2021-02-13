import React from 'react';
import { Block } from '.';
import { colors } from '../theme';

export const Card = ({ color, style, children, ...props }) => {
    const cardStyles = [styles.card, style];
    return (
        <Block color={color || colors.white} style={cardStyles} {...props}>
            {children}
        </Block>
    );
};

const styles = {
    card: {
        borderRadius: 15,
        marginBottom: 10,
        justifyContent: 'flex-start',
    },
};