import React from 'react'
import { AuthStack } from './index';
import { NavigationContainer } from '@react-navigation/native'


export const Routes = () => {
    return (
        <NavigationContainer>
            < AuthStack />
        </NavigationContainer>
    )
}
