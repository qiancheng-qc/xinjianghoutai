<template>
  <div class="login-container">
    <div class="login-box">
      <!-- 登录表单 -->
      <el-form ref="loginFormRef" class="login-form" :model="loginForm" :rules="loginFormRules" label-width="80px">
        <!-- 用户名 -->
        <el-form-item prop="username" label="用户名：">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password" label="密码：">
          <el-input type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginForm: { username: '111111', password: '222222' },
      loginFormRules: {
        username: [
          { required: true, message: '请输入登录名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度3到10个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度6到12个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields()
    },
    login() {
      this.$refs.loginFormRef.validate((valid) => {
        if (!valid) return
        console.log(1)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  background-color: #246;
  height: 100%;
  .login-box {
    display: flex;
    align-items: center;
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .login-form {
      width: 100%;
      padding: 20px 20px 0;
      box-sizing: border-box;
      .btns {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}
</style>
