<template>
  <div class="setting-container">
    <el-card>
      <div class="head">系统设置</div>
      <div class="form">
        <el-form ref="form" :model="form" :rules="formRules" label-width="120px">
          <el-form-item label="共管系统名称：" prop="manageName">
            <el-input v-model="form.manageName"></el-input>
          </el-form-item>
          <el-form-item label="协同系统名称：" prop="assistName">
            <el-input v-model="form.assistName"></el-input>
          </el-form-item>
          <el-form-item label="运维电话：" prop="phone">
            <el-input v-model="form.phone"></el-input>
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
  name: 'Setting',
  data() {
    return {
      form: {
        manageName: '刑事案件涉案财物共同保管中心子系统',
        assistName: '刑事案件涉案财物协同管理子系统',
        phone: '13312341234'
      },
      formRules: {
        manageName: [],
        assistName: [],
        phone: []
      }
    }
  },
  methods: {
    // 修改
    modify() {
      console.log('xiugai')
    },
    // 重置表单
    reset() {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.setting-container {
  .el-card {
    position: relative;
    min-height: 600px;
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
