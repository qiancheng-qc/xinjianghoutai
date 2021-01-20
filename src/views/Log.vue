<template>
  <div class="log-container">
    <el-card>
      <div class="head">日志列表</div>
      <div class="table">
        <el-table :data="logs" style="width: 100%" stripe>
          <el-table-column type="index" label="序号" width="50"></el-table-column>
          <el-table-column prop="createdDateTime" label="操作时间" width="200"></el-table-column>
          <el-table-column prop="createdBy" label="操作人" width="160"></el-table-column>
          <el-table-column prop="logData" label="日志内容" width="160"></el-table-column>
          <el-table-column prop="id" label="日志ID"></el-table-column>
          <el-table-column prop="status" label="操作状态" width="160">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status === '成功'" type="success">{{ scope.row.status }}</el-tag>
              <el-tag v-else type="danger">{{ scope.row.status }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="160">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="clickView(scope.row)">点击查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page">
        <div class="btns">
          <el-button @click="exportExcel('1')" type="danger" size="mini" icon="el-icon-download">导出当前页</el-button>
          <el-button @click="exportExcel('2')" type="warning" size="mini" icon="el-icon-download">导出全部</el-button>
        </div>
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page="logvo.pageNum"
          :page-size="10"
          layout="total, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </el-card>
    <!-- 点击查看 -->
    <el-dialog title="日志数据" :visible.sync="dialogVisible" width="50%">
      <div style="margin-bottom: 10px;">操作时间：{{ dialogData.createdDateTime }}</div>
      <div style="margin-bottom: 10px;">操作人：{{ dialogData.createdBy }}</div>
      <div style="margin-bottom: 10px;">日志内容：{{ dialogData.logData }}</div>
      <div style="margin-bottom: 10px;">日志ID：{{ dialogData.id }}</div>
      <div style="margin-bottom: 10px;">操作状态：{{ dialogData.status }}</div>
    </el-dialog>
  </div>
</template>

<script>
import { export2Excel } from '@/utils/util'
export default {
  name: 'Log',
  data() {
    return {
      logs: [],
      columns: [
        {
          title: '操作时间',
          key: 'createdDateTime'
        },
        {
          title: '操作人',
          key: 'createdBy'
        },
        {
          title: '日志内容',
          key: 'logData'
        },
        {
          title: '日志id',
          key: 'id'
        },
        {
          title: '操作状态',
          key: 'status'
        }
      ],
      logvo: {
        logType: 0,
        pageNum: 1,
        pageSize: 10,
        userId: window.sessionStorage.getItem('userId')
      },
      total: 0,
      loading: false,
      exportData: [],
      dialogVisible: false,
      dialogData: {}
    }
  },
  created() {
    this.getLogs()
  },
  methods: {
    getLogs() {
      this.loading = true
      this.$axios.post('/sacw-xj-admin/log/list', this.logvo).then((res) => {
        console.log(res.data.data)
        this.loading = false
        this.total = res.data.data.total
        this.logs = res.data.data.data
        this.logs.forEach((x) => {
          if (x.status === 1) {
            x.status = '成功'
          } else if (x.status === 2) {
            x.status = '失败'
          }
        })
      })
    },
    // 导出excel表格
    exportExcel(e) {
      if (e === '1') {
        export2Excel(this.columns, this.logs)
      } else {
        this.$axios
          .post('/sacw-xj-admin/log/list', {
            logType: 0,
            pageNum: 1,
            pageSize: this.total,
            userId: window.sessionStorage.getItem('userId')
          })
          .then((res) => {
            console.log(res.data.data)
            this.total = res.data.data.total
            this.exportData = res.data.data.data
            this.exportData.forEach((x) => {
              if (x.status === 1) {
                x.status = '成功'
              } else if (x.status === 2) {
                x.status = '失败'
              }
            })
            export2Excel(this.columns, this.exportData)
          })
      }
    },
    // 点击查看
    clickView(e) {
      console.log(e)
      this.dialogVisible = true
      this.dialogData = e
    },
    // 页数跳转
    handleCurrentChange(page) {
      console.log(page)
      this.logvo.pageNum = page
      this.getLogs()
    }
  }
}
</script>

<style lang="scss" scoped>
.log-container {
  .el-card {
    min-height: 600px;
    .page {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
