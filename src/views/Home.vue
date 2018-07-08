<template>
 <el-container class="container">
   <!-- 头部 -->
    <el-header class="header">
      <el-row>
        <el-col :span="4">
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
          :default-openeds="['1']">
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-location"></i>用户管理</template>
                <el-menu-item index="/users">
                <i class="el-icon-menu"></i>
                  用户列表
                </el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-location"></i>权限管理</template>
              <el-menu-item-group>
                 <template slot="title"><i class="el-icon-location"></i>权限列表</template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="2-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="2-4">
                <template slot="title">选项4</template>
                <el-menu-item index="2-4-1">选项4-1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title"><i class="el-icon-location"></i>商品管理</template>
              <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="3-1">选项1</el-menu-item>
                <el-menu-item index="3-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="3-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="3-4">
                <template slot="title">选项4</template>
                <el-menu-item index="3-4-1">选项4-1</el-menu-item>
              </el-submenu>
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
  // 判断是否登录 TODO
  mounted () {
    const token = sessionStorage.getItem('token');
    if (!token) {
      this.$router.push({name: 'login'});
      this.$message.warning('请先登录');
    }
  },
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
