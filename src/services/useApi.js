import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const useAPI = () => {

  let baseUrl = `http://54.93.233.230:5000/api`;
  const defaultHeader = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };


  const customFetch = async ({
    endpoint,
    method = 'GET',
    body = {},
    headers = defaultHeader,
    responseType,
  }) => {
    let url = `${baseUrl}/${endpoint}`;

    //ISTEK ATILIRKEN ÖNCELİKLE TOKEN EXPIRE OLMUŞ MU KONTROL EDİLİYOR
    var token = await checkTokenExpiryDate();
    headers['Authorization'] = `Bearer ${token}`;
    const options = {
      method,
      headers,
    };

    if (Object.keys(body).length) options.data = body;
    // if (Object.keys(body).length) options.data = JSON.stringify(body);
    if (responseType) options.responseType = responseType;

    try {
      var response = await axios(url, options);
      return response;
    } catch (error) {
      console.warn(error, 'api error');
    }
  };
  const checkTokenExpiryDate = async () => {
    try {
      var token = await AsyncStorage.getItem('token');
      var tokenExpire = await AsyncStorage.getItem('tokenExpire');

      if (token == null) token = await getNewToken();
      else if (Date.parse(tokenExpire) < new Date()) {

        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('tokenExpire');
        token = await checkTokenExpiryDate();
      }
    } catch (err) {
      console.log('err', err);
    }
    return token;
  };
  const getNewToken = async () => {
    const url = baseUrl + '/auth/login'
    const body = {
      username: await AsyncStorage.getItem('name'),
      password: await AsyncStorage.getItem('password')
    }
    try {
      var response = await axios.post(url, body);

      if (response) {
        var t = new Date();
        await AsyncStorage.setItem('tokenExpire', t.setMinutes(t.getMinutes() + 5));
        console.warn('t.getMinutes() + 5', t.getMinutes() + 5)
        await AsyncStorage.setItem('token', response.token);

        setTimeout(() => {

          alert("token süresi doldu")
        }, 1000);
        return response.token;
      }
    } catch (error) {
      console.log(error);
    }
    return null;
  };

  const post = async ({ endpoint, body = {} }) => {
    return await customFetch({ endpoint, method: 'POST', body });
  };
  return {
    post
  }
};
