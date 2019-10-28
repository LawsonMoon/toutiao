<template>
  <el-container class="home_container">
    <el-aside :width="isToggle?'200px':'64px'">
      <div class="logo" :class="{smallLogo:!isToggle}"></div>
      <el-menu
        default-active="/"
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
        <el-dropdown>
          <span class="el-dropdown-link">
            <img src="../../assets/avatar.jpg" alt />
            <span class="uname">小红帽</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <i class="el-icon-setting"></i>个人设置
            </el-dropdown-item>
            <el-dropdown-item>
              <i class="el-icon-unlock"></i>退出登陆
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
export default {
  data () {
    return {
      isToggle: true
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
    }
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
