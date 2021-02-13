import React, { useState } from 'react'
import { Block, FormButton, Input } from '../components'
import { useNavigation } from '@react-navigation/native';
import { Text, StyleSheet, Dimensions, Image } from 'react-native'
import { AppImages, colors } from '../theme';
import { LoginAction } from '../services';
import { asyncSaveOperations } from '../utils';


export const LoginScreen = () => {

    const [userName, setUserName] = useState('piri')
    const [password, setPassword] = useState('reis')
    const [errMsg, setErrMsg] = useState(null)
    const navigation = useNavigation();

    const loginFunc = async () => {
        var result = await LoginAction(userName, password, navigation)
        await asyncSaveOperations(result);
        if (result.message != 'Kullanıcı Adı Şifre Yanlış')
            navigation.replace('Home')
        else
            setErrMsg('Kullanıcı Adı Şifre Yanlış')
    }
    const { errLabel } = styles;

    return (
        <Block middle center  >
            <Image source={AppImages.login.logo} style={{ marginBottom: 30, resizeMode: 'center' }} />
            <Input placeholder={'Kullanıcı Adı '} value={userName} onChangeText={(userName) => setUserName(userName)} />
            <Input placeholder={'Şifre '} value={password} onChangeText={(password) => setPassword(password)} />
            {errMsg != null && <Text style={errLabel}>{errMsg}</Text>}
            <FormButton
                buttonTitle='Giriş'
                OnPressButton={() => loginFunc()}
                FBwidth={Dimensions.get('window').width * 0.9}
                buttonColor={colors.accent} />
        </Block>
    )
}
const styles = StyleSheet.create({
    errLabel: {
        fontSize: 12, color: colors.red, paddingTop: 5
    }
})

