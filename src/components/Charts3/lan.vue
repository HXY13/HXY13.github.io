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

      const xAxisData = []
      const data = []
      const data2 = []
      for (let i = 0; i < 50; i++) {
        xAxisData.push(i)
        data.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5)
        data2.push((Math.sin(i / 5) * (i / 5 + 10) + i / 6) * 3)
      }
      this.chart.setOption({
        // backgroundColor: '#08263a',
        title: {
            text: 'TED演讲提供了多少种语言',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        // legend: {
        //     orient: 'vertical',
        //     left: 'left',
        //     data: ['拥有1-10种语言选择', '拥有10-20种语言选择', '拥有20-30种语言选择','拥有30-40种语言选择', '拥有40-50种语言选择', '拥有50-60种语言选择','拥有60-70种语言选择','拥有70-80种语言选择']
        // },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [
                    {value: 64, name: '拥有1-10种语言选择'},
                    {value: 252, name: '拥有10-20种语言选择'},
                    {value: 1245, name: '拥有20-30种语言选择'},
                    {value: 742, name: '拥有30-40种语言选择'},
                    {value: 117, name: '拥有40-50种语言选择'},
                    {value: 19, name: '拥有50-60种语言选择'},
                    {value: 5, name: '拥有60-70种语言选择'},
                    {value: 1, name: '拥有70-80种语言选择'}
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]

      })
    }
  }
}
</script>
