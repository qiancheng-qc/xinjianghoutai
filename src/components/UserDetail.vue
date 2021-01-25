<template>
    <el-dialog title="用户信息" :visible.sync="childDialogVisible" width="50%">
      <div class="head">基本信息</div>
      <el-row :gutter="20" style="margin-left: 12px;">
        <el-col :span="4"><div class="grid-content bg-purple" style="font-weight: bold">登录名</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">{{userDetailData.loginName}}</div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple" style="font-weight: bold">姓名</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">{{userDetailData.name}}</div></el-col>
      </el-row>
      <el-row :gutter="20" style="margin-left: 12px;">
        <el-col :span="4"><div class="grid-content bg-purple" style="font-weight: bold">所属机构</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">{{userDetailData.orgName}}</div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple" style="font-weight: bold">用户状态</div></el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <template>
              <span v-if="userDetailData.status === 1">启用</span>
              <span v-else>禁用</span>
            </template>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-left: 12px;">
        <el-col :span="4"><div class="grid-content bg-purple" style="font-weight: bold">用户类型</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">
          <span v-if="userDetailData.userType === 1">超级管理员</span>
          <span v-if="userDetailData.userType === 2">业务管理员</span>
          <span v-if="userDetailData.userType === -1">普通用户</span>
        </div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple" style="font-weight: bold">电话号码</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">{{userDetailData.phone}}</div></el-col>
      </el-row>
      <el-row :gutter="20" style="margin-left: 12px;">
        <el-col :span="4"><div class="grid-content bg-purple" style="font-weight: bold">邮箱</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">{{userDetailData.email}}</div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple" style="font-weight: bold">地址</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">{{userDetailData.address}}</div></el-col>
      </el-row>
      <el-row :gutter="20" style="margin-left: 12px;">
        <el-col :span="4"><div class="grid-content bg-purple" style="font-weight: bold">创建时间</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">{{userDetailData.createTime}}</div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple" style="font-weight: bold">修改时间</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">{{userDetailData.updateTime}}</div></el-col>
      </el-row>
      <el-row :gutter="20" style="margin-left: 12px;">
        <el-col :span="4"><div class="grid-content bg-purple" style="font-weight: bold">身份证号</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">{{userDetailData.idNumber}}</div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple" style="font-weight: bold">备注</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">{{userDetailData.remark}}</div></el-col>
      </el-row>
      <div class="head">角色信息</div>
      <template>
        <el-table
          :data="userDetailData.roleList"
          stripe="true"
          border="true"
          fit="true">
          <el-table-column
            type="index"
            label="序号"
            width="150"
            align="center">
          </el-table-column>
          <el-table-column
            prop="name"
            label="角色名称"
            align="center">
          </el-table-column>
        </el-table>
      </template>
    </el-dialog>
</template>

<script>
export default {
  name: 'user-detail',
  data: function() {
    return {
      index: null,
      userDetailData: {
        loginName: 'admin',
        name: '',
        orgId: '',
        orgName: '',
        status: '',
        userSource: '',
        phone: '',
        address: '',
        email: '',
        dn: '',
        remark: '',
        createTime: '',
        updateTime: '',
        idNumber: '',
        userType: '',
        roleList: []
      },
      childDialogVisible: false
    }
  },
  methods: {
    getUserInfo(id) {
      var that = this
      console.log(that.userDetailData)
      if (id === '') {
        this.$message.error('参数错误')
        return
      }
      this.childDialogVisible = true
      this.$axios
        .get('/sacw-xj-admin/uap/user/info/' + id)
        .then((res) => {
          console.log(res)
          that.userDetailData = res.data.data
          console.log(that.userDetailData)
        })
    }
  }
}
</script>

<style scoped>
.head {
  margin: 10px 0 20px;
  padding: 6px 16px;
  background-color: rgba(255,255,255,.5);
  border-left: #66b1ff 6px solid;
}
.el-scrollbar__wrap {
  overflow-x: hidden!important;
}
.el-row {
  margin-bottom: 30px
}
.el-col el-col-3 {
  padding-left: 33px;
  padding-right: 10px;
}.bg-purple-dark {
   background: #99a9bf;
 }
.bg-purple {
  text-align: center
}
.grid-content {
  border-radius: 4px;
  min-height: 1px;
}
</style>
