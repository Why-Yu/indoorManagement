<template>
  <el-dialog title="编辑菜单" :visible="dialogFormVisible" :before-close="handleClose">
    <el-form :model="localFormData">
      <el-form-item label="ID" :label-width="formLabelWidth">
        <el-input v-model="localFormData.index" :disabled="true" />
      </el-form-item>
      <el-form-item label="名称" :label-width="formLabelWidth">
        <el-input v-model="localFormData.name" />
      </el-form-item>
      <el-form-item label="x" :label-width="formLabelWidth">
        <el-input v-model="localFormData.x" />
      </el-form-item>
      <el-form-item label="y" :label-width="formLabelWidth">
        <el-input v-model="localFormData.y" />
      </el-form-item>
      <el-form-item label="h" :label-width="formLabelWidth">
        <el-input v-model="localFormData.h" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="clickNo">取 消</el-button>
      <el-button type="primary" @click="clickYes">上传编辑后内容</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { updateWifi } from '@/api/api-table-wifi'

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
      updateWifi(this.formData).then(response => {
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

