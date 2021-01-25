<template>
  <div class="users-container">
    <el-card>
      <div class="head">用户管理：用户信息来源于206系统UAP服务</div>
      <!-- 顶部搜索 -->
      <el-row class="top">
        <el-form ref="form" :model="queryForm" label-width="90px">
          <el-col :span="5">
            <el-form-item label="关键字:" prop="name">
              <el-input placeholder="登录名或姓名" v-model="queryForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="所属机构:" prop="department">
              <el-select placeholder="所属机构" filterable="" v-model="queryForm.orgId">
                <el-option v-for="item in orgList" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!--<el-col :span="5">-->
            <!--<el-form-item label="用户角色:" prop="status">-->
              <!--<el-select v-model="queryForm.status" placeholder="角色">-->
                <!--<el-option v-for="item in queryOptions" :key="item" :label="item" :value="item"> </el-option>-->
              <!--</el-select>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="5">-->
            <!--<el-form-item label="用户状态:" prop="status">-->
              <!--<el-select v-model="queryForm.status" placeholder="状态">-->
                <!--<el-option v-for="item in queryOptions" :key="item" :label="item" :value="item"> </el-option>-->
              <!--</el-select>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
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
        <el-table :data="userList" style="width: 100%" stripe v-loading="loading" :element-loading-text="loadingText">
          <el-table-column type="index" label="序号" width="50"> </el-table-column>
          <el-table-column prop="loginName" label="登录名" align="center"></el-table-column>
          <el-table-column prop="name" label="姓名" align="center"></el-table-column>
          <el-table-column prop="orgName" label="所属机构" align="center"></el-table-column>
          <el-table-column prop="roleName" label="用户角色" align="center" width="300px">
            <template slot-scope="scope">
              <span v-for="item in scope.row.roleList" :key="item.id">
                <el-tag v-if="item.name === '协同用户'" type="warning">{{item.name}}</el-tag>
                <el-tag v-else-if="item.name === '共管用户'" type="success">{{item.name}}</el-tag>
                <el-tag v-else-if="item.name === '自管用户'" >{{item.name}}</el-tag>
                <el-tag v-else-if="item.name === '管理员'" type="danger" >{{item.name}}</el-tag>
                <el-tag v-else type="danger">{{item.name}}</el-tag>
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="用户状态" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.status === 1">启用</span>
              <span v-else>停用</span>
            </template>
          </el-table-column>
          <el-table-column prop="userSource" label="用户来源" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.userSource === 1">系统添加</span>
              <span v-else>其他</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="view(scope.row.id)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="page">
          <el-pagination
            background
            @current-change="handleCurrentChange"
            :current-page="queryForm.pageNum"
            :page-size="10"
            layout="total, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </div>
      </div>
    </el-card>
    <user-detail ref="userDetailRef"></user-detail>
  </div>
</template>

<script>
import userDetail from '../components/UserDetail'

export default {
  name: 'Users',
  components: { userDetail },
  data() {
    return {
      id: '',
      dialogVisible: false,
      index: null,
      queryForm: {
        name: '',
        orgId: '',
        pageNum: 1,
        pageSize: 10
      },
      total: 0,
      userList: [{
        id: '',
        loginName: '',
        name: '',
        orgId: '',
        orgName: '',
        status: '',
        userSource: '',
        roleList: []
      }],
      orgList: [
        { id: '', name: '' }
      ],
      dialogData: [
        { name: '111', use: false },
        { name: '222', use: true },
        { name: '333', use: false }
      ],
      queryOptions: ['启用', '停用'],
      loading: false,
      loadingText: ''
    }
  },
  created() {
    this.getUserList(this.queryForm)
    this.getOrgList()
  },
  methods: {
    // 查询
    query() {
      this.queryForm.pageNum = 1
      console.log(this.queryForm)
      this.getUserList(this.queryForm)
    },
    // 重置查询表单
    reset() {
      this.$refs.form.resetFields()
      this.queryForm.pageNum = 1
      this.queryForm.orgId = ''
      this.getUserList(this.queryForm)
    },
    // 页数改动
    handleCurrentChange(page) {
      console.log(page)
      this.queryForm.pageNum = page
      this.getUserList(this.queryForm)
    },

    // 获取UAP用户列表
    getUserList(data) {
      this.loading = true
      this.$axios
        .post('/sacw-xj-admin/uap/user/list', data)
        .then((res) => {
          console.log(res.data)
          this.total = res.data.data.total
          this.userList = res.data.data.data
          this.loading = false
        })
    },
    // 获取机构列表
    getOrgList() {
      this.$axios
        .get('/sacw-xj-admin/uap/org/list')
        .then((res) => {
          console.log(res)
          this.orgList = res.data.data
        })
    },
    view(id) {
      this.$refs.userDetailRef.getUserInfo(id)
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
