<template>
  <div id="container">
    <el-card id="myCard">
      <div slot="header">
        <span class="title">文件数据入库</span>
      </div>
      <el-steps :active="active" finish-status="success" align-center>
        <el-step title="选择上传类型" />
        <el-step title="输入上传参数及选择数据文件" />
        <el-step title="上传完成" />
      </el-steps>

      <div class="formWrapper">
        <el-form label-width="150px">
          <div v-show="active === 0">
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
            <el-button id="next0" size="medium" type="primary" plain @click="next">下一步</el-button>
          </div>

          <div v-show="active === 1">
            <el-form-item>
              <form-upload-noparam v-if="uploadNoParam.includes(type)" :type="type" :active.sync="active" />
              <form-upload-shape v-else-if="uploadShape.includes(type)" :type="type" :active.sync="active" />
              <form-upload-image v-else-if="uploadImage.includes(type)" :type="type" :active.sync="active" />
              <form-upload-tdtiles v-else-if="uploadDirectory.includes(type)" :type="type" :active.sync="active" />
              <form-upload-plan v-else-if="uploadPlan.includes(type)" :type="type" :active.sync="active" />
            </el-form-item>
          </div>

          <div v-show="active === 2">
            <el-button id="next2" size="medium" type="success" plain @click="next">已完成上传</el-button>
          </div>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import FormUploadNoparam from '@/views/form/components/form-upload-noparam'
import FormUploadShape from '@/views/form/components/form-upload-shape'
import FormUploadImage from '@/views/form/components/form-upload-image'
import FormUploadTdtiles from '@/views/form/components/form-upload-tdtiles'
import FormUploadPlan from '@/views/form/components/form-upload-plan'

export default {
  components: { FormUploadPlan, FormUploadTdtiles, FormUploadImage, FormUploadShape, FormUploadNoparam },
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
      }, {
        label: 'IndoorTopo',
        value: 'IndoorTopo'
      }, {
        label: 'Tiles',
        value: 'Tiles'
      }, {
        label: '3dTiles',
        value: 'TdTiles'
      }, {
        label: 'Plan',
        value: 'Plan'
      }, {
        label: 'RemoteImage',
        value: 'RemoteImage'
      }
      ],
      active: 0,
      uploadNoParam: ['Ap', 'Bluetooth', 'Wifi', 'RemoteImage'],
      uploadShape: ['IndoorTopo'],
      uploadImage: ['Tiles'],
      uploadDirectory: ['TdTiles'],
      uploadPlan: ['Plan']
    }
  },
  methods: {
    next() {
      if (++this.active > 2) this.active = 0
    }
  }
}
</script>

<style scoped>
#container {
  width: 70%;
  margin: 30px auto auto;
}

#myCard {
  padding: 25px 15%;
}

#next0 {
  margin-bottom: 10px;
  float: right;
}

#next2 {
  margin: 40px 20px 20px;
  float: right;
}

.title {
  text-align: center;
  font-size: 1.3em;
  display: block;
}

.formWrapper {
  padding: 40px 10px;
}
</style>
