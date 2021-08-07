<template>
  <div>
    <el-form ref="ruleForm" :model="localFormData" :rules="rules">
      <el-form-item
        label="3dTiles名称"
        :label-width="formLabelWidth"
        prop="name"
      >
        <el-input v-model="localFormData.name" />
      </el-form-item>
    </el-form>
    <div class="uploadWrapper">
      <el-upload
        ref="upload"
        :action="getUploadPath(type)"
        :file-list="fileList"
        :auto-upload="false"
        :data="localFormData"
        :multiple="true"
        :on-success="handleSuccess"
        :on-change="handleChange"
        :on-remove="handleRemove"
      >
        <el-button slot="trigger" size="medium" type="primary">选取文件</el-button>
        <div slot="tip" class="tooltip">已选择3dTiles, 注意:请选择需要上传的3dTiles的根目录，系统会自行解析所有子文件, 限制大小2G</div>
      </el-upload>
      <el-button id="upload" size="medium" type="success" plain @click="submitUpload">上传到服务器</el-button>
      <el-button id="pre" size="medium" type="primary" plain @click="pre">上一步</el-button>
    </div>
  </div>
</template>

<script>
import { importData } from '@/api/api-table-3dTiles'
import GlobalUrl from '@/utils/GlobalUrl'

export default {
  props: {
    type: {
      type: String,
      default: 'TdTiles'
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
        ]
      },
      fileList: [],
      localFormData: {
        name: ''
      },
      isUploadFlag: false
    }
  },
  mounted() {
    this.$nextTick(() => {
      // 强行开启目录上传，同时为了实现一次请求上传，后续带来了花了好久才解决的bug
      document.getElementsByClassName('el-upload__input')[0].webkitdirectory = true
    })
  },
  methods: {
    pre() {
      this.$emit('update:active', this.active - 1)
    },
    submitUpload() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          // this.$refs.upload.submit()
          // 目录上传以后，后端接受到的文件名就是按照webkitRelativePath生成的
          // 所以无需在参数中加入relativePath
          const formData = new FormData()
          this.fileList.forEach(file => {
            formData.append('file', file.raw)
          })
          formData.append('name', this.localFormData.name)
          importData(formData).then(() => {
            // 手动清空fileList，不再用this.$refs.upload.clearFiles()
            // 因为这里把所有file在一次请求中上传，但http-request仍会调用fileList.size()次，不太方便在里面的回调中调用onSuccess
            this.fileList = []
          })
          this.$emit('update:active', this.active + 1)
        } else {
          this.$message.error('表单参数有误')
        }
      })
    },
    handleSuccess() {
      // 这个函数其实不会执行
      this.$refs.upload.clearFiles()
      this.$message({
        message: '上传成功',
        type: 'success'
      })
    },

    handleChange(file, fileList) {
      this.fileList = fileList
    },
    handleRemove(file, fileList) {
      this.fileList = fileList
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

