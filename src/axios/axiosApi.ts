import axios from "axios";
import md5 from "md5"

const time = Number(new Date())
const publicKey = process.env.REACT_APP_API_PUBLIC_KEY
const privateKey = process.env.REACT_APP_API_SECRET_KEY || ''

const hash = md5(time + privateKey + publicKey )

export const fetchClient = (baseUrl?: string) => {

  const client = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL
  });

  client.interceptors.request.use((config) => {
    config.params = {
      ts: time,
      apikey: publicKey,
      hash: hash,
       ...config.params,
     };
     return config;
  })

  client.interceptors.request.use((req) => {
    return req;
  })

  client.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error && error.response && error.response.status === 401) {
      }
      return Promise.reject(error);
    }
  );

  return client;
};
