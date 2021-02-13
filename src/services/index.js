import { Alert } from 'react-native';
import { useAPI } from './useApi';
const loginUrl = 'http://54.93.233.230:5000/api/auth/login'
const { post } = useAPI();

export async function LoginAction(name, password, navigation) {
    try {
        var body = JSON.stringify({ username: name, password: password })
        console.log(loginUrl, body)
        var result = await fetch(loginUrl, {
            method: 'post', headers: { "content-type": "application/json" }, body: body
        })
        // sunucudan gelen verileri json a dönüştürdük
        var response = await result.json();
        setTimeout(() => {
            // alert("token süresi doldu")
            Alert.alert(
                "Süre Aşımı",
                "Token süresi doldu",
                [

                    {
                        text: "OK", onPress: () => navigation.reset({
                            index: 0,
                            routes: [{ name: 'Login' }],
                        })
                    }
                ],
                { cancelable: false }
            );
        }, 1000 * 60 * 5);
        return response;

    } catch (error) {
        console.log(error)

    }
}
export async function UpdateProfile(url, data) {
    var response = await post({
        endpoint: url,
        body: JSON.stringify(data),
    });
    return response;
}
export async function GetContacts(url, id) {
    var response = await post({
        endpoint: url,
        body: JSON.stringify({ userid: id })
    });
    return response;
}
export async function UpdateContact(url, data) {
    var response = await post({
        endpoint: url,
        body: JSON.stringify(data)
    })
    return response
}
export async function DeleteContact(url, id) {
    var response = await post({
        endpoint: url,
        body: JSON.stringify({ id: id })
    })
    return response
}

export async function AddContact(url, data) {
    var response = await post({
        endpoint: url,
        body: JSON.stringify(data)
    })
    return response
}