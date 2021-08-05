<template>
  <div>
    <el-form ref="ruleForm" :model="localFormData" :rules="rules">
      <el-form-item
        label="瓦片集名称"
        :label-width="formLabelWidth"
        prop="name"
      >
        <el-input v-model="localFormData.name" />
      </el-form-item>
      <el-form-item
        label="缩放层级"
        :label-width="formLabelWidth"
        prop="zoom"
      >
        <el-input v-model="localFormData.zoom" />
      </el-form-item>
      <el-form-item
        label="行编号"
        :label-width="formLabelWidth"
        prop="row"
      >
        <el-input v-model="localFormData.row" />
      </el-form-item>
      <el-form-item
        label="列编号"
        :label-width="formLabelWidth"
        prop="col"
      >
        <el-input v-model="localFormData.col" />
      </el-form-item>
    </el-form>
    <div class="uploadWrapper">
      <el-upload
        ref="upload"
        :action="getUploadPath(type)"
        :file-list="fileList"
        :auto-upload="false"
        :accept="getExtension(type)"
        :data="localFormData"
        :multiple="true"
        :on-success="fileSuccessUpLoad"
      >
        <el-button slot="trigger" size="medium" type="primary">选取文件</el-button>
        <div slot="tip" class="tooltip">已选择{{ type }}, 注意:请上传png格式的文件</div>
      </el-upload>
      <el-button id="upload" size="medium" type="success" plain @click="submitUpload">上传到服务器</el-button>
      <el-button id="pre" size="medium" type="primary" plain @click="pre">上一步</el-button>
    </div>
  </div>
</template>

<script>
import GlobalUrl from '@/utils/GlobalUrl'

export default {
  props: {
    type: {
      type: String,
      default: 'Tiles'
    },
    active: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      formLabelWidth: '140px',
      rules: {
        name: [
          { required: true, message: '请输入瓦片集名称', trigger: 'blur' }
        ],
        zoom: [
          { required: true, message: '请输入缩放层级', trigger: 'blur' }
        ],
        row: [
          { required: true, message: '请输入行编号', trigger: 'blur' }
        ],
        col: [
          { required: true, message: '请输入列编号', trigger: 'blur' }
        ]
      },
      fileList: [],
      accept: {
        Tiles: '.png'
      },
      localFormData: {
        name: 'GlobalTiles',
        zoom: '',
        row: '',
        col: ''
      }
    }
  },
  methods: {
    pre() {
      this.$emit('update:active', this.active - 1)
    },
    submitUpload() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$refs.upload.submit()
          this.$emit('update:active', this.active + 1)
        } else {
          this.$message.error('表单参数有误')
        }
      })
    },
    fileSuccessUpLoad() {
      this.$refs.upload.clearFiles()
      this.$message({
        message: '上传成功',
        type: 'success'
      })
    },
    getExtension(type) {
      return this.accept[type]
    },
    getUploadPath(type) {
      return GlobalUrl.prefixUrl + '/indoor-management/' + type + '/importData'
    }
  }
}
</script>

<style scoped>
#pre {
  margin-right: 20px;
  margin-bottom: 10px;
  float: right;
}

#upload {
  margin-bottom: 10px;
  float: right;
}

.uploadWrapper {
  margin-top: 30px;
}

/*el-form-item中又嵌套了一个el-form，默认的margin-bottom变成了0px，这里手动调一下*/
.el-form-item {
  margin-bottom: 22px;
}

.tooltip {
  color: #67C23A;
  font-size: 1.2em;
}
</style>

