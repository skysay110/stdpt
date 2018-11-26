import axios from "axios";

const env = process.env.NODE_ENV === 'development';

let host = '';

if (env) {
  host = 'https://www.rtaksoft.com/pcsApi/'
} else {
  host = 'https://www.rtaksoft.com/pcsApi/'
}

let instance = axios.create({
  baseURL: host,
  timeout: 1000 * 60,
  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
});
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么

  try {
    return JSON.parse(response.data)
  } catch (e) {

  }
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

instance.__proto__ = axios;

export default instance
