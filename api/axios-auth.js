import axios from 'axios';
import { BASE_URL } from './urls';


const axiosInstance =  axios.create({
  baseURL: BASE_URL,
 
  transformResponse: [function (data) {
    // Do whatever you want to transform the data
    // console.log(data);
    return data;
  }],
});

// Add a request interceptor
axiosInstance.interceptors.request.use(function (config) {
    // Do something before request is sent
    var accessToken=localStorage.getItem('accesstoken')
    // console.log("inside request interceptors-->");
    // config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : '';
    config.headers.Authorization = "Bearer " + accessToken;

      
    // console.log(config);
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axiosInstance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // console.log("inside reponse interceptors-->");
    // console.log(JSON.parse(response.data));
    if(JSON.parse(response.data).code===401)
    {
    console.log("401 Error Occurs inside interceptior")
      localStorage.clear();
      window.location.reload();
      window.location.href="/";
    }
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

export default axiosInstance;