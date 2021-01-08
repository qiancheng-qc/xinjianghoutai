<template>
  <div class="log-container">
    <el-card>
      <div class="title">
        <span>实时日志</span>
      </div>
      <div class="logs">
        <div class="log" v-for="(item, index) in logs" :key="index">{{ item }}</div>
      </div>
      <div class="btns">
        <div class="inner">
          <el-button @click="clear">清屏</el-button>
          <el-button @click="derive">导出</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Log',
  data() {
    return {
      logs: [
        'fjsdklfalkdfjakldfjlsk',
        'eiutopoizucklzj;lkxjdfiejnmlxl',
        'eiutopoizucklzj;lkxjdfiejnmlxl',
        'eiutopoizucklzj;lkxjdfiejnmlxl',
        'eiutopoizucklzj;lkxjdfiejnmlxl',
        'eiutopoizucklzj;lkxjdfiejnmlxl',
        'eiutopoizucklzj;lkxjdfiejnmlxl',
        'eiutopoizucklzj;lkxjdfiejnmlxl',
        'eiutopoizucklzj;lkxjdfiejnmlxl',
        'eiutopoizucklzj;lkxjdfiejnmlxl',
        'eiutopoizucklzj;lkxjdfiejnmlxl',
        'eiutopoizucklzj;lkxjdfiejnmlxl',
        'eiutopoizucklzj;lkxjdfiejnmlxl',
        'eiutopoizucklzj;lkxjdfiejnmlxl',
        'eiutopoizucklzj;lkxjdfiejnmlxl',
        'eiutopoizucklzj;lkxjdfiejnmlxl',
        'eiutopoizucklzj;lkxjdfiejnmlxl',
        'eiutopoizucklzj;lkxjdfiejnmlxl',
        'eiutopoizucklzj;lkxjdfiejnmlxl',
        'eiutopoizucklzj;lkxjdfiejnmlxl',
        'eiutopoizucklzj;lkxjdfiejnmlxl',
        'eiutopoizucklzj;lkxjdfiejnmlxl',
        'eiocznuinubdupakxn'
      ]
    }
  },
  methods: {
    clear() {
      console.log('qingping')
    },
    derive() {
      console.log('daochu')
    }
  }
}
</script>

<style lang="scss" scoped>
.log-container {
  .el-card {
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
    .logs {
      margin-bottom: 20px;
      padding: 20px;
      height: 450px;
      border: 1px solid #ccc;
      border-radius: 10px;
      overflow: auto;
      .log {
        margin: 10px 0;
      }
    }
    .btns {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
