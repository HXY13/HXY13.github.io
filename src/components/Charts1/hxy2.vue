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
            text: '讨论量最高的10个TED视频',
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
            data: ['How great leaders inspire action', 'The danger of science denial', 'Your body language may shape who you are', 'On reading the Koran', 'Taking imagination seriously', 'How do you explain consciousness?', 'My stroke of insight', 'Science can answer moral questions', 'Do schools kill creativity?', 'Militant atheism']
        
        },
        series: [
            {
                // name: '2011年',
                type: 'bar',
                data: [1930, 2272, 2290, 2374, 2492, 2673, 2877, 3356, 4553, 6404]
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
