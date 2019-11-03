<template>
  <div class="container_image">
    <el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <div class="btn_box">
        <!-- 全部与收藏 -->
        <!-- label 指定选中当前单选框的值 -->
        <el-radio-group @change="toggleList" v-model="reqparams.collect" size="small">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button style="float:right" type="success" size="small" @click="open">添加素材</el-button>
      </div>
      <div class="img_list">
        <div class="img_item" v-for="item in images" :key="item.id">
          <img :src="item.url" alt />
          <div class="footer">
            <span
              @click="changeCollect(item)"
              class="el-icon-star-off"
              :class="{red:item.is_collected}"
            ></span>
            <span @click="delImage(item.id)" class="el-icon-delete"></span>
          </div>
        </div>
        <el-dialog title="添加素材" :visible.sync="dialogVisible" width="300px">
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :headers="headers"
            :show-file-list="false"
            :on-success = 'handleImage'
            name="image"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-dialog>
      </div>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqparams.per_page"
        :current-page="reqparams.page"
        @current-change="pager"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import local from '../../utils/local'

export default {
  data () {
    return {
      reqparams: {
        collect: false,
        page: 1,
        per_page: 10
      },
      images: [],
      total: 0,
      dialogVisible: false,
      imageUrl: null,
      headers: {
        Authorization: `Bearer ${local.getUser().token}`
      }
    }
  },
  methods: {
    // 获取素材列表
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', {
        params: this.reqparams
      })
      this.images = data.results
      this.total = data.total_count
    },
    // 切换分页
    pager (newPge) {
      this.reqparams.page = newPge
      this.getImages()
    },
    // 切换列表
    toggleList () {
      // 切换的时候 切换到第一页
      this.reqparams.page = 1
      this.getImages()
    },
    // 收藏和取消收藏按钮
    async changeCollect (item) {
      const {
        data: { data }
      } = await this.$http.put(`user/images/${item.id}`, {
        collect: !item.is_collected
      })
      item.is_collected = data.collect
      this.$message.success(data.collect ? '添加收藏成功' : '取消收藏成功')
    },
    // 删除素材
    async delImage (id) {
      // 显示确认框
      this.$confirm('此操作将永久删除该图片, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // 点击了确认
          // 1. 发请求
          await this.$http.delete(`user/images/${id}`)
          // 2. 提示
          this.$message.success('删除成功')
          // 3. 更新列表
          this.getImages()
        })
        .catch(() => {
          // 点击了取消
        })
    },
    // 上传图片
    handleImage (res) {
      this.imageUrl = res.data.url
      this.$message.success('上传成功')
      window.setTimeout(() => {
        this.dialogVisible = false
        this.getImages()
      }, 2000)
    },
    // 打开上传弹窗 清空图片
    open () {
      this.dialogVisible = true
      this.imageUrl = null
    }
  },
  created () {
    this.getImages()
  }
}
</script>

<style lang="less" scoped>
.img_list {
  margin-top: 20px;
  .img_item {
    width: 180px;
    height: 180px;
    // float: left;
    border: 1px dashed #ddd;
    margin-right: 30px;
    margin-bottom: 20px;
    position: relative;
    display: inline-block;
    img {
      width: 100%;
      height: 100%;
    }
    .footer {
      width: 100%;
      height: 30px;
      line-height: 30px;
      background: rgba(0, 0, 0, 0.3);
      color: #fff;
      position: absolute;
      left: 0;
      bottom: 0;
      text-align: center;
      // span .red{} 选择器无效
      // span.red{} 选择器有效  &连接符
      span {
        margin: 0 20px;
        &.red {
          color: red;
        }
      }
    }
  }
}
</style>>
