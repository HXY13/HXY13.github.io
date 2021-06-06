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
            text: '浏览量最高的10个TED视频',
            left:'center'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        // legend: {
        //     data: ['2011年']
        // },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
        },
        yAxis: {
            type: 'category',
            data: ["Looks aren't everything. Believe me, I'm a model.", 'This is what happens when you reply to spam email', 'Why we do what we do', 'My stroke of insight', 'How to speak so that people want to listen', "10 things you didn't know about orgasm", 'The power of vulnerability', 'How great leaders inspire action', 'Your body language may shape who you are', 'Do schools kill creativity?']
        
        },
        series: [
            {
                // name: '2011年',
                type: 'bar',
                data: [19787465, 20475972, 20685401, 21190883, 21594632, 22270883, 31168150, 34309432, 43155405, 47227110]
            },
            // {
            //     name: '2012年',
            //     type: 'bar',
            //     data: [19325, 23438, 31000, 121594, 134141, 681807]
            // }
        ]
      })
    }
  }
}
</script>
