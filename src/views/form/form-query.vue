<template>
  <div>
    <el-form
      label-width="150px"
      :inline="true"
      style="width: 70%; margin: auto; margin-top: 50px"
    >
      <el-form-item label="建筑名称">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="query">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border style="width: 70%; margin: auto">
      <el-table-column prop="index" label="序号" width="100" />
      <el-table-column prop="type" label="类型" width="180" />
      <el-table-column prop="floor" label="楼层" width="180" />
      <el-table-column prop="path" label="路径" />
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [],
      value: '',
      tableData: [],
      infos: null
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    getInfo() {
      // this.$axios.get('/infos').then(response => {
      this.$axios.get(this.$request_url + '/infos').then(response => {
        console.log('res', response)
        this.infos = response.data
        const bids = response.data
        var option = {}
        for (var i = 0; i < bids.length; i++) {
          option = {
            value: i.toString(),
            label: bids[i].bid
          }
          this.options.push(option)
        }
      })
    },
    query() {
      var features = this.infos[parseInt(this.value)].features
      var obj
      for (var i = 0; i < features.length; i++) {
        obj = {
          index: i + 1,
          type: features[i].type,
          floor: features[i].fid,
          path: features[i].path
        }
        this.tableData.push(obj)
      }
    }
  }
}
</script>

<style scoped>
</style>
