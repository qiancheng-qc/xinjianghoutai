<template>
  <div class="home-container">
    <el-container class="out-container">
      <!-- 头部 -->
      <el-header>
        <div class="header-left">刑事案件涉案财物共同保管中心子系统</div>
        <div class="header-right">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">{{ name }}<i class="el-icon-arrow-down el-icon--right"></i> </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="changepwd">修改密码</el-dropdown-item>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-container>
        <!-- 侧边 -->
        <el-aside width="200px">
          <el-menu :default-active="active" background-color="#444" router text-color="#fff">
            <el-menu-item index="1" route="/users">
              <i class="el-icon-user"></i>
              <span slot="title">用户管理</span>
            </el-menu-item>
            <el-menu-item index="5" route="/role">
              <i class="el-icon-link"></i>
              <span slot="title">角色管理</span>
            </el-menu-item>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span>系统设置</span>
              </template>
              <el-menu-item index="2-1" route="/dic">
                <i class="el-icon-collection"></i>
                <span slot="title">字典管理</span>
              </el-menu-item>
            </el-submenu>
            <el-menu-item index="3" route="/log">
              <i class="el-icon-document"></i>
              <span slot="title">日志列表</span>
            </el-menu-item>
            <el-menu-item index="4" route="/monitor">
              <i class="el-icon-monitor"></i>
              <span slot="title">系统监控</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <!-- 主体 -->
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
    <!-- 退出登录弹框 -->
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
      active: '1', // 左侧当前激活的菜单
      logoutDialogVisible: false, // 退出登录弹框开关
      name: '' // 用户名
    }
  },
  created() {
    // 获取用户名
    this.name = window.sessionStorage.getItem('name')
    // 根据路由修改左侧当前激活的菜单
    if (this.$route.path === '/dic') {
      this.active = '2-1'
    } else if (this.$route.path === '/log') {
      this.active = '3'
    } else if (this.$route.path === '/monitor') {
      this.active = '4'
    } else if (this.$route.path === '/role') {
      this.active = '5'
    }
  },
  methods: {
    // 右上角下拉栏操作
    handleCommand(e) {
      console.log(e)
      if (e === 'changepwd') {
        console.log('修改密码')
        this.$router.push('/pwd')
      }
      if (e === 'logout') {
        console.log('退出')
        this.logoutDialogVisible = true
      }
    },
    // 确认退出登录
    logoutConfirm() {
      // this.$axios.post('/sacw-xj-admin/logout').then((res) => {
      //   console.log(res)
      // })
      this.logoutDialogVisible = false
      this.$message.success('已退出登录')
      this.$router.push('/')
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
      background-color: #333;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .header-left {
        font-size: 24px;
        color: #fff;
      }
      .header-right {
        display: flex;
        align-items: center;
        font-size: 20px;
        padding-right: 20px;
        .el-dropdown-link {
          cursor: pointer;
          color: #fff;
          font-size: 18px;
          &:hover {
            color: #409eff;
          }
        }
      }
    }
    .el-aside {
      background-color: #444;
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
