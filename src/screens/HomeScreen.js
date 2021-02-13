import React, { useEffect, useState } from 'react'
import { Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { AddModal, Block, ListCard } from '../components'
import { GetContacts, AddContact } from '../services'
import { AppImages, colors } from '../theme'
import AsyncStorage from '@react-native-async-storage/async-storage'


export const HomeScreen = ({ navigation }) => {
    const [contactsList, setContactsList] = useState([])
    const [addModal, setAddModal] = useState(false)


    useEffect(() => {
        getDatas()

        AsyncStorage.getItem('id').then(id => {

            if (id == null)
                navigation.navigate("Login")
            else
                getDatas()
        })


    }, [])

    const getDatas = async () => {
        var userId = await AsyncStorage.getItem("id");
        userId = parseInt(userId)
        var result = await GetContacts('contact', userId)
        if (result !== undefined)
            setContactsList(result.data);
    }
    const renderListItems = ({ item, index }) => {
        return (
            <ListCard val={item} index={index} updateResult={() => getDatas()} />
        );
    };

    const addUser = async (name, number, email) => {
        var data = {
            // sadece name ve phone gönderiyoruz değiştirerek
            name: name, phone: number,
            id: 0,
            userid: await AsyncStorage.getItem('id'),
            email: email,
            lat: 39.170148,
            long: 32.789022
        }
        await AddContact('contact/create', data);
        setAddModal(false)
        getDatas()


    }
    const { wrapper, contactHeader, contactImage, label, list, listContainer, addImage } = styles
    return (
        <Block>
            <Block flex={false} style={wrapper} >
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <Image source={AppImages.general.profile} />
                </TouchableOpacity>
            </Block>
            <Block center  >
                <Block row middle center spaceBetween flex={false} style={contactHeader} >
                    <Image source={AppImages.general.phoneBook} style={contactImage} />
                    <Text style={label}>Kişiler </Text>
                    <TouchableOpacity onPress={() => setAddModal(true)}>
                        <Image source={AppImages.general.addUser} style={addImage} />
                    </TouchableOpacity>
                </Block>
                <Block center style={listContainer}>
                    <FlatList
                        data={contactsList}
                        keyExtractor={(item, index) => String(index)}
                        renderItem={renderListItems}
                        style={list}
                    />
                    <AddModal
                        modal={addModal}
                        onPress={() => setAddModal(false)}
                        saveChanges={addUser}
                        title={'KİŞİ EKLE'}
                        namePlaceholder={'Adını Giriniz'}
                        numberPlaceholder={'Numarasını Giriniz'}
                        emailPlaceholder={'Email Giriniz'}
                        btnTitle={'Ekle'}
                    />
                </Block>
            </Block>
        </Block >
    )

}
const styles = StyleSheet.create({
    wrapper: {
        width: '100%', padding: 20, alignItems: 'flex-end'
    },
    contactHeader: {

        borderRadius: 10, borderColor: colors.accent, backgroundColor: colors.white2,
        height: 50,
        width: '95%'
    },
    contactImage: { resizeMode: 'center' },
    label: { fontSize: 20, textAlign: 'center', color: colors.black },
    list: { width: '100%' },
    listContainer: { width: '90%', top: 20 },
    addImage: {
        marginRight: 20
    }
})


