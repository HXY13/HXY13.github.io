
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
            title: {
                text: '演讲数按年分',
                subtext: '演讲数',

            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
                }
            },
            toolbox: {
                show: true,
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['1972','1983','1984','1990','1991','1994','1998','2001','2002','2003 ','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017']
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value} '
                },
                axisPointer: {
                    snap: true
                }
            },
            visualMap: {
                show: false,
                dimension: 0,
                pieces: [{
                    lte: 6,
                    color: 'green'
                }, {
                    gt: 6,
                    lte: 8,
                    color: 'red'
                }, {
                    gt: 8,
                    lte: 14,
                    color: 'green'
                }, {
                    gt: 14,
                    lte: 17,
                    color: 'red'
                }, {
                    gt: 17,
                    color: 'green'
                }]
            },
            series: [
                {
                    name: '演讲数',
                    type: 'line',
                    smooth: true,
                    data: [1,1,1,1,1,1,6,5,27,33,33,66,50,114,84,232,267,270,267,270,237,239,246,98],
                    markArea: {
                        data: [ [{
                            name: '高峰',
                            xAxis: '2009'
                        }, {
                            xAxis: '2013'
                        }] ]
                    },
                },
                   ]
       })
     }
   }
 }
 </script>

