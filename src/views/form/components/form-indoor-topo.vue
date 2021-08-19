<template>
  <el-dialog title="编辑菜单" :visible="dialogFormVisible" :before-close="handleClose">
    <el-form :model="localFormData">
      <el-form-item label="ID" :label-width="formLabelWidth">
        <el-input v-model="localFormData.index" :disabled="true" />
      </el-form-item>
      <el-form-item label="楼栋标号" :label-width="formLabelWidth">
        <el-input v-model="localFormData.buildId" />
      </el-form-item>
      <el-form-item label="起始点标号" :label-width="formLabelWidth">
        <el-input v-model="localFormData.beginId" />
      </el-form-item>
      <el-form-item label="起始点X" :label-width="formLabelWidth">
        <el-input v-model="localFormData.beginX" />
      </el-form-item>
      <el-form-item label="起始点Y" :label-width="formLabelWidth">
        <el-input v-model="localFormData.beginY" />
      </el-form-item>
      <el-form-item label="终止点标号" :label-width="formLabelWidth">
        <el-input v-model="localFormData.endId" />
      </el-form-item>
      <el-form-item label="终止点X" :label-width="formLabelWidth">
        <el-input v-model="localFormData.endX" />
      </el-form-item>
      <el-form-item label="终止点Y" :label-width="formLabelWidth">
        <el-input v-model="localFormData.endY" />
      </el-form-item>
      <el-form-item label="所属楼层" :label-width="formLabelWidth">
        <el-input v-model="localFormData.floor" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="clickNo">取 消</el-button>
      <el-button type="primary" @click="clickYes">上传编辑后内容</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { updateIndoorTopo } from '@/api/api-table-indoor-topo'

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
      updateIndoorTopo(this.formData).then(response => {
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

