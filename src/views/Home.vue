<template>
 <el-container class="container">
   <!-- 头部 -->
    <el-header class="header">
      <el-row>
        <el-col :span="4" class="logoBox">
          <img src="@/assets/logo3.png" alt="">
        </el-col>
        <el-col :span="19" class="middle">
          <h2>电商后台管理系统</h2>
        </el-col>
        <el-col :span="1">
          <a href="#" @click.prevent="handleLoginOut" class="loginout">退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
        <el-aside width="200px" class="aside">
          <el-menu
          :unique-opened="true"
          :router="true"
          :default-openeds="['1']"
          v-for="item1 in menuLists"
          :key="item1.id">
            <el-submenu :index="item1.id + ''">
              <template slot="title"><i class="el-icon-location"></i>{{ item1.authName }}</template>
                <el-menu-item
                v-for="item2 in item1.children"
                :index="'/'+ item2.path"
                :key="item2.id">
                <i class="el-icon-menu"></i>
                 {{ item2.authName }}
                </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main class="main">
          <router-view></router-view>
        </el-main>
    </el-container>
 </el-container>
</template>

<script>
export default {
  data () {
    return {
      menuLists: []
    };
  },
  created () {
    this.getMenus();
  },
  // 判断是否登录 TODO
  // beforeCreate () {
  //   const token = sessionStorage.getItem('token');
  //   if (!token) {
  //     this.$router.push({name: 'login'});
  //     this.$message.warning('请先登录');
  //   }
  // },
  methods: {
    // 退出
    handleLoginOut() {
      // 1. 删除本地存储中的 Token 身份标识
      window.sessionStorage.clear();
      // 2. 跳转到登陆视图
      this.$router.push({
        name: 'login'
      });
      this.$message({
        type: 'success',
        message: '退出成功!'
      });
    },
    async getMenus () {
      const { data: resData } = await this.$http.get('menus');
      this.menuLists = resData.data;
      // console.log(resData.data);
    }
  }
};

</script>

<style>
.container {
  height: 100%;
}

.header {
  background-color: #b3c0d1;
}

.header .logoBox img{
  width: 166px;
  height: 59px;
  border-bottom: #b3c0d1 1px solid;
}

.header .middle{
  line-height: 60px;
  color:#fff;
  vertical-align: middle;
}

.header .loginout{
  line-height: 60px;
  text-decoration: none;
  color:#fff;
  font-size: 16px;
}

.aside {
  background-color: #d3dce6;
}

.main {
  background-color: #e9eef3;
  height: 100%;
}
</style>
