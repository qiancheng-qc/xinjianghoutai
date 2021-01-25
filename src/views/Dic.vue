<template>
  <div class="dic-container">
    <el-card>
      <div class="head">字典列表</div>
      <!-- 顶部搜索 -->
      <el-row class="top">
        <el-form ref="form" :model="queryForm" label-width="90px">
          <el-col :span="5">
            <el-form-item label="字典名称:" prop="dicName">
              <el-input placeholder="请输入字典名称" v-model="queryForm.dicName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item class="btns" label-width="0">
              <el-button type="primary" @click="queryDicList">查询</el-button>
              <el-button @click="reset">重置</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <el-row style="left: 1vw">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="clickAdd()"
          plain
        >新增字典</el-button>
      </el-row>

      <el-divider></el-divider>

      <div class="table">
        <el-table :data="dicList" style="width: 100%;" stripe>
          <el-table-column prop="id" label="序号" align="center" width="100"></el-table-column>
          <el-table-column prop="dicType" label="字典类型" align="center" ></el-table-column>
          <el-table-column prop="dicName" label="字典名称" align="center" ></el-table-column>
          <el-table-column prop="dicValue" label="字典值" align="center" ></el-table-column>
          <el-table-column label="操作" align="center" width="160">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="clickView(scope.row)">查看</el-button>
              <el-button size="mini" icon="el-icon-edit" @click="clickUpdate(scope.row)">修改</el-button>
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
          :current-page="dicVo.pageNum"
          :page-size="10"
          layout="total, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </el-card>
    <!-- 点击查看 -->
    <el-dialog title="字典数据" :visible.sync="dialogVisible" width="50%">
      <el-form ref="form" :model="dialogData" label-width="80px">
        <el-form-item style="font-weight: bold" label="字典类型">
            <el-input v-model="dialogData.dicType" :disabled="true" style="width: 240px"></el-input>
        </el-form-item>
        <el-form-item style="font-weight: bold" label="字典名称">
          <el-input v-model="dialogData.dicName" :disabled="true" style="width: 240px"></el-input>
        </el-form-item>
        <el-form-item style="font-weight: bold" label="字典值">
            <el-input v-model="dialogData.dicValue" :disabled="true" style="width: 240px"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 点击修改 -->
    <el-dialog title="字典数据" :visible.sync="updateVisible" width="50%">
      <el-form ref="updateForm" :model="dialogData" :rules="rules" label-width="80px">
        <el-form-item style="font-weight: bold" label="字典类型" prop="dicType">
          <el-tooltip class="item"
                      popper-class="atooltip"
                      effect="dark"
                      content="请勿随意更新此值"
                      placement="right">
            <el-input v-model="dialogData.dicType" style="width: 240px"></el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item style="font-weight: bold" label="字典名称" prop="dicName">
          <el-input v-model="dialogData.dicName" style="width: 240px"></el-input>
        </el-form-item>
        <el-form-item style="font-weight: bold" label="字典值" prop="dicValue">
          <el-tooltip class="item"
                      popper-class="atooltip"
                      effect="dark"
                      content="请勿随意更新此值"
                      placement="right">
            <el-input v-model="dialogData.dicValue" style="width: 240px"></el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSave('updateForm', dialogData.id)">保存</el-button>
          <el-button @click="onCancel('updateForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { export2Excel } from '@/utils/util'
export default {
  name: 'Dic',
  data() {
    return {
      dicList: [],
      columns: [
        {
          title: '序号',
          key: 'id'
        },
        {
          title: '字典类型',
          key: 'dicType'
        },
        {
          title: '字典名称',
          key: 'dicName'
        },
        {
          title: '字典值',
          key: 'dicValue'
        }
      ],
      dicVo: {
        dicName: '',
        pageNum: 1,
        pageSize: 10,
        userId: window.sessionStorage.getItem('userId')
      },
      total: 0,
      loading: false,
      exportData: [],
      dialogVisible: false,
      updateVisible: false,
      dialogData: {
        id: '',
        dicType: '',
        dicName: '',
        dicValue: ''
      },
      queryForm: {
        dicName: ''
      },
      rules: {
        dicType: [
          { required: true, message: '请输入字典类型', trigger: 'blur' }
        ],
        dicName: [
          { required: true, message: '请输入字典名称', trigger: 'blur' }
        ],
        dicValue: [
          { required: true, message: '请输入字典值', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getDicList(this.dicVo)
  },
  methods: {
    // 查询
    queryDicList() {
      this.dicVo.pageNum = 1
      this.dicVo.dicName = this.queryForm.dicName
      this.getDicList(this.dicVo)
    },
    // 重置
    reset() {
      this.dicVo = {}
      this.queryForm.dicName = ''
      this.getDicList(this.dicVo)
    },
    // 获取字典列表数据
    getDicList(data) {
      this.loading = true
      this.$axios.post('/sacw-xj-admin/dic-status/list', data).then((res) => {
        console.log(res.data.data)
        this.loading = false
        this.total = res.data.data.total
        this.dicList = res.data.data.data
      })
    },
    // 导出excel表格
    exportExcel(e) {
      if (e === '1') {
        export2Excel(this.columns, this.dicList)
      } else {
        this.$axios
          .post('/sacw-xj-admin/dic-status/list', {
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
      this.dicVo.pageNum = page
      this.getDicList(this.dicVo)
    },
    // 点击新增
    clickAdd() {
      this.updateVisible = true
      this.dialogData.id = ''
      this.dialogData.dicName = ''
      this.dialogData.dicType = ''
      this.dialogData.dicValue = ''
    },
    // 点击修改
    clickUpdate(e) {
      this.updateVisible = true
      this.dialogData = e
    },
    // 保存修改
    onSave(updateForm, id) {
      this.$refs[updateForm].validate((valid) => {
        if (valid) {
          this.$axios
            .post('/sacw-xj-admin/dic-status/save',
              this.dialogData)
            .then((res) => {
              if (res.data.status === 200) {
                this.$message.success(res.data.message)
                this.updateVisible = false
                this.getDicList(this.dicVo)
              } else {
                this.$message.error(res.data.message)
              }
            })
        } else {
          this.$message.error('表单信息填写不正确')
          return false
        }
      })
    },
    // 取消修改
    onCancel(updateForm) {
      this.updateVisible = false
      this.$refs[updateForm].resetFields()
    }

  }
}
</script>

<style lang="scss">
.dic-container {
  .el-card {
    min-height: 600px;
    padding: 0 20px;
    .top {
      margin-top: 10px;
      .btns {
        display: flex;
        justify-content: flex-end;
      }
    }
    .page {
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;
    }
  }
}
.atooltip.el-tooltip__popper[x-placement^="right"] .popper__arrow {
  border-right-color: rgba(255, 255, 255, .5);
}
.atooltip.el-tooltip__popper[x-placement^="right"] .popper__arrow:after {
  border-right-color: rgba(255, 255, 255, .5);
}
.atooltip {
  background: rgba(255, 255, 255, .5) !important;
  color: #f56c6c !important;
}

</style>
