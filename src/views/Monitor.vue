<template>
  <div class="monitor-container">
    <el-card>
      <div class="top">系统环境监控</div>
      <div class="data" v-if="loading">
        <el-row>
          <el-col :span="12">
            <div class="inner">
              <div class="headline">CPU信息</div>
              <el-row class="charts">
                <el-col :span="14">
                  <div id="cpu-rate" style="height: 240px"></div>
                </el-col>
                <el-col :span="10">
                  <div class="div-list">
                    <div>
                      CPU系统使用率：<el-progress v-if="progress" :percentage="+monitorInfo.cpu.sys"></el-progress>
                    </div>
                    <div>
                      CPU当前等待率：<el-progress v-if="progress" :percentage="+monitorInfo.cpu.wait"></el-progress>
                    </div>
                    <div>CPU核心数：{{ monitorInfo.cpu.cpuNum }}</div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="inner">
              <div class="headline">内存信息</div>
              <el-row class="charts">
                <el-col :span="14">
                  <div id="mem-rate" style="height: 240px"></div>
                </el-col>
                <el-col :span="10">
                  <div class="div-list">
                    <div>
                      内存总量：{{ monitorInfo.mem.total }}<el-progress v-if="progress" :percentage="100"></el-progress>
                    </div>
                    <div>
                      已用内存：{{ monitorInfo.mem.used
                      }}<el-progress
                        v-if="progress"
                        :percentage="+((monitorInfo.mem.used / monitorInfo.mem.total) * 100).toFixed(1)"
                      ></el-progress>
                    </div>
                    <div>
                      剩余内存：{{ monitorInfo.mem.free
                      }}<el-progress
                        v-if="progress"
                        :percentage="+((monitorInfo.mem.free / monitorInfo.mem.total) * 100).toFixed(1)"
                      ></el-progress>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="inner">
              <div class="headline">JVM信息</div>
              <el-row class="charts">
                <el-col :span="10">
                  <div id="jvm-rate" style="height: 240px"></div>
                </el-col>
                <el-col :span="7">
                  <div class="div-list">
                    <div>
                      当前JVM占用内存总数：{{ monitorInfo.jvm.total
                      }}<el-progress v-if="progress" :percentage="100"></el-progress>
                    </div>
                    <div>
                      JVM已用内存：{{ monitorInfo.jvm.used
                      }}<el-progress
                        v-if="progress"
                        :percentage="+((monitorInfo.jvm.used / monitorInfo.jvm.total) * 100).toFixed(1)"
                      ></el-progress>
                    </div>
                    <div>
                      JVM空闲内存：{{ monitorInfo.jvm.free
                      }}<el-progress
                        v-if="progress"
                        :percentage="+((monitorInfo.jvm.free / monitorInfo.jvm.total) * 100).toFixed(1)"
                      ></el-progress>
                    </div>
                  </div>
                </el-col>
                <el-col :span="7">
                  <div class="div-list">
                    <div>JDK版本：{{ monitorInfo.jvm.version }}</div>
                    <div>Java名称：{{ monitorInfo.jvm.name }}</div>
                    <div>JDK路径：{{ monitorInfo.jvm.home }}</div>
                    <div>运行时长：{{ monitorInfo.jvm.runTime }}</div>
                    <div>启动时间：{{ monitorInfo.jvm.startTime }}</div>
                    <div>JVM最大可用内存总数：{{ monitorInfo.jvm.max }}</div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <div class="inner">
              <div class="headline">系统信息</div>
              <div class="charts">
                <div class="div-list">
                  <div>服务器IP：{{ monitorInfo.sys.computerIp }}</div>
                  <div>服务器名称：{{ monitorInfo.sys.computerName }}</div>
                  <div>系统架构：{{ monitorInfo.sys.osArch }}</div>
                  <div>操作系统：{{ monitorInfo.sys.osName }}</div>
                  <div>项目路径：{{ monitorInfo.sys.userDir }}</div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="19">
            <div class="inner">
              <div class="headline">磁盘信息</div>
              <el-tabs :tab-position="'left'" style="height: 260px">
                <el-tab-pane v-for="(item, index) in monitorInfo.sysFiles" :key="index" :label="'磁盘 ' + (index + 1)">
                  <el-row class="charts">
                    <el-col :span="8" class="rate">
                      <div class="rate-inner">
                        <el-progress
                          v-if="progress"
                          type="circle"
                          :percentage="+item.usage"
                          :width="200"
                          :format="format"
                        ></el-progress>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="div-list">
                        <div>
                          总大小：{{ item.total }}
                          <el-progress v-if="progress" :percentage="100"></el-progress>
                        </div>
                        <div>
                          已使用：{{ item.used
                          }}<el-progress
                            v-if="progress"
                            :percentage="
                              +(
                                (item.used.slice(0, item.used.length - 3) /
                                  item.total.slice(0, item.total.length - 3)) *
                                100
                              ).toFixed(1)
                            "
                          ></el-progress>
                        </div>
                        <div>
                          剩余大小：{{ item.free
                          }}<el-progress
                            v-if="progress"
                            :percentage="
                              +(
                                (item.free.slice(0, item.free.length - 3) /
                                  item.total.slice(0, item.total.length - 3)) *
                                100
                              ).toFixed(1)
                            "
                          ></el-progress>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="div-list">
                        <div>
                          盘符路径：
                          <div>{{ item.dirName }}</div>
                        </div>
                        <div>盘符类型：{{ item.sysTypeName }}</div>
                        <div>文件类型：{{ item.typeName }}</div>
                      </div>
                    </el-col>
                  </el-row>
                </el-tab-pane>
              </el-tabs>
            </div>
          </el-col>
        </el-row>
      </div>
      <div v-else class="loading"><i class="el-icon-loading"></i> 加载中</div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Monitor',
  data() {
    return {
      monitorInfo: {},
      activeNames: [0],
      loading: false,
      progress: false
    }
  },
  methods: {
    getMonitorInfo() {
      this.$axios.get('/sacw-xj-admin/monitor/info').then((res) => {
        console.log(res)
        this.monitorInfo = res.data.data
        this.loading = true
        setTimeout(() => this.echartsRender(), 200)
      })
    },
    echartsRender() {
      this.progress = true
      this.cpu()
      this.mem()
      this.jvm()
    },
    cpu() {
      const cpuRate = this.$echarts.init(document.getElementById('cpu-rate'))
      cpuRate.setOption({
        series: [
          {
            name: 'CPU使用率',
            type: 'pie',
            data: [
              { name: '用户使用率', value: this.monitorInfo.cpu.used },
              { name: '空闲率', value: this.monitorInfo.cpu.free }
            ],
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  formatter: '{b} : {d}%'
                },
                labelLine: { show: true }
              }
            }
          }
        ]
      })
    },
    mem() {
      const memRate = this.$echarts.init(document.getElementById('mem-rate'))
      memRate.setOption({
        series: [
          {
            name: '内存使用率',
            type: 'pie',
            data: [
              { name: '使用率', value: this.monitorInfo.mem.usage },
              { name: '空闲率', value: 100 - this.monitorInfo.mem.usage }
            ],
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  formatter: '{b} : {d}%'
                },
                labelLine: { show: true }
              }
            }
          }
        ]
      })
    },
    jvm() {
      const jvmRate = this.$echarts.init(document.getElementById('jvm-rate'))
      jvmRate.setOption({
        series: [
          {
            name: 'JVM使用率',
            type: 'pie',
            data: [
              { name: '使用率', value: this.monitorInfo.jvm.usage },
              { name: '空闲率', value: 100 - this.monitorInfo.jvm.usage }
            ],
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  formatter: '{b} : {d}%'
                },
                labelLine: { show: true }
              }
            }
          }
        ]
      })
    },
    format(percentage) {
      return '使用率:' + `${percentage}%`
    }
  },
  created() {
    this.getMonitorInfo()
  }
}
</script>

<style lang="scss" scoped>
.monitor-container {
  .el-card {
    min-height: 600px;
    /deep/ .el-card__body {
      padding: 0;
    }
    .top {
      margin-bottom: 4px;
      padding: 10px 20px;
      background-color: #e0e0e0;
      border-left: #409eff 6px solid;
      font-size: 22px;
    }
    .data {
      .inner {
        border: 1px #e0e0e0 solid;
        margin: 2px;
        border-radius: 6px;
        .headline {
          background-color: #409eff;
          color: #fff;
          padding: 6px;
          border-radius: 6px 6px 0 0;
        }
        .charts {
          padding: 10px 0;
        }
        .div-list {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 200px;
          padding: 20px;
        }
        .rate {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 240px;
          .rate-inner {
            width: 200px;
            height: 200px;
          }
        }
      }
    }
    .loading {
      margin-top: 250px;
      text-align: center;
      font-size: 24px;
      .el-icon-loading {
        color: #409eff;
      }
    }
  }
}
</style>
