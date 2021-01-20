<template>
  <div class="users-container">
    <el-card>
      <div class="head">用户管理</div>
      <!-- 顶部搜索 -->
      <el-row class="top">
        <el-form ref="form" :model="queryForm" :rules="formRules" label-width="90px">
          <el-col :span="5">
            <el-form-item label="登录名:" prop="loginName">
              <el-input placeholder="请输入登录名" v-model="queryForm.loginName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="姓名:" prop="name">
              <el-input placeholder="请输入姓名" v-model="queryForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="所属单位:" prop="department">
              <el-input placeholder="请输入所属单位" v-model="queryForm.department"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="用户状态:" prop="status">
              <el-select v-model="queryForm.status" placeholder="下拉选择">
                <el-option v-for="item in queryOptions" :key="item" :label="item" :value="item"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item class="btns" label-width="0">
              <el-button type="primary" @click="query">查询</el-button>
              <el-button @click="reset">重置</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <el-divider></el-divider>
      <!-- 表格 -->
      <div class="table">
        <el-table :data="tableData" style="width: 100%" stripe v-loading="loading" :element-loading-text="loadingText">
          <el-table-column type="index" label="序号" width="50"> </el-table-column>
          <el-table-column prop="name" label="登录名"></el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="name" label="所属单位"></el-table-column>
          <el-table-column prop="name" label="用户角色"></el-table-column>
          <el-table-column prop="name" label="用户状态">
            <template slot-scope="scope">
              <span v-if="scope.row.use">正常</span>
              <span v-else>停用</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="end(scope.row)" v-if="scope.row.use">停用</el-button>
              <el-button size="mini" type="primary" @click="start(scope.row)" v-else>启用</el-button>
              <el-button size="mini" @click="modify(scope.row)">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="page">
          <el-pagination
            background
            @current-change="handleCurrentChange"
            :current-page="1"
            :page-size="10"
            layout="total, prev, pager, next, jumper"
            :total="400"
          >
          </el-pagination>
        </div>
      </div>
    </el-card>
    <!-- 修改弹出框 -->
    <el-dialog title="系统名称" :visible.sync="dialogVisible" width="50%">
      <el-table :data="dialogData" style="width: 100%" stripe>
        <el-table-column prop="name" label="模块名称"></el-table-column>
        <el-table-column prop="name" label="当前状态">
          <template slot-scope="scope">
            <span v-if="scope.row.use">使用中</span>
            <span v-else>已禁用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span style="color: blue; cursor: pointer" v-if="scope.row.use">停用</span>
            <span style="color: blue; cursor: pointer" v-else>启用</span>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确认保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Users',
  data() {
    return {
      dialogVisible: false,
      index: null,
      queryForm: {
        loginName: '',
        name: '',
        department: '',
        status: ''
      },
      formRules: {
        loginName: [],
        name: [],
        department: [],
        status: []
      },
      tableData: [
        {
          name: '111',
          use: false
        },
        {
          name: '222',
          use: false
        },
        {
          name: '333',
          use: false
        },
        {
          name: '444',
          use: true
        },
        {
          name: '555',
          use: true
        },
        {
          name: '666',
          use: true
        },
        {
          name: '777',
          use: true
        },
        {
          name: '888',
          use: true
        },
        {
          name: '999',
          use: true
        },
        {
          name: '000',
          use: true
        }
      ],
      dialogData: [
        { name: '111', use: false },
        { name: '222', use: true },
        { name: '333', use: false }
      ],
      queryOptions: ['正常', '停用'],
      loading: false,
      loadingText: ''
    }
  },
  methods: {
    // 查询
    query() {
      console.log('chaxun')
    },
    // 重置查询表单
    reset() {
      this.$refs.form.resetFields()
    },
    // 启用
    start(row) {
      this.loadingText = '启用中，请稍后'
      this.loading = true
      setTimeout(() => {
        row.use = !row.use
        this.loading = false
      }, 1000)
    },
    // 停用
    end(row) {
      this.loadingText = '停用中，请稍后'
      this.loading = true
      setTimeout(() => {
        row.use = !row.use
        this.loading = false
      }, 1000)
    },
    // 修改
    modify(row) {
      console.log(row)
      this.dialogVisible = true
      this.index = this.tableData.indexOf(row)
      console.log(this.index)
    },
    // 确定修改
    confirm() {
      console.log('quedingxiugai')
      this.dialogVisible = false
    },
    // 页数改动
    handleCurrentChange(page) {
      console.log(page)
    }
  }
}
</script>

<style lang="scss" scoped>
.users-container {
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
</style>
