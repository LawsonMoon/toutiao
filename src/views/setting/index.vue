<template>
  <div class="container-setting">
    <el-card>
      <div slot="header">
        <my-bread>个人设置</my-bread>
      </div>
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-form ref="form" :model="userInfo" label-width="80px">
              <el-form-item label="编号">{{userInfo.id}}</el-form-item>
              <el-form-item label="手机号">{{userInfo.mobile}}</el-form-item>
              <el-form-item label="媒体名称">
                <el-input v-model="userInfo.name"></el-input>
              </el-form-item>
              <el-form-item label="媒体介绍">
                <el-input type="textarea" :rows="3" v-model="userInfo.intro"></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="userInfo.email"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveInfo">保存设置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <el-upload
              class="avatar-uploader"
              action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
              :show-file-list="false"
              :http-request="updatePhoto"
            >
              <img v-if="userInfo.photo" :src="userInfo.photo" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <p style="text-align:center">修改头像</p>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import event from '@/eventBus.js'
import local from '../../utils/local'
export default {
  data () {
    return {
      userInfo: {
        id: null,
        mobile: null,
        name: null,
        intro: null,
        email: null,
        photo: null
      },
      photo: null
    }
  },
  methods: {
    async getInfo () {
      const { data: { data } } = await this.$http.get('user/profile')
      this.userInfo = data
    },
    async saveInfo () {
      await this.$http.patch('user/profile', {
        name: this.userInfo.name,
        intro: this.userInfo.intro,
        email: this.userInfo.email
      })

      this.$message.success('保存成功')

      event.$emit('updateName', this.userInfo.name)
      const user = local.getUser()
      user.name = this.userInfo.name
      local.setUser(user)
    },
    async updatePhoto (res) {
      // 选择文件后触发当前函数，默认传入一个选择后的结果（包含文件信息）
      // 1. 获取图片文件数据
      const file = res.file
      // 2. 创建一个formData
      const formData = new FormData()
      // 3. 追加图片数据到fromData  字段名字和后台一致
      formData.append('photo', file)
      // 4. 使用axios提交数据
      const { data: { data } } = await this.$http.patch('user/photo', formData)
      // 5. 拿着上传成功后的地址进行预览
      this.userInfo.photo = data.photo
      // 6. 提示
      this.$message.success('修改头像成功')
      // 7. 更新home组件的photo
      event.$emit('updatePhoto', this.userInfo.photo)
      // 8. 更新本地存储的photo
      const user = local.getUser()
      user.photo = data.photo
      local.setUser(user)
    }
  },
  created () {
    this.getInfo()
  }
}
</script>

<style>
</style>
