<template>
  <div>
    <el-form ref="ruleForm" :model="localFormData" :rules="rules">
      <el-form-item
        label="建筑物标号BuildId"
        :label-width="formLabelWidth"
        prop="buildId"
      >
        <el-input v-model="localFormData.buildId" />
      </el-form-item>
      <el-form-item
        label="所属楼层Floor"
        :label-width="formLabelWidth"
        prop="floor"
      >
        <el-input v-model="localFormData.floor" />
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
        <div slot="tip" class="tooltip">已选择{{ type }}, 注意:请至少上传shapefile文件中必须的.shp .shx .dbf三类数据，缺一不可</div>
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
      default: 'IndoorTopo'
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
        buildId: [
          { required: true, message: '请输入建筑物标号', trigger: 'blur' }
        ],
        floor: [
          { required: true, message: '请输入所属楼层', trigger: 'blur' }
        ]
      },
      fileList: [],
      accept: {
        IndoorTopo: '.shp,.shx,.dbf,.prj,.qpj,.cpg'
      },
      localFormData: {
        buildId: '0',
        floor: '1'
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

