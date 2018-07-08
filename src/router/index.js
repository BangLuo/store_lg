import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/Login';
import Home from '@/views/Home';
import Users from '@/views/users/Users';


Vue.use(Router);

export default new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'home',
      path: '/',
      component: Home,
      // 子路由 子路由切换时在home组件中完成的
      // 使用子路由之前 home组件已经加载完毕
      children:[
        // 用户列表
        {
          name: 'users',
          path: '/users',
          component: Users
        }
      ]
    }
  ]
});
