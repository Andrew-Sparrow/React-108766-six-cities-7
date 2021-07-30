import axios from 'axios';

const BACKEND_URL = 'https://7.react.pages.academy/six-cities';
const REQUEST_TIMEOUT = 5000;
const HttpCode = {UNAUTHORIZED: 401};

const token = localStorage.getItem('token') ?? '';

export const getAxiosInstance = (onUnauthorized) => {

  const axiosInstance = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
    headers: {
      'x-token': token,
    },
  });

  const onSuccess = (response) => response;

  const onFail = (err) => {
    const {response} = err;

    if (response.status === HttpCode.UNAUTHORIZED) {
      onUnauthorized();
    }

    throw err;
  };

  axiosInstance.interceptors.response.use(onSuccess, onFail);

  return axiosInstance;
};
