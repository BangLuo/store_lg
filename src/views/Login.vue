<template>
    <div class="login-wrap">
        <el-form
        :model="formData"
        label-width="80px"
        class="login-from"
        >
            <h2>用户登录</h2>
            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="formData.pass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="formData.checkPass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="login-btn">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        pass: '',
        checkPass: ''
      },
      props: ['pass', 'checkPass']
    };
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
