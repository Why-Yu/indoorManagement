<template>
  <el-dialog title="编辑菜单" :visible="dialogFormVisible" :before-close="handleClose">
    <el-form :model="localFormData">
      <el-form-item label="ID" :label-width="formLabelWidth">
        <el-input v-model="localFormData.index" :disabled="true" />
      </el-form-item>
      <el-form-item label="数据标识" :label-width="formLabelWidth">
        <el-input v-model="localFormData.name" />
      </el-form-item>
      <el-form-item label="条带号" :label-width="formLabelWidth">
        <el-input v-model="localFormData.band" />
      </el-form-item>
      <el-form-item label="行编号" :label-width="formLabelWidth">
        <el-input v-model="localFormData.rowIndex" />
      </el-form-item>
      <el-form-item label="经度" :label-width="formLabelWidth">
        <el-input v-model="localFormData.longitude" />
      </el-form-item>
      <el-form-item label="纬度" :label-width="formLabelWidth">
        <el-input v-model="localFormData.latitude" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="clickNo">取 消</el-button>
      <el-button type="primary" @click="clickYes">上传编辑后内容</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { updateDem } from '@/api/api-table-dem'

export default {
  props: {
    formData: {
      type: Object,
      default: function() {
        return {
        }
      }
    },
    localFormData: {
      type: Object,
      default: function() {
        return {
        }
      }
    },
    dialogFormVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formLabelWidth: '120px'
    }
  },
  methods: {
    clickNo() {
      this.$emit('update:dialogFormVisible', false)
    },
    clickYes() {
      this.$emit('update:dialogFormVisible', false)
      Object.assign(this.formData, this.localFormData)
      updateDem(this.formData).then(response => {
        this.$message({
          message: '编辑成功',
          type: 'success'
        })
      })
    },
    handleClose() {
      this.$emit('update:dialogFormVisible', false)
    }
  }
}
</script>

<style scoped>

</style>

