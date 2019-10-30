<template>
  <div class="container">
    <el-card>
      <img src="../../assets/logo_index.png" alt />
      <el-form ref="loginForm" status-icon :model="LoginForm" :rules="LoginRules">
        <el-form-item prop="mobile">
          <el-input v-model="LoginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="LoginForm.code"
            placeholder="请输入验证码"
            style="width:200px;margin-right:8px"
          ></el-input>
          <el-button type="primary" style="width:100px;padding-left:15px">发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%;" @click="loginCheck">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import loacl from '@/utils/local.js'

const checkMobile = (rule, value, callback) => {
  if (/^1[3-9]\d{9}$/.test(value)) {
    callback()
  } else {
    callback(new Error('手机号格式不对'))
  }
}

export default {
  data () {
    return {
      LoginForm: {
        mobile: '',
        code: ''
      },
      LoginRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '验证码是6位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    loginCheck () {
      this.$refs['loginForm'].validate(async valid => {
        if (valid) {
          // 如果验证成功
          // this.$http
          //   .post('authorizations', this.LoginForm)
          //   .then(res => {
          //     // 成功之后保存token res.data.data 这个就是token token在res的数据的data里面
          //     loacl.setUser(res.data.data)
          //     this.$router.push('/')
          //   })
          //   .catch(() => {
          //     this.$messag.error('手机或验证码错误')
          //   })
          try {
            const { data: { data } } = await this.$http.post('authorizations', this.LoginForm)
            loacl.setUser(data)
            this.$router.push('/')
          } catch (e) {
            this.$message.error('手机号或验证码错误')
          }
        }
      })
    }
  }
}
</script>

<style scoped lang='less'>
.container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  /* // 背景图尺寸：拆分写法 background-size
  // 组合写法：background:..... / 背景图尺寸(width,height)
  // 特殊写法：cover  等比例缩放铺满容器多余不显示  contain 等比例缩放完全显示在容器内 */
  background: url("../../assets/login_bg.jpg") no-repeat center / cover;
  .el-card {
    width: 350px;
    height: 350px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 200px;
      display: block;
      margin: 0 auto 30px;
    }
  }
}
</style>
