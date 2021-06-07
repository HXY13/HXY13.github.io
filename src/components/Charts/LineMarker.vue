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
        // title: {
        //     text: '不同职业演讲者的视频浏览量'
        // },
        // tooltip: {},
        // xAxis: {
        //     type : 'category',
        //     boundaryGap : false,
        //     data : ['Author/educator', 'Social psychologist', 'Leadership expert', 'Vulnerability researcher', 'Writer', 'Sound consultant', 'Neuroanatomist', 'Life coach; expert in leadership psychology', 'Comedian and writer', 'Model', 'Career analyst', 'Quiet revolutionary', 'Lie detector', 'Psychiatrist, psychoanalyst and Zen priest', 'Psychologist', 'Director of research, Samsung Research America', 'Illusionist, endurance artist', 'Gentleman thief', 'Blogger', 'Psychologist; happiness expert', 'Health psychologist', 'Oceanographer', 'Magician', 'Novelist', 'Writer', 'Psychologist', 'Global health expert; data visionary', 'Social activist', 'Marketer, success analyst', 'Poet']
        // },
        // yAxis: {
        //     type : 'value'
        // },
        // series: [
        //     {
        //         type: 'graph',
        //         layout: 'none',
        //         coordinateSystem: 'cartesian2d',
        //         symbolSize: 30,
        //         label: {
        //             show: true
        //         },
        //         edgeSymbol: ['circle', 'arrow'],
        //         edgeSymbolSize: [1,10],
        //         data : [47227110, 43155405, 34309432, 31168150, 22270883, 21594632, 21190883, 20685401, 20475972, 19787465, 18830983, 17629275, 16861578, 16601927, 16209727, 16097077, 15601385, 15283242, 14745406, 14689301, 14566463, 13926113, 13327101, 13298341, 13155478, 12039978, 12005869, 11443190, 10841210, 10529854],
        //         links: links,
        //         lineStyle: {
        //             color: '#2f4554'
        //         }
        //     }
        // ]
        color: ['#3398DB'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data:  ['Author/educator', 'Social psychologist', 'Leadership expert', 'Vulnerability researcher', 'Writer', 'Sound consultant', 'Neuroanatomist', 'Life coach; expert in leadership psychology', 'Comedian and writer', 'Model', 'Career analyst', 'Quiet revolutionary', 'Lie detector', 'Psychiatrist, psychoanalyst and Zen priest', 'Psychologist', 'Director of research, Samsung Research America', 'Illusionist, endurance artist', 'Gentleman thief', 'Blogger', 'Psychologist; happiness expert', 'Health psychologist', 'Oceanographer', 'Magician', 'Novelist', 'Writer', 'Psychologist', 'Global health expert; data visionary', 'Social activist', 'Marketer, success analyst', 'Poet'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '次数',
                type: 'line',
                // barWidth: '60%',
                data: [47227110, 43155405, 34309432, 31168150, 22270883, 21594632, 21190883, 20685401, 20475972, 19787465, 18830983, 17629275, 16861578, 16601927, 16209727, 16097077, 15601385, 15283242, 14745406, 14689301, 14566463, 13926113, 13327101, 13298341, 13155478, 12039978, 12005869, 11443190, 10841210, 10529854],
            }
        ]
      })
    }
  }
}
</script>
