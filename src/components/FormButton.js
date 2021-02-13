import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { colors } from '../theme'

export const FormButton = ({ buttonTitle, OnPressButton,
    buttonColor = colors.primary, FBborderRadius = 15, FBwidth = '80%', FBmarginLeft, ...rest }) => {
    const { wrapper, label } = styles
    return (
        <TouchableOpacity style={[wrapper, {
            backgroundColor: buttonColor,
            borderRadius: FBborderRadius,
            marginLeft: FBmarginLeft,
            width: FBwidth,
        }]}
            onPress={OnPressButton}>
            <Text style={label}> {buttonTitle} </Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    wrapper: {
        height: 50,
        alignItems: 'center',
        marginVertical: 8,
        justifyContent: 'center',
    },
    label: { textAlign: 'center' }
})



