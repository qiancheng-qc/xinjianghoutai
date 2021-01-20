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
    <el-dialog title="系统名称" :visible.sync="dialogVisible" width="50%">
      <el-tree
        :data="data"
        :props="defaultProps"
        accordion
        show-checkbox
        node-key="label"
        ref="tree"
        @check-change="handleCheckChange"
      ></el-tree>
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
      data: [
        {
          label: '一级 1',
          children: [
            {
              label: '二级 1-1',
              children: [
                {
                  label: '三级 1-1-1'
                }
              ]
            }
          ]
        },
        {
          label: '一级 2',
          children: [
            {
              label: '二级 2-1',
              children: [
                {
                  label: '三级 2-1-1'
                }
              ]
            },
            {
              label: '二级 2-2',
              children: [
                {
                  label: '三级 2-2-1'
                }
              ]
            }
          ]
        },
        {
          label: '一级 3',
          children: [
            {
              label: '二级 3-1',
              children: [
                {
                  label: '三级 3-1-1'
                }
              ]
            },
            {
              label: '二级 3-2',
              children: [
                {
                  label: '三级 3-2-1'
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      total: 0,
      userId: window.sessionStorage.getItem('userId')
    }
  },
  created() {
    this.$axios.get('/sacw-xj-admin/auth/role/list?userId=' + this.userId).then((res) => {
      console.log(res.data.data)
      this.tableData = res.data.data
      this.total = this.tableData.length
    })
  },
  methods: {
    handleCurrentChange(page) {
      console.log(page)
    },
    modify(e) {
      console.log(e)
      this.dialogVisible = true
    },
    confirm() {
      console.log(this.$refs.tree.getCheckedKeys())
    },
    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate)
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
