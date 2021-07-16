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
        this.data = response.data.items
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
          text: 'Dashboard',
          textStyle: {
            fontStyle: 'oblique',
            fontWeight: 'bold',
            fontSize: 25
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
  padding: 10px;
}

.echarts {
  width: 100%;
  height: 640px;
  background-color: #fff;
}
</style>
