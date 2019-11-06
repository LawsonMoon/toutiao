<template>
  <div class="my-image">
    <div class="btn_box" @click="open">
      <img :src="value||defaultImage" alt />
    </div>
    <el-dialog :visible.sync="dialogVisible" width="750px">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image">
          <!-- 全部与收藏 -->
          <!-- label 指定选中当前单选框的值 -->
          <el-radio-group @change="toggleList" v-model="reqParams.collect" size="small">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
          <!-- 素材区域 -->
          <div class="img_list">
            <div
              class="img_item"
              :class="{selected:selectedImageUrl===item.url}"
              @click="selectedImage(item.url)"
              v-for="item in images"
              :key="item.id"
            >
              <img :src="item.url" />
            </div>
          </div>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="reqParams.per_page"
            :current-page="reqParams.page"
            @current-change="pager"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
          <!-- 上传组件 -->
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :headers="headers"
            name="image"
            :on-success="handleSuccess"
            :show-file-list="false"
          >
            <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImage">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import local from '../utils/local'
import defaultImage from '../assets/default.png'

export default {
  // value 在发布文章的时候没有值，编辑的时候才有图片数据。
  props: ['value'],
  name: 'my-image',
  data () {
    return {
      selectedImageUrl: null,
      // 控制对话框显示与隐藏
      dialogVisible: false,
      // 当前激活选项卡的name的值
      activeName: 'image',
      reqParams: {
        collect: false,
        per_page: 8,
        page: 1
      },
      images: [],
      // 总条数
      total: 0,
      headers: {
        Authorization: `Bearer ${local.getUser().token}`
      },
      // 当前上传的图片地址
      uploadImageUrl: null,
      defaultImage
    }
  },
  methods: {
    open () {
      this.dialogVisible = true
    },
    // 切换 全部与收藏 列表
    toggleList () {
      this.reqParams.page = 1
      this.getImages()
    },
    async getImages () {
      // 获取数据
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      // 赋值给images
      this.images = data.results
      // 总条数赋值
      this.total = data.total_count
    },
    // 分页
    pager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    selectedImage (url) {
      this.selectedImageUrl = url
    },
    // 上传成功
    handleSuccess (res) {
      // 预览
      this.uploadImageUrl = res.data.url
      // 提示
      this.$message.success('上传成功')
    },
    confirmImage () {
      if (this.activeName === 'image') {
        if (!this.selectedImageUrl) {
          return this.$message.warning('请选中一张图片')
        }

        // 给img的src赋值图片地址
        this.defaultImage = this.selectedImageUrl
        this.$emit('input', this.defaultImage)
        this.dialogVisible = false
      } else {
        if (!this.uploadImageUrl) {
          return this.$message.warning('请上传一张图片')
        }
        // 给img的src赋值图片地址
        this.defaultImage = this.uploadImageUrl
        this.$emit('input', this.defaultImage)
        this.dialogVisible = false
      }
    }
  },
  created () {
    this.getImages()
  }
}
</script>

<style lang="less" scoped>
.btn_box {
  width: 150px;
  height: 150px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.dialog-footer {
  width: 100%;
  text-align: center;
  display: inline-block;
}
.img_list {
  margin-top: 20px;
  .img_item {
    width: 140px;
    height: 140px;
    border: 1px dashed #ddd;
    position: relative;
    display: inline-block;
    margin-right: 30px;
    margin-bottom: 20px;
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
    &.selected::after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.3) url(../assets/selected.png) no-repeat
        center / 50px 50px;
    }
  }
}
</style>
