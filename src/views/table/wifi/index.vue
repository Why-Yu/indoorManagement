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
      <el-table-column align="center" label="名称" min-width="150">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="x" min-width="180">
        <template slot-scope="scope">
          {{ scope.row.x }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="y" min-width="180">
        <template slot-scope="scope">
          {{ scope.row.y }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="h" min-width="180">
        <template slot-scope="scope">
          {{ scope.row.h }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="300">
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
    <form-wifi :dialog-form-visible.sync="dialogFormVisible" :form-data="formData" :local-form-data="localFormData" />
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
import { getWifi, createWifi, deleteWifi } from '@/api/api-table-wifi'
import FormWifi from '@/views/form/components/form-wifi'

export default {
  name: 'Wifi',
  components: { FormWifi },
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
        name: '',
        x: 0,
        y: 0,
        h: 0
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getWifi({ page: this.currentPage - 1, size: this.size }).then(response => {
        this.list = response.data.content
        this.total = response.data.totalElements
        this.listLoading = false
      })
    },
    handleFind(row) {
      this.$store.commit('cesium/SET_COORDINATES', { latitude: 0, longitude: 0, type: this.type })
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
        deleteWifi({ index: row.index }).then(() => {
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
      getWifi({ page: page - 1, size: this.size }).then(response => {
        this.list = response.data.content
      })
    },
    handleSizeChange(size) {
      if (this.currentPage === 1) {
        getWifi({ page: 0, size: size }).then(response => {
          this.list = response.data.content
        })
        return
      }
      if (this.currentPage * size <= this.total) {
        getWifi({ page: this.currentPage - 1, size: size }).then(response => {
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

