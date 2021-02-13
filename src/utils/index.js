import AsyncStorage from '@react-native-async-storage/async-storage'

export const asyncSaveOperations = async (data) => {
    await AsyncStorage.setItem("id", data.id.toString())
    await AsyncStorage.setItem("email", data.email.toString())
    await AsyncStorage.setItem("name", data.name.toString())
    await AsyncStorage.setItem("phone", data.phone.toString())
    if (data.token !== undefined)
        await AsyncStorage.setItem("token", data.token.toString())
    await AsyncStorage.setItem("username", data.username.toString())
}