// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
// 引入node-moudles中的element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/style.css';
import MyAxios from '@/plugins/MyAxios.js';
import moment from 'moment';
import MyBreadcrumb from '@/components/MyBreadcrumb';
Vue.config.productionTip = false;

// 注册全局组件
Vue.component(MyBreadcrumb.name, MyBreadcrumb);
// 全局过滤器 格式化日期
Vue.filter('fmData', (value, fmString) => {
  return moment(value).format(fmString);
});

// 注册组件
Vue.use(ElementUI);
Vue.use(MyAxios);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
