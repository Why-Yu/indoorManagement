<template>
  <div>
    <el-form ref="ruleForm" :model="localFormData" :rules="rules">
      <el-form-item
        label="DEM名称"
        :label-width="formLabelWidth"
        prop="name"
      >
        <el-input v-model="localFormData.name" />
      </el-form-item>
      <el-form-item
        label="条带号"
        :label-width="formLabelWidth"
        prop="band"
      >
        <el-input v-model="localFormData.band" />
      </el-form-item>
      <el-form-item
        label="行编号"
        :label-width="formLabelWidth"
        prop="rowIndex"
      >
        <el-input v-model="localFormData.rowIndex" />
      </el-form-item>
      <el-form-item
        label="经度"
        :label-width="formLabelWidth"
        prop="longitude"
      >
        <el-input v-model="localFormData.longitude" />
      </el-form-item>
      <el-form-item
        label="纬度"
        :label-width="formLabelWidth"
        prop="latitude"
      >
        <el-input v-model="localFormData.latitude" />
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
        :multiple="false"
        :on-success="fileSuccessUpLoad"
      >
        <el-button slot="trigger" size="medium" type="primary">选取文件</el-button>
        <div slot="tip" class="tooltip">已选择{{ type }}, 注意:请上传.img.zip格式的文件, 限制大小2G</div>
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
      default: 'Dem'
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
          { required: true, message: '请输入DEM名称', trigger: 'blur' }
        ],
        band: [
          { required: true, message: '请输入条带号', trigger: 'blur' }
        ],
        rowIndex: [
          { required: true, message: '请输入行编号', trigger: 'blur' }
        ],
        longitude: [
          { required: true, message: '请输入经度', trigger: 'blur' }
        ],
        latitude: [
          { required: true, message: '请输入纬度', trigger: 'blur' }
        ]
      },
      fileList: [],
      accept: {
        Dem: '.img.zip'
      },
      localFormData: {
        name: '',
        band: null,
        rowIndex: null,
        longitude: null,
        latitude: null
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

