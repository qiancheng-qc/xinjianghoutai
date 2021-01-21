<template>
  <div class="role-container">
    <el-card>
      <div class="head">角色管理</div>
      <div class="table">
        <el-table :data="tableData" style="width: 100%" stripe>
          <el-table-column type="index" label="序号" width="50"> </el-table-column>
          <el-table-column prop="name" label="角色名称"></el-table-column>
          <el-table-column prop="createTime" label="创建时间"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="modify(scope.row)">修改权限</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page="1"
          :page-size="10"
          layout="prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </el-card>
    <el-dialog title="权限列表" :visible.sync="dialogVisible" width="50%">
      <el-checkbox-group v-model="checkList">
        <div v-for="(item, index) in menuList" :key="index" style="margin-bottom: 10px;">
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
      tableData: [],
      dialogVisible: false,
      total: 0,
      userId: window.sessionStorage.getItem('userId'),
      checkList: [],
      menuList: []
    }
  },
  created() {
    this.getRoleList()
    this.getMenuList()
  },
  methods: {
    getRoleList() {
      this.$axios.get('/sacw-xj-admin/auth/role/list?userId=' + this.userId).then((res) => {
        console.log(res.data.data)
        this.tableData = res.data.data
        this.total = this.tableData.length
      })
    },
    getMenuList() {
      this.$axios.post('/sacw-xj-admin/menu/all', { userId: this.userId }).then((res) => {
        console.log(res.data.data)
        this.menuList = res.data.data
      })
    },
    handleCurrentChange(page) {
      console.log(page)
    },
    modify(e) {
      console.log(e)
      this.dialogVisible = true
    },
    confirm() {
      console.log(1)
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
