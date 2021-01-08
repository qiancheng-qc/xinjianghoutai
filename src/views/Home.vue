<template>
  <div class="home-container">
    <el-container class="out-container">
      <el-header>
        <div class="header-left">刑事案件涉案财物共同保管中心子系统</div>
        <div class="header-right">
          <div class="avatar"></div>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">admin<i class="el-icon-arrow-down el-icon--right"></i> </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu :default-active="active" background-color="#f2f2f2" router>
            <el-menu-item index="1" route="/users">
              <i class="el-icon-user"></i>
              <span slot="title">用户管理</span>
            </el-menu-item>
            <el-menu-item index="2" route="/setting">
              <i class="el-icon-setting"></i>
              <span slot="title">系统设置</span>
            </el-menu-item>
            <el-menu-item index="3" route="/log">
              <i class="el-icon-document"></i>
              <span slot="title">实时日志</span>
            </el-menu-item>
            <el-menu-item index="4" route="/monitor">
              <i class="el-icon-monitor"></i>
              <span slot="title">系统监控</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
    <el-dialog title="退出登录" :visible.sync="logoutDialogVisible" width="30%">
      <span>确定退出登陆吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="logoutDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="logoutConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      active: '1',
      logoutDialogVisible: false
    }
  },
  created() {
    if (this.$route.path === '/setting') {
      this.active = '2'
    } else if (this.$route.path === '/log') {
      this.active = '3'
    } else if (this.$route.path === '/monitor') {
      this.active = '4'
    }
  },
  methods: {
    handleCommand(e) {
      console.log(e)
      if (e === 'logout') {
        console.log('退出')
        this.logoutDialogVisible = true
      }
    },
    // 确认退出登录
    logoutConfirm() {
      this.logoutDialogVisible = false
      // this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.home-container {
  height: 100%;
  .out-container {
    padding-top: 60px;
    height: 100%;
    .el-header {
      position: fixed;
      top: 0;
      z-index: 10;
      width: 100%;
      background-color: #ccc;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .header-left {
        font-size: 24px;
      }
      .header-right {
        display: flex;
        align-items: center;
        font-size: 20px;
        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #999;
          margin-right: 10px;
        }
        .el-dropdown-link {
          cursor: pointer;
          color: #666;
          font-size: 18px;
          &:hover {
            color: #409eff;
          }
        }
      }
    }
    .el-aside {
      background-color: #f2f2f2;
      .el-menu {
        position: fixed;
        top: 60px;
        left: 0;
        width: 200px;
        border-right: none;
      }
    }
  }
}
</style>
