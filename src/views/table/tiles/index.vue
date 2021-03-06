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
      <el-table-column align="center" label="ID" min-width="50">
        <template slot-scope="scope">
          {{ scope.row.index }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="数据标识" min-width="200">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="缩放层级" min-width="130">
        <template slot-scope="scope">
          {{ scope.row.zoom }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="行编号" min-width="170">
        <template slot-scope="scope">
          {{ scope.row.row }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="列编号" min-width="170">
        <template slot-scope="scope">
          {{ scope.row.col }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="缩略图" min-width="240">
        <template slot-scope="scope">
          <el-image
            style="width: 60px; height: 60px"
            :src="getImageSrc(scope.row)"
            :fit="fit"
          />
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="300">
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
    <form-tiles :dialog-form-visible.sync="dialogFormVisible" :form-data="formData" :local-form-data="localFormData" />
    <el-pagination
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :page-size.sync="size"
      :current-page.sync="currentPage"
      :page-sizes="[7, 14]"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
  </div>
</template>

<script>
import { getTiles, deleteTiles } from '@/api/api-table-tiles'
import FormTiles from '@/views/form/components/form-tiles'
import GlobalUrl from '@/utils/GlobalUrl'

export default {
  components: { FormTiles },
  data() {
    return {
      list: null,
      listLoading: true,
      total: null,
      size: 7,
      currentPage: 1,
      fit: 'fill',
      dialogFormVisible: false,
      formData: {
      },
      localFormData: {
        index: 0,
        name: '',
        zoom: 0,
        row: 0,
        col: 0
      },
      extension: '.png'
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getTiles({ page: this.currentPage - 1, size: this.size }).then(response => {
        this.list = response.data.content
        this.total = response.data.totalElements
        this.listLoading = false
      })
    },
    getImageSrc(row) {
      return GlobalUrl.prefixUrl + '/indoor-management/Tiles/' + row.name + '/' + row.zoom +
          '/' + row.row + '/' + row.col + this.extension
    },
    // 瓦片序号到经纬度的换算，返回瓦片左上角经纬度
    // 注意返回纬度范围是[-85.0511, 85.0511]
    tile2lng(col, zoom) {
      return (col / Math.pow(2, zoom) * 360 - 180)
    },
    tile2lat(row, zoom) {
      const n = Math.PI - 2 * Math.PI * row / Math.pow(2, zoom)
      return (180 / Math.PI * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n))))
    },
    handleFind(row) {
      const lng = this.tile2lng(row.col, row.zoom)
      const lat = this.tile2lat(row.row, row.zoom)
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
        deleteTiles({ index: row.index }).then(() => {
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
      getTiles({ page: page - 1, size: this.size }).then(response => {
        this.list = response.data.content
      })
    },
    handleSizeChange(size) {
      if (this.currentPage === 1) {
        getTiles({ page: 0, size: size }).then(response => {
          this.list = response.data.content
        })
        return
      }
      if (this.currentPage * size <= this.total) {
        getTiles({ page: this.currentPage - 1, size: size }).then(response => {
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
