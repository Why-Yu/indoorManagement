<template>
  <div id="container">
    <el-card id="myCard">
      <el-form label-width="150px">
        <el-form-item label="建筑名称">
          <el-select
            v-model="buildName"
            placeholder="请选择类型"
            @change="selectChange"
          >
            <el-option
              v-for="item in buildNames"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="楼层">
          <el-select v-model="floor" placeholder="请选择类型">
            <el-option
              v-for="item in floors"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="typeValue" placeholder="请选择类型">
            <el-option
              v-for="item in types"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="是否加密">
          <el-radio v-model="encrypt" label="true">是</el-radio>
          <el-radio v-model="encrypt" label="false">否</el-radio>
        </el-form-item>
        <el-form-item label="文件">
          <el-upload
            ref="upload"
            class="upload-demo"
            action="none"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :auto-upload="false"
            :file-list="fileList"
            :on-change="handleChange"
            :on-success="fileSuccessUpLoad"
            :on-error="fileErrorUpload"
            :http-request="uploadFile"
          >
            <el-button size="small" type="primary">选取文件</el-button>
          </el-upload>
        </el-form-item>
        <el-button id="btn" type="primary" @click="submit()">提交</el-button>
        <!-- <el-button type="primary" @click="test()">测试</el-button> -->
      </el-form>
    </el-card>

    <el-table id="myTable" :data="tableData" border>
      <el-table-column
        prop="buildName"
        label="Building Name"
        width="180"
        align="center"
      />
      <el-table-column prop="floor" label="楼层" width="180" align="center" />
      <el-table-column prop="type" label="类型" width="180" align="center" />
      <el-table-column
        prop="encryption"
        label="是否加密"
        width="180"
        align="center"
      />
      <el-table-column prop="fileName" label="文件" align="center" />
      <!-- <el-table-column label="Operation" align="center"> </el-table-column> -->
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      list: [],
      buildNames: [],
      buildName: '',
      floors: [
        {
          value: '1',
          label: 'floor_1'
        }
      ],
      floor: '',
      types: [
        {
          value: '1',
          label: 'wifi'
        },
        {
          value: '2',
          label: 'ble'
        },
        {
          value: '3',
          label: '地磁'
        },
        {
          value: '4',
          label: '图像'
        }
      ],
      typeValue: '',
      fileName: null,
      fileList: null,
      file: null,
      encrypt: 'true',
      obj: {}
    }
  },
  created () {
    this.getBid()
  },
  methods: {
    // get building list data
    getBid () {
      this.$axios.get(this.$request_url + '/infos').then(response => {
        console.log('response', response)
        this.list = response.data
        var obj
        for (var i = 0; i < this.list.length; i++) {
          obj = {
            value: '' + i,
            label: this.list[i].bid
          }
          this.buildNames.push(obj)
        }
      }).catch(err => {
        console.log('err:', err)
      })
    },
    // get Fid
    selectChange (param) {
      var obj
      this.list.forEach((val) => {
        if (val.bid === this.buildNames[this.buildName].label) {
          this.floors = []
          for (var i = 0; i < val.fids.length; i++) {
            obj = { value: '' + i, label: val.fids[i] }
            this.floors.push(obj)
          }
        }
        console.log('param', param)
      })
    },
    submit () {
      // table add row
      var obj = { buildName: '', floor: '', type: this.typeValue, encryption: '', fileName: this.fileName }
      this.obj = obj
      var i
      for (i = 0; i < this.buildNames.length; i++) {
        if (this.buildName === this.buildNames[i].value) {
          obj.buildName = this.buildNames[i].label
        }
      }
      for (i = 0; i < this.floors.length; i++) {
        if (this.floor === this.floors[i].value) {
          obj.floor = this.floors[i].label
        }
      }
      for (i = 0; i < this.types.length; i++) {
        if (this.typeValue === this.types[i].value) {
          obj.type = this.types[i].label
        }
      }
      if (this.encrypt === 'true') {
        obj.encryption = '是'
      } else {
        obj.encryption = '否'
      }

      // 上传文件
      this.$refs.upload.submit()
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleChange (file, fileList) {
      this.fileName = file.name
      this.fileList = fileList
      this.file = file
      console.log('change_file:', file)
    },
    fileSuccessUpLoad (response, file, fileList) {
      console.log('response:', response)
      console.log('file', file)
      console.log('fileList', fileList)
    },
    fileErrorUpload (err, file, fileList) {
      console.log('err', err)
      console.log('file', file)
      console.log('fileList', fileList)
    },
    encryptFile () {
      const sm4 = require('sm-crypto').sm4
      console.log('sm4', sm4)
      // key 16进制或字节数组
      const key = '0123456789abcdeffedcba9876543210'
      var file = this.file.raw
      var encryptData
      if (file) {
        var reader = new FileReader()
        reader.readAsText(file)
        // reader.readAsBinaryString(file)
        return new Promise(function (resolve) {
          reader.onload = function () {
            // console.log('reader', this.result)
            encryptData = sm4.encrypt(this.result, key)
            resolve(encryptData)
          }
        })
      }
    },
    async uploadFile () {
      const formData = new FormData()
      if (this.encrypt === 'true') {
        // var fileData = await this.encryptFile()
        // console.log('x2', fileData)
        // formData.append('file', fileData)
        formData.append('file', this.file.raw)
      } else {
        formData.append('file', this.file.raw)
        console.log('unencrypt', this.formData)
      }
      switch (this.typeValue) {
        case '1':
          this.$axios({
            url: this.$request_url + '/feature/wifi' + this.obj.buildName + '/' + this.obj.floor,
            method: 'post',
            data: formData
          }).then((response) => {
            console.log('res:', response)
            if (response.status === 200) {
              this.tableData.push(this.obj)
              this.fileList = []
              this.$message({
                message: 'uploading success!',
                type: 'success'
              })
            }
          }).catch((error) => {
            console.log('err:', error)
            this.$message({
              message: 'error!',
              type: 'warning'
            })
          })
          break
        case '2':
          this.$axios({
            url: this.$request_url + '/feature/ble' + this.obj.buildName,
            method: 'post',
            data: formData
          }).then((response) => {
            console.log('res:', response)
            if (response.status === 200) {
              this.tableData.push(this.obj)
              this.fileList = []
              this.$message({
                message: 'uploading success!',
                type: 'success'
              })
            }
          }).catch((error) => {
            console.log('err:', error)
            this.$message({
              message: 'error!',
              type: 'warning'
            })
          })
          break
        case '3':
          this.$axios({
            url: this.$request_url + '/feature/mag/' + this.obj.buildName + '/' + this.obj.floor,
            method: 'post',
            data: formData
          }).then((response) => {
            console.log('res:', response)
            if (response.status === 200) {
              this.tableData.push(this.obj)
              this.fileList = []
              this.$message({
                message: 'uploading success!',
                type: 'success'
              })
            }
          }).catch((error) => {
            console.log('err:', error)
            this.$message({
              message: 'error!',
              type: 'warning'
            })
          })
          break
        case '4':
          this.$axios({
            url: this.$request_url + '/feature/pic/' + this.obj.buildName,
            method: 'post',
            data: formData
          }).then((response) => {
            console.log('res:', response)
            if (response.status === 200) {
              this.tableData.push(this.obj)
              this.fileList = []
              this.$message({
                message: 'picture uploading success!',
                type: 'success'
              })
            }
          }).catch((error) => {
            console.log('err:', error)
            this.$message({
              message: 'error!',
              type: 'warning'
            })
          })
          break
      }
    }
  }
}
</script>

<style scoped>
#container {
  width: 70%;
  margin: auto;
  margin-top: 50px;
}
#myCard {
  padding: 25px 25%;
}
#btn {
  margin-bottom: 10px;
  float: right;
}

#myTable {
  margin-top: 60px;
}
</style>
