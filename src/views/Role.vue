<template>
  <div class="role-container">
    <el-card>
      <div class="head">角色管理</div>
      <!-- 表格区域 -->
      <div class="table">
        <el-table :data="tableData" style="width: 100%" stripe v-loading="loading">
          <el-table-column type="index" label="序号" width="50"> </el-table-column>
          <el-table-column prop="name" label="角色名称"></el-table-column>
          <el-table-column prop="appName" label="地区"></el-table-column>
          <el-table-column prop="createTime" label="创建时间"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="modify(scope.row)">修改权限</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 页码区域 没用 -->
      <div class="page">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page="1"
          :page-size="10"
          layout="total, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </el-card>
    <!-- 修改弹框 -->
    <el-dialog title="权限列表" :visible.sync="dialogVisible" width="50%">
      <el-checkbox-group v-model="checkList">
        <div v-for="(item, index) in menuList" :key="index" style="margin-bottom: 10px">
          <el-checkbox :label="item.menuName"></el-checkbox>
        </div>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确认保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Role',
  data() {
    return {
      tableData: [], // 表格数据
      dialogVisible: false, // 弹框开关
      total: 0, // 表格数据总数
      userId: window.sessionStorage.getItem('userId'), // 用户userID
      checkList: [], // 多选框数据 menuName
      menuList: [], // 所有菜单列表
      loading: false, // 表格加载状态
      modifyList: [], // 获取的角色已有菜单
      // 保存角色菜单权限数据
      saveData: {
        userId: window.sessionStorage.getItem('userId'),
        roleId: '',
        menuIds: []
      }
    }
  },
  created() {
    this.getRoleList()
    this.getMenuList()
  },
  watch: {
    checkList(val) {
      this.saveData.menuIds = []
      val.filter((x) => {
        this.menuList.filter((y) => {
          if (x === y.menuName) {
            this.saveData.menuIds.push(y.id)
          }
        })
      })
      console.log(this.saveData.menuIds, 'saveData.menuIds')
    },
    modifyList(val) {
      this.checkList = []
      val.filter((x) => {
        this.checkList.push(x.menuName)
      })
      console.log(this.checkList, 'checkList')
    }
  },
  methods: {
    // 获取角色列表
    getRoleList() {
      this.loading = true
      this.$axios.get('/sacw-xj-admin/auth/role/list?userId=' + this.userId).then((res) => {
        console.log(res.data.data)
        this.loading = false
        this.tableData = res.data.data
        this.total = this.tableData.length
      })
    },
    // 获取菜单列表
    getMenuList() {
      this.$axios.post('/sacw-xj-admin/menu/all', { userId: this.userId }).then((res) => {
        console.log(res.data.data)
        this.menuList = res.data.data
      })
    },
    // 翻页 没用
    handleCurrentChange(page) {
      console.log(page)
    },
    // 打开修改弹框获取角色已有权限
    modify(e) {
      console.log(e)
      this.saveData.roleId = e.id
      this.$axios.get('/sacw-xj-admin/auth/menu/list?userId=' + this.userId + '&roleId=' + e.id).then((res) => {
        if (res.data.status === 200) {
          console.log(res.data)
          this.modifyList = res.data.data
          this.dialogVisible = true
        } else {
          this.$message.error('获取数据失败，请重试')
        }
      })
    },
    // 保存菜单权限列表
    confirm() {
      this.$axios.post('/sacw-xj-admin/auth/menu/save', this.saveData).then((res) => {
        if (res.data.status === 200) {
          console.log(res.data)
          this.$message.success('修改成功')
          this.dialogVisible = false
        } else {
          this.$message.error('获取数据失败，请重试')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.role-container {
  .el-card {
    min-height: 600px;
    padding: 0 20px;
    .page {
      display: flex;
      justify-content: center;
      margin-top: 40px;
    }
  }
}
</style>
