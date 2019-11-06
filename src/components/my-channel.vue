<template>
  <el-select :value="values" @change="fn" v-model="id" placeholder="请选择" clearable>
    <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'my-channel',
  props: ['values'],
  data () {
    return {
      id: null,
      options: []
    }
  },
  methods: {
    async getOptions () {
      const {
        data: { data }
      } = await this.$http.get('channels')
      this.options = data.channels
    },
    fn (id) {
      if (id === '') id = null
      this.$emit('input', id)
    }
  },
  created () {
    this.getOptions()
  }
}
</script>

<style>
</style>
