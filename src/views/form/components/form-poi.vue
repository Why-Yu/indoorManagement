<template>
  <el-dialog title="编辑菜单" :visible="dialogFormVisible">
    <el-form :model="formData">
      <el-form-item label="ID" :label-width="formLabelWidth">
        <el-input v-model="formData.index" :disabled="true" />
      </el-form-item>
      <el-form-item label="省份" :label-width="formLabelWidth">
        <el-input v-model="formData.province" />
      </el-form-item>
      <el-form-item label="城市" :label-width="formLabelWidth">
        <el-input v-model="formData.city" />
      </el-form-item>
      <el-form-item label="区域" :label-width="formLabelWidth">
        <el-input v-model="formData.area" />
      </el-form-item>
      <el-form-item label="类别" :label-width="formLabelWidth">
        <el-input v-model="formData.type" />
      </el-form-item>
      <el-form-item label="名称" :label-width="formLabelWidth">
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item label="经度" :label-width="formLabelWidth">
        <el-input v-model="formData.longitude" />
      </el-form-item>
      <el-form-item label="纬度" :label-width="formLabelWidth">
        <el-input v-model="formData.latitude" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="clickNo">取 消</el-button>
      <el-button type="primary" @click="clickYes">上传编辑后内容</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { updatePoi } from '@/api/api-table-poi'

export default {
  props: {
    formData: {
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
      updatePoi(this.formData).then(response => {
        this.$message({
          message: '上传成功',
          type: 'success'
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
