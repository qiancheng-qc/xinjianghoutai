<template>
  <div class="monitor-container">
    <el-card>
      <div class="title">
        <span>系统环境监控</span>
      </div>
      <div class="data">
        <el-row>
          <el-col :span="12">
            <div class="col-inner">
              <dl>
                <dt>系统信息</dt>
                <dd>操作系统：win10</dd>
                <dd>Java版本：1.1</dd>
                <dd>程序启动时间：2020-02-02 12:00:00</dd>
                <dd>程序启动时间：2020-02-02 12:00:00</dd>
              </dl>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="col-inner">
              <dl>
                <dt>系统信息</dt>
                <dd>操作系统：win10</dd>
                <dd>Java版本：1.1</dd>
                <dd>程序启动时间：2020-02-02 12:00:00</dd>
              </dl>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="col-inner">
              <dl>
                <dt>系统信息</dt>
                <dd>操作系统：win10</dd>
                <dd>Java版本：1.1</dd>
                <dd>程序启动时间：2020-02-02 12:00:00</dd>
                <dd>程序启动时间：2020-02-02 12:00:00</dd>
              </dl>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="col-inner">
              <dl>
                <dt>系统信息</dt>
                <dd>操作系统：win10</dd>
                <dd>Java版本：1.1</dd>
                <dd>程序启动时间：2020-02-02 12:00:00</dd>
              </dl>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="col-inner">
              <dl>
                <dt>系统信息</dt>
                <dd>操作系统：win10</dd>
                <dd>Java版本：1.1</dd>
                <dd>程序启动时间：2020-02-02 12:00:00</dd>
                <dd>程序启动时间：2020-02-02 12:00:00</dd>
              </dl>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="col-inner">
              <dl>
                <dt>系统信息</dt>
                <dd>操作系统：win10</dd>
                <dd>Java版本：1.1</dd>
                <dd>程序启动时间：2020-02-02 12:00:00</dd>
              </dl>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Monitor'
}
</script>

<style lang="scss" scoped>
.monitor-container {
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
    .data {
      .col-inner {
        margin: 10px;
        padding: 10px;
        height: 200px;
        border: 1px solid #ccc;
        border-radius: 10px;
        dt {
          margin-bottom: 20px;
        }
        dd {
          margin-left: 0;
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>
