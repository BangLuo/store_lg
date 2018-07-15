import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/Login';
import Home from '@/views/Home';
import Users from '@/views/users/Users';
import Rights from '@/views/roles/Rights';
import Roles from '@/views/roles/Roles';
import { Message } from 'element-ui';
import Categories from '@/views/goods/Categories';
import GoodsList from '@/views/goods/GoodsList';
import GoodsAdd from '@/views/goods/Add';
import OrderList from '@/views/orders/List';
import Reports from '@/views/reports/Reports';


Vue.use(Router);
const router = new Router({
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
      children: [
        // 用户列表
        {
          name: 'users',
          path: '/users',
          component: Users
        },
        {
          name: 'rights',
          path: '/rights',
          component: Rights
        },
        {
          name: 'roles',
          path: '/roles',
          component: Roles
        },
        {
          name: 'categories',
          path: 'categories',
          component: Categories
        },
        {
          name: 'goods-list',
          path: '/goods',
          component: GoodsList
        },
        {
          name: 'goods-add',
          path: '/goods/add',
          component: GoodsAdd
        },
        {
          name: 'orders-list',
          path: '/orders',
          component: OrderList
        },
        {
          name: 'reports',
          path: '/reports',
          component: Reports
        }
      ]
    }
  ]
});
router.beforeEach((to, from, next) => {
  // 判断是否是登路 是 next 不是 需要token
  if (to.name === 'login') {
    next();
  } else {
    const token = sessionStorage.getItem('token');
    if (!token) {
      router.push({name: 'login'});
      Message('请先登陆');
    }
    next();
  }
});

export default router;
