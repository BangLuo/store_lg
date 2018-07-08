<template>
    <div class="login-wrap">
        <el-form
        :model="formData"
        label-width="80px"
        class="login-from"
        >
            <h4 style="{text-align:center}">用户登录</h4>
            <el-form-item label="用户名" prop="pass">
                <el-input type="text" v-model="formData.username" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="checkPass">
                <el-input type="password" v-model="formData.password" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleLogin" class="login-btn">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        username: '',
        password: ''
      },
      props: ['pass', 'checkPass']
    };
  },
  methods: {
    async handleLogin () {
      const res = await this.$http.post('login', this.formData);
      // 服务器返回数据为{data:{}, meta:{status:200,msg:''}}
      const { meta: { status, msg } } = res.data;
      if (status === 200) {
        // 登陆成功 记录token sessionStorage
        // 跳转到后台首页
        // 弹出成功提示
        const token = res.data.data.token;
        sessionStorage.setItem('token', token);
        this.$router.push({name: 'home'});
        this.$message.success(msg);
      } else {
        this.$message.error(msg);
      }
    }
  }
};
</script>

<style>
.login-wrap {
  background-color: #324152;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-wrap .login-from {
  background-color: #fff;
  width: 400px;
  padding: 30px;
  border-radius: 5px;
}

.login-wrap .login-from .login-btn {
  width: 100%;
}
</style>
