<template>
  <div class="pwd-container">
    <el-card>
      <div class="head">修改密码</div>
      <!-- <div class="title">
        <span>修改密码</span>
      </div> -->
      <div class="form">
        <el-form ref="form" :model="form" :rules="formRules" label-width="120px">
          <el-form-item label="原密码：" prop="oldPasswd">
            <el-input v-model="form.oldPasswd" placeholder="请输入原密码" type="password"></el-input>
          </el-form-item>
          <el-form-item label="新密码：" prop="newPasswd">
            <el-input v-model="form.newPasswd" placeholder="请输入新密码" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码：" prop="confirmPasswd">
            <el-input v-model="form.confirmPasswd" placeholder="请再次输入密码" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="modify">修改</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Pwd',
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.newPasswd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        oldPasswd: '',
        newPasswd: '',
        confirmPasswd: '',
        userId: window.sessionStorage.getItem('userId')
      },
      formRules: {
        oldPasswd: [
          { required: true, message: '请输入原密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ],
        newPasswd: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ],
        confirmPasswd: [{ validator: validatePass, trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 修改
    modify() {
      console.log('xiugai')
      this.$refs.form.validate(async (valid) => {
        if (!valid) return
        this.$axios.post('/sacw-xj-admin/update', this.form).then((res) => {
          console.log(res)
          if (res.data.status === 200) {
            this.$message.success(res.data.data)
            this.$router.push('/')
          } else {
            this.$message.warning(res.data.data)
          }
        })
      })
    },
    // 重置表单
    reset() {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.pwd-container {
  .el-card {
    position: relative;
    min-height: 600px;
    .title {
      display: flex;
      justify-content: center;
      margin: 20px 0 50px;
      span {
        color: #333;
        font-size: 36px;
      }
    }
    .form {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 50%;
    }
  }
}
</style>
