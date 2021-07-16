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
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="数据标识" min-width="210">
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
      <el-table-column align="center" label="云量" min-width="70">
        <template slot-scope="scope">
          {{ scope.row.cloud }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="经度" min-width="155">
        <template slot-scope="scope">
          {{ scope.row.longitude }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="纬度" min-width="155">
        <template slot-scope="scope">
          {{ scope.row.latitude }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="缩略图" min-width="80">
        <template slot-scope="scope">
          <el-image
            :src="scope.row.image"
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
import { getRemoteImage, createRemoteImage, deleteRemoteImage, updateRemoteImage } from '@/api/api-table-remoteImage'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      total: null,
      size: 7,
      currentPage: 1,
      fit: 'fill'
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getRemoteImage({ page: this.currentPage - 1, size: this.size }).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleFind(row) {

    },
    handleEdit(row) {

    },
    handleDelete(row) {

    },
    handleCurrentChange(page) {
      getRemoteImage({ page: page - 1, size: this.size }).then(response => {
        this.list = response.data.items
      })
    },
    handleSizeChange(size) {
      if (this.currentPage === 1) {
        getRemoteImage({ page: 0, size: size }).then(response => {
          this.list = response.data.items
        })
        return
      }
      if (this.currentPage * size <= this.total) {
        getRemoteImage({ page: this.currentPage - 1, size: size }).then(response => {
          this.list = response.data.items
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
