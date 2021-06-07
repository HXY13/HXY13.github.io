<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))

      this.chart.setOption({
        title: {
            text: 'TED中最受欢迎的十大主题',
            left: 'center',
            align: 'right',


        },
        xAxis: {
            name:"最受欢迎的十个标签",
            type: 'category',
            data: ['全球问题', 'TEDx', '科技', '贸易', '创新创意', '科学', '健康','文化','娱乐','设计']
        },
        yAxis: {
            name:"统计结果",
            type: 'value'
        },
        series: [{
            data: [501, 450, 727, 348, 229, 567, 236,486,299,418],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
                color: 'rgba(220, 220, 220, 0.8)'
            }
        }]
      })
    }
  }
}
</script>
