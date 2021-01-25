<template>
  <div class="login-container">
    <div class="login-box">
      <!-- 登录表单 -->
      <el-form ref="loginFormRef" class="login-form" :model="loginForm" label-width="80px">
        <!-- 用户名 -->
        <el-form-item label="用户名：">
          <el-input v-model="loginForm.loginName"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码：">
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
      // 登录表单数据
      loginForm: { loginName: 'admin', password: '123456' }
    }
  },
  methods: {
    // 重置表单
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields()
    },
    // 登录
    login() {
      this.$axios.post('/sacw-xj-admin/login', this.loginForm).then((res) => {
        console.log(res.data)
        if (res.data.message === '交易成功') {
          window.sessionStorage.setItem('name', res.data.data.name)
          window.sessionStorage.setItem('userId', res.data.data.userId)
          this.$message.success('登陆成功')
          this.$router.push('/home')
        } else {
          this.$message.warning('登陆失败，请重试')
        }
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
