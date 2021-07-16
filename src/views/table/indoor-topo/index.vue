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
          {{ scope.$index }}
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
          {{ scope.row.endX }}
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
import { getIndoorTopo, createIndoorTopo, deleteIndoorTopo, updateIndoorTopo } from '@/api/api-table-indoor-topo'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      total: null,
      size: 10,
      currentPage: 1
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getIndoorTopo({ page: this.currentPage - 1, size: this.size }).then(response => {
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
      getIndoorTopo({ page: page - 1, size: this.size }).then(response => {
        this.list = response.data.items
      })
    },
    handleSizeChange(size) {
      if (this.currentPage === 1) {
        getIndoorTopo({ page: 0, size: size }).then(response => {
          this.list = response.data.items
        })
        return
      }
      if (this.currentPage * size <= this.total) {
        getIndoorTopo({ page: this.currentPage - 1, size: size }).then(response => {
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

