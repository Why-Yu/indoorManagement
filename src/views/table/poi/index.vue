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
      <el-table-column align="center" label="省份" min-width="140">
        <template slot-scope="scope">
          {{ scope.row.province }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="城市" min-width="115">
        <template slot-scope="scope">
          {{ scope.row.city }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="区域" min-width="115">
        <template slot-scope="scope">
          {{ scope.row.area }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="类别" min-width="100">
        <template slot-scope="scope">
          {{ scope.row.type }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="名称" min-width="150">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="经度" min-width="160">
        <template slot-scope="scope">
          {{ scope.row.longitude }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="纬度" min-width="160">
        <template slot-scope="scope">
          {{ scope.row.latitude }}
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
    <el-pagination
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :page-size.sync="size"
      :current-page.sync="currentPage"
      :page-sizes="[9, 18]"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
  </div>
</template>

<script>
import { getPoi, createPoi, deletePoi, updatePoi } from '@/api/api-table-poi'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      total: null,
      size: 9,
      currentPage: 1
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getPoi({ page: this.currentPage - 1, size: this.size }).then(response => {
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
      getPoi({ page: page - 1, size: this.size }).then(response => {
        this.list = response.data.items
      })
    },
    handleSizeChange(size) {
      if (this.currentPage === 1) {
        getPoi({ page: 0, size: size }).then(response => {
          this.list = response.data.items
        })
        return
      }
      if (this.currentPage * size <= this.total) {
        getPoi({ page: this.currentPage - 1, size: size }).then(response => {
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
