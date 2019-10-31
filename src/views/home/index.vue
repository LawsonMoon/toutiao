<template>
  <el-container class="home_container">
    <el-aside :width="isToggle?'200px':'64px'">
      <div class="logo" :class="{smallLogo:!isToggle}"></div>
      <el-menu
        :default-active="$route.path"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        style="border-right:none"
        :collapse="!isToggle"
        :collapse-transition="false"
        router
      >
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <span class="el-icon-s-fold ico" @click="toggleMenu"></span>
        <!-- 文字 -->
        <span class="text">江苏传智播客科技教育有限公司</span>
        <el-dropdown @command="handleClick">
          <span class="el-dropdown-link">
            <img :src="phtot" alt />
            <span class="uname">{{uname}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting" command="setting">个人设置
            </el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock" command='logout'>退出登陆
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import local from '@/utils/local'
export default {
  data () {
    return {
      isToggle: true,
      uname: '',
      phtot: ''
    }
  },
  methods: {
    toggleMenu () {
      //   if (this.isToggle) {
      //     this.isToggle = false
      //   } else {
      //     this.isToggle = true
      //   }
      this.isToggle = !this.isToggle
    },
    // 绑定的click事件无效
    // 给的是element-ui提供的组件绑定的click事件，如果组件不支持click事件，无法触发。
    // 组件不支持，给组件解析后的DOM绑定事件
    // vue提供了事件修饰符功能，prevent once stop --- native 把事件绑定在原生DOM上
    setting () {
      this.$router.push('/setting')
    },
    logout () {
      local.delUser()
      this.$router.push('/login')
    },
    handleClick (command) {
      this[command]()
    }
  },
  created () {
    const user = local.getUser() || {}
    this.uname = user.name
    this.phtot = user.photo
  }
}
</script>

<style scoped lang='less'>
.home_container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  .el-aside {
    background-color: #002033;
    .logo {
      width: 100%;
      height: 60px;
      background: #002244 url(../../assets/logo_admin.png) no-repeat center /
        140px auto;
    }
    .smallLogo {
      background-image: url("../../assets/logo_admin_01.png");
      background-size: 36px auto;
    }
  }
  .el-header {
    border-bottom: 1px solid #ddd;
    line-height: 60px;
    .ico {
      font-size: 30px;
      vertical-align: middle;
    }
    .text {
      margin-left: 10px;
      vertical-align: middle;
    }
    .el-dropdown {
      float: right;
      img {
        width: 40px;
        height: 40px;
        vertical-align: middle;
        border-radius: 50%;
      }
      .uname {
        margin-left: 5px;
        font-weight: bold;
        vertical-align: middle;
      }
    }
  }
}
</style>
