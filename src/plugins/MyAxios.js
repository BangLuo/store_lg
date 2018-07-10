import axios from 'axios';
var MyAxios = {};
MyAxios.install = function (Vue) {
  // axios.defaults.baseURL = ''
  const instance = axios.create({
    baseURL: 'http://localhost:8888/api/private/v1/'
  });
    // Add a request interceptor
  instance.interceptors.request.use(function (config) {
    // 判断是否路由标识是login
    console.log('拦截器', config);
    if (config.url.toLocaleLowerCase !== 'login') {
      const token = sessionStorage.getItem('token');
      config.headers.Authorization = token;
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

  Vue.prototype.$http = instance;
};
export default MyAxios;
