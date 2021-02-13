import React, { useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen, HomeScreen, ProfileScreen, PhoneBookScreen } from '../screens';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../theme';
import { ActivityIndicator } from 'react-native'
const Stack = createStackNavigator();

export const AuthStack = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        isLogged = async () => {
            var id = await AsyncStorage.getItem('id');
            console.warn(id)
            setLoading(false)

            if (id == null)
                setIsLoggedIn(false);

            else
                setIsLoggedIn(true)

        }
        isLogged();
    }, [])

    return (
        loading ? <ActivityIndicator color={colors.accent} /> :
            <Stack.Navigator headerMode='none' initialRouteName="Home" >
                {isLoggedIn ?
                    <>
                        <Stack.Screen name='Home' component={HomeScreen} />
                        <Stack.Screen name='Profile' component={ProfileScreen} />
                        <Stack.Screen name='PhoneBook' component={PhoneBookScreen} />
                        <Stack.Screen name='Login' component={LoginScreen} />

                    </>
                    :
                    <>
                        <Stack.Screen name='Login' component={LoginScreen} />
                        <Stack.Screen name='Home' component={HomeScreen} />
                    </>

                }

            </Stack.Navigator>
    )


}