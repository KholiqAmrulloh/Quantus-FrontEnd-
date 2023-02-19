// import AsyncStorage from "@react-native-async-storage/async-storage";
import Cookie from "js-cookie";
import defaultAxios, { AxiosHeaders } from "axios";
import * as apiEndPoints from '../constants/api-endpoints';

const axios = defaultAxios.create({
     baseURL: apiEndPoints.BASE_URL,
     timeout: 15000
});

axios.interceptors.request.use(async (config) => {
     let accessToken = await Cookie.get('token');

     if (accessToken) {
          config.headers['Authorization'] = `Bearer ${accessToken}`
     }

     return config;
});

export default axios;
