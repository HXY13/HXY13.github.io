
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
            text: '按星期分析演讲数',
            textStyle:{					//---主标题内容样式
            	color:'#861911'
            },
        	 padding:[1,1,100,50]
            /* left: 'center' */
        },
        /* tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        }, */
        legend: {
            left: 'center',
            top: 'bottom',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sta', 'Sun']
        },
        toolbox: {
            show: true,
            feature: {
                mark: {show: true},
                dataView: {show: true, readOnly: false},
                magicType: {
                    show: true,
                    type: ['pie', 'funnel']
                },
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        series: [
            /* {
                name: '半径模式',
                type: 'pie',
                radius: [20, 110],
                center: ['25%', '50%'],
                roseType: 'radius',
                label: {
                    show: false
                },
                emphasis: {
                    label: {
                        show: true
                    }
                },
                data: [
                    {value: 306, name: 'Mon'},
                    {value: 327, name: 'Tue'},
                    {value: 533, name: 'Wed'},
                    {value: 552, name: 'Thu'},
                    {value: 384, name: 'Fri'},
                    {value: 338, name: 'Sta'},
                    {value: 110, name: 'Sun'},

                ]
            }, */
            {
                name: '面积模式',
                type: 'pie',
                radius: [30, 110],
                center: ['50%', '50%'],
                roseType: 'area',
                data: [
                   {value: 306, name: 'Mon'},
                   {value: 327, name: 'Tue'},
                   {value: 533, name: 'Wed'},
                   {value: 552, name: 'Thu'},
                   {value: 384, name: 'Fri'},
                   {value: 338, name: 'Sta'},
                   {value: 110, name: 'Sun'},
                ]
            }
        ]

       })
     }
   }
 }
 </script>