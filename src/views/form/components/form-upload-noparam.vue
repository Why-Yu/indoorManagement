<template>
  <div>
    <el-upload
      ref="upload"
      :action="getUploadPath(type)"
      :file-list="fileList"
      :auto-upload="false"
      :accept="getExtension(type)"
      :multiple="true"
      :on-success="fileSuccessUpLoad"
    >
      <el-button slot="trigger" size="medium" type="primary">选取文件</el-button>
      <div slot="tip" class="tooltip">已选择{{ type }}, 注意:请上传{{ extension }}格式的文件, 限制大小2G</div>
    </el-upload>
    <el-button id="upload" size="medium" type="success" plain @click="submitUpload">上传到服务器</el-button>
    <el-button id="pre" size="medium" type="primary" plain @click="pre">上一步</el-button>
  </div>
</template>

<script>
import GlobalUrl from '@/utils/GlobalUrl'

export default {
  props: {
    type: {
      type: String,
      default: 'Ap'
    },
    active: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      fileList: [],
      accept: {
        Ap: '.xlsx',
        Bluetooth: '.xlsx',
        Wifi: '.xlsx',
        RemoteImage: '.tar.gz',
        Poi: '.xlsx'
      },
      extension: ''
    }
  },
  methods: {
    pre() {
      this.$emit('update:active', this.active - 1)
    },
    submitUpload() {
      this.$refs.upload.submit()
      this.$emit('update:active', this.active + 1)
    },
    fileSuccessUpLoad(res) {
      console.log(res)
      this.$refs.upload.clearFiles()
      this.$message({
        message: '上传成功',
        type: 'success'
      })
    },
    getExtension(type) {
      if (type === 'RemoteImage') {
        this.extension = '(仅支持Landsat8影像)' + this.accept[type]
      } else {
        this.extension = this.accept[type]
      }
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

.tooltip {
  color: #67C23A;
  font-size: 1.2em;
}
</style>
