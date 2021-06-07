<!-- <template>
  <div :class="{fullscreen:fullscreen}" class="tinymce-container" :style="{width:containerWidth}">
    <textarea :id="tinymceId" class="tinymce-textarea" />
    <div class="editor-custom-btn-container">
      <editorImage color="#1890ff" class="editor-upload-btn" @successCBK="imageSuccessCBK" />
    </div>
  </div>
</template>

<script>
/**
 * docs:
 * https://panjiachen.github.io/vue-element-admin-site/feature/component/rich-editor.html#tinymce
 */
import editorImage from './components/EditorImage'
import plugins from './plugins'
import toolbar from './toolbar'
import load from './dynamicLoadScript'

// why use this cdn, detail see https://github.com/PanJiaChen/tinymce-all-in-one
const tinymceCDN = 'https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/tinymce.min.js'

export default {
  name: 'Tinymce',
  components: { editorImage },
  props: {
    id: {
      type: String,
      default: function() {
        return 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
      }
    },
    value: {
      type: String,
      default: ''
    },
    toolbar: {
      type: Array,
      required: false,
      default() {
        return []
      }
    },
    menubar: {
      type: String,
      default: 'file edit insert view format table'
    },
    height: {
      type: [Number, String],
      required: false,
      default: 360
    },
    width: {
      type: [Number, String],
      required: false,
      default: 'auto'
    }
  },
  data() {
    return {
      hasChange: false,
      hasInit: false,
      tinymceId: this.id,
      fullscreen: false,
      languageTypeList: {
        'en': 'en',
        'zh': 'zh_CN',
        'es': 'es_MX',
        'ja': 'ja'
      }
    }
  },
  computed: {
    containerWidth() {
      const width = this.width
      if (/^[\d]+(\.[\d]+)?$/.test(width)) { // matches `100`, `'100'`
        return `${width}px`
      }
      return width
    }
  },
  watch: {
    value(val) {
      if (!this.hasChange && this.hasInit) {
        this.$nextTick(() =>
          window.tinymce.get(this.tinymceId).setContent(val || ''))
      }
    }
  },
  mounted() {
    this.init()
  },
  activated() {
    if (window.tinymce) {
      this.initTinymce()
    }
  },
  deactivated() {
    this.destroyTinymce()
  },
  destroyed() {
    this.destroyTinymce()
  },
  methods: {
    init() {
      // dynamic load tinymce from cdn
      load(tinymceCDN, (err) => {
        if (err) {
          this.$message.error(err.message)
          return
        }
        this.initTinymce()
      })
    },
    initTinymce() {
      const _this = this
      window.tinymce.init({
        selector: `#${this.tinymceId}`,
        language: this.languageTypeList['en'],
        height: this.height,
        body_class: 'panel-body ',
        object_resizing: false,
        toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
        menubar: this.menubar,
        plugins: plugins,
        end_container_on_empty_block: true,
        powerpaste_word_import: 'clean',
        code_dialog_height: 450,
        code_dialog_width: 1000,
        advlist_bullet_styles: 'square',
        advlist_number_styles: 'default',
        imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
        default_link_target: '_blank',
        link_title: false,
        nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
        init_instance_callback: editor => {
          if (_this.value) {
            editor.setContent(_this.value)
          }
          _this.hasInit = true
          editor.on('NodeChange Change KeyUp SetContent', () => {
            this.hasChange = true
            this.$emit('input', editor.getContent())
          })
        },
        setup(editor) {
          editor.on('FullscreenStateChanged', (e) => {
            _this.fullscreen = e.state
          })
        },
        // it will try to keep these URLs intact
        // https://www.tiny.cloud/docs-3x/reference/configuration/Configuration3x@convert_urls/
        // https://stackoverflow.com/questions/5196205/disable-tinymce-absolute-to-relative-url-conversions
        convert_urls: false
        // 整合七牛上传
        // images_dataimg_filter(img) {
        //   setTimeout(() => {
        //     const $image = $(img);
        //     $image.removeAttr('width');
        //     $image.removeAttr('height');
        //     if ($image[0].height && $image[0].width) {
        //       $image.attr('data-wscntype', 'image');
        //       $image.attr('data-wscnh', $image[0].height);
        //       $image.attr('data-wscnw', $image[0].width);
        //       $image.addClass('wscnph');
        //     }
        //   }, 0);
        //   return img
        // },
        // images_upload_handler(blobInfo, success, failure, progress) {
        //   progress(0);
        //   const token = _this.$store.getters.token;
        //   getToken(token).then(response => {
        //     const url = response.data.qiniu_url;
        //     const formData = new FormData();
        //     formData.append('token', response.data.qiniu_token);
        //     formData.append('key', response.data.qiniu_key);
        //     formData.append('file', blobInfo.blob(), url);
        //     upload(formData).then(() => {
        //       success(url);
        //       progress(100);
        //     })
        //   }).catch(err => {
        //     failure('出现未知问题，刷新页面，或者联系程序员')
        //     console.log(err);
        //   });
        // },
      })
    },
    destroyTinymce() {
      const tinymce = window.tinymce.get(this.tinymceId)
      if (this.fullscreen) {
        tinymce.execCommand('mceFullScreen')
      }

      if (tinymce) {
        tinymce.destroy()
      }
    },
    setContent(value) {
      window.tinymce.get(this.tinymceId).setContent(value)
    },
    getContent() {
      window.tinymce.get(this.tinymceId).getContent()
    },
    imageSuccessCBK(arr) {
      arr.forEach(v => window.tinymce.get(this.tinymceId).insertContent(`<img class="wscnph" src="${v.url}" >`))
    }
  }
}
</script>

<style lang="scss" scoped>
.tinymce-container {
  position: relative;
  line-height: normal;
}

.tinymce-container {
  ::v-deep {
    .mce-fullscreen {
      z-index: 10000;
    }
  }
}

.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}

.editor-custom-btn-container {
  position: absolute;
  right: 4px;
  top: 4px;
  /*z-index: 2005;*/
}

.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}

.editor-upload-btn {
  display: inline-block;
}
</style>
 -->


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
//--------------    标题 title  ----------------
            title: {
                text: '根据时间段分析TED演讲',
                textStyle:{					//---主标题内容样式
                	color:'black'
                },

                subtext:'按月份分',			//---副标题内容样式
                subtextStyle:{
                	color:'#952d24'
                },

                padding:[1,1,100,50]				//---标题位置,因为图形是是放在一个dom中,因此用padding属性来定位

            },

           	//----------------   图例 legend  -----------------
            legend: {
            	type:'plain',				//----图例类型，默认为'plain'，当图例很多时可使用'scroll'
            	top:'1%',					//----图例相对容器位置,top\bottom\left\right
            	selected:{
            		'演讲数':true,			//----图例选择,图形加载出来会显示选择的图例，默认为true
            	},
            	textStyle:{					//----图例内容样式
            		color:'#952d24',				//---所有图例的字体颜色
            		//backgroundColor:'black',	//---所有图例的字体背景色
            	},
            	tooltip:{					//图例提示框，默认不显示
            		show:true,
            		color:'red',
            	},
                data:[						//----图例内容
                	{
                		name:'场数',
                		icon:'circle',			//----图例的外框样式
                		textStyle:{
                			color:'#952d24',		//----单独设置某一个图例的颜色
                			//backgroundColor:'black',//---单独设置某一个图例的字体背景色
                		}
                	}
                ],
            },

            //--------------   提示框 -----------------
            tooltip: {
            	show:true,					//---是否显示提示框,默认为true
            	trigger:'item',				//---数据项图形触发
            	axisPointer:{				//---指示样式
            		type:'shadow',
            		axis:'auto',

            	},
            	padding:5,
            	textStyle:{					//---提示框内容样式
            		color:"#fff",
            	},
            },

            //-------------  grid区域  ----------------
            grid:{
            	show:false,					//---是否显示直角坐标系网格
            	top:80,						//---相对位置，top\bottom\left\right
            	containLabel:false,			//---grid 区域是否包含坐标轴的刻度标签
            	tooltip:{					//---鼠标焦点放在图形上，产生的提示框
            		show:true,
            		trigger:'item',			//---触发类型
            		textStyle:{
            			color:'#952d24',
            		},
            	}
            },

            //-------------   x轴   -------------------
            xAxis: {
            	show:true,					//---是否显示
            	position:'bottom',			//---x轴位置
            	offset:0,					//---x轴相对于默认位置的偏移
            	type:'category',			//---轴类型，默认'category'
            	name:'月份',				//---轴名称
            	nameLocation:'end',			//---轴名称相对位置
            	nameTextStyle:{				//---坐标轴名称样式
            		color:"black",
            		padding:[5,0,0,-5],	//---坐标轴名称相对位置
            	},
            	nameGap:15,					//---坐标轴名称与轴线之间的距离
            	//nameRotate:270,			//---坐标轴名字旋转

            	axisLine:{					//---坐标轴 轴线
            		show:true,					//---是否显示

            		//------------------- 箭头 -------------------------
            		symbol:['none', 'arrow'],	//---是否显示轴线箭头
            		symbolSize:[8, 8] ,			//---箭头大小
            		symbolOffset:[0,7],			//---箭头位置

            		//------------------- 线 -------------------------
            		lineStyle:{
            			color:'black',
            			width:1,
            			type:'solid',
            		},
            	},
            	axisTick:{					//---坐标轴 刻度
            		show:true,					//---是否显示
            		inside:true,				//---是否朝内
            		lengt:3,					//---长度
            		lineStyle:{
            			//color:'red',			//---默认取轴线的颜色
            			width:1,
            			type:'solid',
            		},
            	},
            	axisLabel:{					//---坐标轴 标签
            		show:true,					//---是否显示
            		inside:false,				//---是否朝内
            		rotate:0,					//---旋转角度
            		margin: 5,					//---刻度标签与轴线之间的距离
            		//color:'red',				//---默认取轴线的颜色
            	},
            	splitLine:{					//---grid 区域中的分隔线
            		show:false,					//---是否显示，'category'类目轴不显示，此时我的X轴为类目轴，splitLine属性是无意义的
            		lineStyle:{
            			//color:'red',
            			//width:1,
            			//type:'solid',
            		},
            	},
            	splitArea:{					//--网格区域
            		show:false,					//---是否显示，默认false
            	},
                data: ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],//内容
            },

            //----------------------  y轴  ------------------------
            yAxis: {
            	show:true,					//---是否显示
            	position:'left',			//---y轴位置
            	offset:0,					//---y轴相对于默认位置的偏移
            	type:'value',			//---轴类型，默认'category'
            	name:'TED演讲数',				//---轴名称
            	nameLocation:'end',			//---轴名称相对位置value
            	nameTextStyle:{				//---坐标轴名称样式
            		color:"black",
            		padding:[5,0,0,5],	//---坐标轴名称相对位置
            	},
            	nameGap:15,					//---坐标轴名称与轴线之间的距离
            	//nameRotate:270,			//---坐标轴名字旋转

            	axisLine:{					//---坐标轴 轴线
            		show:true,					//---是否显示

            		//------------------- 箭头 -------------------------
            		symbol:['none', 'arrow'],	//---是否显示轴线箭头
            		symbolSize:[8, 8] ,			//---箭头大小
            		symbolOffset:[0,7],			//---箭头位置

            		//------------------- 线 -------------------------
            		lineStyle:{
            			color:'black',
            			width:1,
            			type:'solid',
            		},
            	},
            	axisTick:{					//---坐标轴 刻度
            		show:true,					//---是否显示
            		inside:true,				//---是否朝内
            		lengt:3,					//---长度
            		lineStyle:{
            			//color:'red',			//---默认取轴线的颜色
            			width:1,
            			type:'solid',
            		},
            	},
            	axisLabel:{					//---坐标轴 标签
            		show:true,					//---是否显示
            		inside:false,				//---是否朝内
            		rotate:0,					//---旋转角度
            		margin: 8,					//---刻度标签与轴线之间的距离
            		//color:'red',				//---默认取轴线的颜色
            	},
            	splitLine:{					//---grid 区域中的分隔线
            		show:true,					//---是否显示，'category'类目轴不显示，此时我的y轴为类目轴，splitLine属性是有意义的
            		lineStyle:{
            			color:'#666',
            			width:1,
            			type:'dashed',			//---类型
            		},
            	},
            	splitArea:{					//--网格区域
            		show:false,					//---是否显示，默认false
            	}
            },

            //------------ 内容数据  -----------------
            series: [
	            {
	                name: '场数',				//---系列名称
	                type: 'bar',				//---类型
	                legendHoverLink:true,		//---是否启用图例 hover 时的联动高亮
	                label:{						//---图形上的文本标签
	                	show:false,
	                	position:'insideTop',	//---相对位置
	                	rotate:0,				//---旋转角度
	                	color:'#eee',
	                },
	                itemStyle:{					//---图形形状
	                	color:'#952d24',
	                	barBorderRadius:[18,18,0,0],
	                },
	                barWidth:'20',				//---柱形宽度
	                barCategoryGap:'20%',		//---柱形间距
	                data: [33, 601, 397, 173, 123, 270,253,30,107,208,232,123]
	            }
            ]

       })
     }
   }
 }
 </script>
