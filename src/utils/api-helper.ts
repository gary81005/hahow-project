import axios from 'axios';

export function setUpAxios() {
  axios.interceptors.request.use(({ ...rest }) => ({
    ...rest,
    timeout: 3000000,
  }));
}
