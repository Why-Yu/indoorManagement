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
      <el-table-column align="center" label="条带号" min-width="80">
        <template slot-scope="scope">
          {{ scope.row.band }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="行编号" min-width="80">
        <template slot-scope="scope">
          {{ scope.row.rowIndex }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="日期" min-width="120">
        <template slot-scope="scope">
          {{ scope.row.date }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="云量%" min-width="70">
        <template slot-scope="scope">
          {{ scope.row.cloud }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="经度(左上)" min-width="145">
        <template slot-scope="scope">
          {{ scope.row.longitude }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="纬度(左上)" min-width="145">
        <template slot-scope="scope">
          {{ scope.row.latitude }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="缩略图" min-width="90">
        <template slot-scope="scope">
          <el-image
            style="width: 80px; height: 80px"
            :src="getImageSrc(scope.row)"
            :fit="fit"
          />
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="275">
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
    <form-remote-image :dialog-form-visible.sync="dialogFormVisible" :form-data="formData" :local-form-data="localFormData" />
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
import { getRemoteImage, deleteRemoteImage } from '@/api/api-table-remoteImage'
import FormRemoteImage from '@/views/form/components/form-remote-image'
import GlobalUrl from '@/utils/GlobalUrl'

export default {
  components: { FormRemoteImage },
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
        band: 0,
        rowIndex: 0,
        date: '',
        cloud: '',
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
      getRemoteImage({ page: this.currentPage - 1, size: this.size }).then(response => {
        this.list = response.data.content
        this.total = response.data.totalElements
        this.listLoading = false
      })
    },
    getImageSrc(row) {
      return GlobalUrl.prefixUrl + '/indoor-management/RemoteImage/' + row.index
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
        deleteRemoteImage({ index: row.index }).then(() => {
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
      getRemoteImage({ page: page - 1, size: this.size }).then(response => {
        this.list = response.data.content
      })
    },
    handleSizeChange(size) {
      if (this.currentPage === 1) {
        getRemoteImage({ page: 0, size: size }).then(response => {
          this.list = response.data.content
        })
        return
      }
      if (this.currentPage * size <= this.total) {
        getRemoteImage({ page: this.currentPage - 1, size: size }).then(response => {
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
