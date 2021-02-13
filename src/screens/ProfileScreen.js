import React, { useState, useEffect } from 'react'
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native'
import { AddModal, Block } from '../components'
import { AppImages, colors } from '../theme';
import { asyncSaveOperations } from '../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UpdateProfile } from '../services';

export const ProfileScreen = ({ navigation }) => {
    const [name, setName] = useState(null)
    const [id, setId] = useState(null)
    const [email, setEmail] = useState(null)
    const [number, setNumber] = useState(null)
    const [editModal, setEditProfile] = useState(false)
    useEffect(() => {
        getUserInfo();
    }, [])

    const getUserInfo = async () => {

        var id = await AsyncStorage.getItem('id');
        var name = await AsyncStorage.getItem('name');
        var phone = await AsyncStorage.getItem('phone');
        var email = await AsyncStorage.getItem('email');
        setName(name);
        setEmail(email);
        setNumber(phone);
        setId(id)
    }
    const editProfileInfo = async (userName, userPhone, userEmail) => {
        var data = {
            id: id,
            name: userName,
            phone: userPhone,
            email: userEmail,
            username: "ahmet"
        }
        var result = await UpdateProfile('users/UpdateProfile', data);

        asyncSaveOperations(result.data)
        setEditModal(false)
        getUserInfo();
    }
    const logout = async () => {
        await AsyncStorage.clear()
        navigation.navigate('Login')
    }
    const { imgWrapper, image, logoutImg, textWrapper, nameText, phoneText, mailText, editWrapper, editImg } = styles;
    return (

        <Block >
            <Block right flex={false} style={editWrapper}   >
                <TouchableOpacity onPress={() => logout()}>
                    <Image source={AppImages.general.logout} style={logoutImg} />
                </TouchableOpacity>
            </Block>
            <Block center middle flex={false} style={imgWrapper} >
                <Image source={AppImages.general.profileIn} style={image} />
            </Block>
            <Block center style={textWrapper}>
                <Block right flex={false} style={editWrapper}   >
                    <TouchableOpacity onPress={() => setEditProfile(true)}>
                        <Image source={AppImages.general.edit} style={editImg} />
                    </TouchableOpacity>
                </Block>

                {name != null && <Text style={nameText}>{name}</Text>}
                {number != null && < Text style={phoneText}>{number}</Text>}
                {email != null && < Text style={mailText}>{email}</Text>}
                <AddModal
                    modal={editModal}
                    onPress={() => setEditProfile(false)}
                    saveChanges={editProfileInfo}
                    title={'BİLGİLERİ DÜZENLE'}
                    namePlaceholder={'Adınızı Giriniz'}
                    numberPlaceholder={'Numaranızı Giriniz'}
                    emailPlaceholder={'Emailinizi Giriniz'}
                    btnTitle={'Düzenle'}
                    defaultEmail={email}
                    defaultName={name}
                    defaultNumber={number}
                />

            </Block >
        </Block >
    )
}

const styles = StyleSheet.create({
    imgWrapper: {
        width: '100%', padding: 20,
        flex: 1
    },
    image: {
        resizeMode: 'contain'
    },
    textWrapper: {
        flex: 3
    },
    nameText: {
        fontSize: 22,
        padding: 7
    },
    phoneText: {
        fontSize: 16,
        padding: 5
    },
    mailText: {
        fontSize: 14,
    },
    editWrapper: {
        width: '100%',
        alignItems: 'flex-end',
        paddingRight: 30
    },
    editimg: { tintColor: colors.accent },
    logoutImg: {
        marginTop: 10
    }
})

