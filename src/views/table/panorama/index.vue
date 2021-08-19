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
      <el-table-column align="center" label="数据集名称" min-width="130">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="存储路径" min-width="150">
        <template slot-scope="scope">
          {{ scope.row.path }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="全景缩略图" min-width="270">
        <template slot-scope="scope">
          <el-image
            style="width: 256px; height: 128px"
            :src="getImageSrc(scope.row)"
            :fit="fit"
          />
        </template>
      </el-table-column>
      <el-table-column align="center" label="经度" min-width="130">
        <template slot-scope="scope">
          {{ scope.row.longitude }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="纬度" min-width="130">
        <template slot-scope="scope">
          {{ scope.row.latitude }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="280">
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
    <form-panorama :dialog-form-visible.sync="dialogFormVisible" :form-data="formData" :local-form-data="localFormData" />
    <el-pagination
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :page-size.sync="size"
      :current-page.sync="currentPage"
      :page-sizes="[5, 10]"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
  </div>
</template>

<script>
import { getPanorama, deletePanorama } from '@/api/api-table-panorama'
import FormPanorama from '@/views/form/components/form-panorama'
import GlobalUrl from '@/utils/GlobalUrl'

export default {
  components: { FormPanorama },
  data() {
    return {
      list: null,
      listLoading: true,
      total: null,
      size: 5,
      currentPage: 1,
      fit: 'fill',
      dialogFormVisible: false,
      formData: {
      },
      localFormData: {
        index: 0,
        name: '',
        path: '',
        longitude: 0,
        latitude: 0
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getPanorama({ page: this.currentPage - 1, size: this.size }).then(response => {
        this.list = response.data.content
        this.total = response.data.totalElements
        this.listLoading = false
      })
    },
    getImageSrc(row) {
      return GlobalUrl.prefixUrl + '/indoor-management/Panorama/' + row.index
    },
    handleFind(row) {
      this.$store.commit('cesium/SET_COORDINATES', { latitude: row.latitude, longitude: row.longitude })
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
        deletePanorama({ index: row.index }).then(() => {
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
      getPanorama({ page: page - 1, size: this.size }).then(response => {
        this.list = response.data.content
      })
    },
    handleSizeChange(size) {
      if (this.currentPage === 1) {
        getPanorama({ page: 0, size: size }).then(response => {
          this.list = response.data.content
        })
        return
      }
      if (this.currentPage * size <= this.total) {
        getPanorama({ page: this.currentPage - 1, size: size }).then(response => {
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

