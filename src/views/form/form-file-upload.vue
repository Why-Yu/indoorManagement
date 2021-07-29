<template>
  <div id="container">
    <el-card id="myCard">
      <div slot="header">
        <span class="title">文件数据入库</span>
      </div>
      <el-form label-width="150px">
        <el-form-item label="选择上传的数据库">
          <el-select v-model="type" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="选择文件">
          <el-upload
            ref="upload"
            :action="getUploadPath(type)"
            :file-list="fileList"
            :auto-upload="false"
            :accept="getExtension(type)"
            :on-success="fileSuccessUpLoad"
          >
            <el-button slot="trigger" size="medium" type="primary">选取文件</el-button>
            <div slot="tip">请注意上传对应格式的文件</div>
          </el-upload>
        </el-form-item>
        <el-button id="btn" size="medium" type="success" @click="submitUpload">上传到服务器</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import GlobalUrl from '@/utils/GlobalUrl'

export default {
  data() {
    return {
      type: 'Ap',
      options: [{
        label: 'AP',
        value: 'Ap'
      }, {
        label: 'Bluetooth',
        value: 'Bluetooth'
      }, {
        label: 'Wifi',
        value: 'Wifi'
      }],
      fileList: [],
      accept: {
        Ap: '.xls,.xlsx',
        Bluetooth: '.xls,.xlsx',
        Wifi: '.xls,.xlsx'
      }
    }
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit()
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
#container {
  width: 70%;
  margin: 50px auto auto;
}

#myCard {
  padding: 25px 25%;
}

#btn {
  margin-bottom: 10px;
  float: right;
}

.title {
  text-align: center;
  font-size: 1.3em;
  display: block;
}
</style>
