<template>
  <div class="container-article">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <my-bread>内容管理</my-bread>
      </div>
      <div class="text item">
        <el-form label-width="80px" size="small">
          <el-form-item label="状态：">
            <el-radio-group v-model="reqParams.status">
              <el-radio :label="null">全部</el-radio>
              <el-radio :label="0">草稿</el-radio>
              <el-radio :label="1">待审核</el-radio>
              <el-radio :label="2">审核通过</el-radio>
              <el-radio :label="3">审核失败</el-radio>
              <el-radio :label="4">已删除</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- <el-form-item label="频道：">
            <el-select v-model="reqParams.channel_id" placeholder="请选择" clearable>
              <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>-->
          <my-channel v-model="reqParams.channel_id"></my-channel>
          <el-form-item label="日期：">
            <el-date-picker
              v-model="dateArr"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="changeDate"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">筛选</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card style="margin-top:20px">
      <div slot="header">
        <span>根据筛选条件共查询到 {{total}} 条结果：</span>
      </div>
      <el-table :data="articles" style="width: 100%">
        <el-table-column label="封面">
          <template slot-scope="scop">
            <el-image :src="scop.row.cover.images[0]" style="width:150px;height:100px">
              <div slot="error" class="image-slot">
                <img src="../../assets/error.gif" width="150" height="100" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态" prop="status">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status===0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status===1">待审核</el-tag>
            <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status===3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status===4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle plain @click="edit(scope.row.id)"></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              plain
              @click="delArticle(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        background
        layout="prev, pager, next"
        :total="total"
        style="margin-top:20px"
        @current-change="pager"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
// import axios from 'axios';
export default {
  data () {
    return {
      reqParams: {
        status: null,
        channel_id: null,
        per_page: 20,
        page: 1,
        begin_pubdate: '',
        end_pubdate: ''
      },
      dateArr: [],
      options: [],
      articles: [],
      total: null
    }
  },
  methods: {
    async getOptions () {
      const {
        data: { data }
      } = await this.$http.get('channels')
      this.options = data.channels
    },
    async getArticles () {
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqParams })
      this.articles = data.results
      this.total = data.total_count
    },
    pager (newPage) {
      this.reqParams.page = newPage
      this.getArticles()
    },
    changeDate () {
      if (this.dateArr) {
        this.reqParams.begin_pubdate = this.dateArr[0]
        this.reqParams.end_pubdate = this.dateArr[1]
      } else {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
    },
    search () {
      if (this.reqParams.channel_id === '') this.reqParams.channel_id = null
      this.reqParams.page = 1
      this.getArticles()
    },
    edit (id) {
      this.$router.push({
        path: '/publish',
        query: {
          id
        }
      })
    },
    async delArticle (id) {
      await this.$http.delete(`articles/${id}`)
      this.$message.success('删除成功')
      this.getArticles()
    }
  },
  created () {
    this.getOptions()
    this.getArticles()
  }
}
</script>

<style scoped lang='less'>
.container-article {
  width: 100%;
  height: 100%;
}
</style>
