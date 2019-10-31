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
          <el-form-item label="频道：">
            <el-select v-model="reqParams.optionid" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日期：">
            <el-date-picker
              v-model="reqParams.dateArr"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">筛选</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      reqParams: {
        status: null,
        optionid: '',
        dateArr: []
      },
      options: [{ value: 1, label: 'java' }, { value: 2, label: '前端' }]
    }
  }
}
</script>

<style scoped lang='less'>
.container-article {
  width: 100%;
  height: 100%;
}
</style>
