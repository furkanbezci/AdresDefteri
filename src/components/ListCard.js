import React, { useState } from 'react';
import { Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Block, AddModal, Card } from '.';
import { DeleteContact, UpdateContact } from '../services';
import { AppImages } from '../theme';
import { DeleteModalContent } from './DeleteModalContent';
import { ModalComponent } from './ModalComponent';


export const ListCard = ({ val, index, updateResult }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    const update = async (name, phone, email) => {
        var data = {
            // sadece name ve phone gönderiyoruz değiştirerek
            name: name,
            phone: phone,
            id: val.id,
            userid: val.userid,
            email: email,
            lat: val.lat,
            long: val.long
        }
        await UpdateContact('contact/update', data);
        updateResult(true)
        setModalVisible(false)
    }
    const deleteItem = async () => {
        await DeleteContact('contact/delete', val.id)

        updateResult(true)
        setDeleteModal(false);
    }
    const { card, name, item } = styles;
    return (
        <Card key={index} style={card} >
            <Block row flex={false} spaceBetween >
                <Block row flex={false} style={item} >
                    <Image source={AppImages.general.avatar} />
                    <Text style={name} >  {val.name}</Text>
                </Block>
                <Block row flex={false} style={item}>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Image source={AppImages.general.edit} />
                    </TouchableOpacity>
                </Block>
            </Block>
            <Block row flex={false} spaceBetween >
                <Block row flex={false} style={item} >
                    <Image source={AppImages.general.phone} />
                    <Text> {val.phone}</Text>
                </Block>
                <Block row flex={false} style={item}>
                    <TouchableOpacity onPress={() => setDeleteModal(true)}>
                        <Image source={AppImages.general.delete} />
                    </TouchableOpacity>
                </Block>
            </Block>
            <Block row flex={false} style={item} >
                <Image source={AppImages.general.mail} />
                <Text> {val.email}</Text>
            </Block>

            <AddModal
                modal={modalVisible}
                onPress={() => setModalVisible(false)}
                saveChanges={update}
                title={'KİŞİ DÜZENLE'}
                namePlaceholder={'Adını Giriniz'}
                numberPlaceholder={'Numarasını Giriniz'}
                emailPlaceholder={'Emaili Giriniz'}
                defaultName={val.name}
                defaultNumber={val.phone}
                defaultEmail={val.email}
                btnTitle={'Düzenle'}
            />
            {deleteModal &&
                <ModalComponent
                    onPress={() => setDeleteModal(false)
                    }
                    title={'Silmek istediğinize emin misiniz?'}
                    isVisible={deleteModal}>

                    <DeleteModalContent
                        onConfirmPress={() => deleteItem()}
                        onCancelPress={() => setDeleteModal(false)
                        }
                    />
                </ModalComponent>
            }


        </Card>
    );
};
const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        height: 130,
        width: '100%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        marginBottom: 10,
        flexDirection: 'column',
        paddingTop: 10
    },
    name: { fontWeight: 'bold' },
    item: {
        margin: 5
    }
});