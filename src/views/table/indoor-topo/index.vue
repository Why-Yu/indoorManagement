<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :header-cell-style="{background:'#F2F9FF', 'text-align':'center'}"
      stripe
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" min-width="40">
        <template slot-scope="scope">
          {{ scope.row.index }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="楼栋标号" min-width="70">
        <template slot-scope="scope">
          {{ scope.row.buildId }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="起始点标号" min-width="95">
        <template slot-scope="scope">
          {{ scope.row.beginId }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="起始点X" min-width="160">
        <template slot-scope="scope">
          {{ scope.row.beginX }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="起始点Y" min-width="160">
        <template slot-scope="scope">
          {{ scope.row.beginY }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="终止点标号" min-width="95">
        <template slot-scope="scope">
          {{ scope.row.endId }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="终止点X" min-width="160">
        <template slot-scope="scope">
          {{ scope.row.endX }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="终止点Y" min-width="160">
        <template slot-scope="scope">
          {{ scope.row.endY }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="所属楼层" min-width="50">
        <template slot-scope="scope">
          {{ scope.row.floor }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="275">
        <template slot-scope="scope">
          <el-button icon="el-icon-search" size="small" round @click="handleFind(scope.row)">
            查看
          </el-button>
          <el-button type="primary" icon="el-icon-edit" size="small" round @click="handleEdit(scope.row)">
            编辑
          </el-button>
          <el-button type="danger" icon="el-icon-delete" size="small" round @click="handleDelete(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <form-indoor-topo :dialog-form-visible.sync="dialogFormVisible" :form-data="formData" :local-form-data="localFormData" />
    <el-pagination
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :page-size.sync="size"
      :current-page.sync="currentPage"
      :page-sizes="[10, 20]"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
  </div>
</template>

<script>
import { getIndoorTopo, createIndoorTopo, deleteIndoorTopo } from '@/api/api-table-indoor-topo'
import FormIndoorTopo from '@/views/form/components/form-indoor-topo'

export default {
  components: { FormIndoorTopo },
  data() {
    return {
      list: null,
      listLoading: true,
      total: null,
      size: 10,
      currentPage: 1,
      dialogFormVisible: false,
      formData: {
      },
      localFormData: {
        index: 0,
        buildId: '',
        beginId: '',
        beginX: 0,
        beginY: 0,
        endId: '',
        endX: 0,
        endY: 0,
        floor: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getIndoorTopo({ page: this.currentPage - 1, size: this.size }).then(response => {
        this.list = response.data.content
        this.total = response.data.totalElements
        this.listLoading = false
      })
    },
    handleFind(row) {
      // 墨卡托到经纬度换算
      const lng = row.beginX / 20037508.34 * 180
      let lat = row.beginY / 20037508.34 * 180
      lat = 180 / Math.PI * (2 * Math.atan(Math.exp(lat * Math.PI / 180)) - Math.PI / 2)
      this.$store.commit('cesium/SET_COORDINATES', { latitude: lat, longitude: lng })
      this.$router.push({ path: '/cesium/index' })
    },
    handleEdit(row) {
      this.dialogFormVisible = true
      this.formData = row
      Object.assign(this.localFormData, row)
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteIndoorTopo({ index: row.index }).then(() => {
          this.fetchData()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleCurrentChange(page) {
      getIndoorTopo({ page: page - 1, size: this.size }).then(response => {
        this.list = response.data.content
      })
    },
    handleSizeChange(size) {
      if (this.currentPage === 1) {
        getIndoorTopo({ page: 0, size: size }).then(response => {
          this.list = response.data.content
        })
        return
      }
      if (this.currentPage * size <= this.total) {
        getIndoorTopo({ page: this.currentPage - 1, size: size }).then(response => {
          this.list = response.data.content
        })
      }
    }
  }
}
</script>

<style scoped>
.el-pagination {
  text-align: center;
}
</style>

