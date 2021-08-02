<template>
  <div class="charts-wrapper">
    <div id="echarts" class="echarts" />
  </div>
</template>

<script>
import * as echarts from 'echarts'
// import resize from './mixins/resize'
import { getDashBoardData } from '@/api/api-dashboard'

export default {
  // mixins: [resize],
  data() {
    return {
      chart: null,
      data: []
    }
  },
  mounted() {
    this.$nextTick(() => {
      getDashBoardData().then(response => {
        for (const [key, value] of Object.entries(response.data)) {
          this.data.push({ value: value, name: key })
        }
        this.initChart()
      })
    })
  }, beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById('echarts'))
      this.chart.setOption({
        title: {
          text: '室内外多源数据管理系统',
          textStyle: {
            fontStyle: 'oblique',
            fontWeight: 'bold',
            fontSize: 35
          },
          left: 'center',
          padding: [5, 5, 20, 5]
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          top: 'bottom'
        },
        series: [
          {
            name: '各数据占比统计',
            type: 'pie',
            roseType: 'radius',
            label: {
              fontSize: 16
            },
            radius: [25, 210],
            center: ['50%', '50%'],
            data: this.data,
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      })
    }
  }
}
</script>

<style scoped>
.charts-wrapper {
  padding: 30px 10px;
}

.echarts {
  width: 100%;
  height: calc(100vh - 110px);
  background-color: #fff;
}
</style>
