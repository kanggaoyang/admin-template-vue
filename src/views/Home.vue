<template>
  <div class="home">
    <el-row :gutter="10">
      <el-col :xs="24" :sm="12" :md="12" :lg="12">
        <ve-line :data="chartData1"></ve-line>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="12">
        <ve-pie :data="chartData2" :settings="chartSettings1"></ve-pie>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="12">
        <ve-map :data="chartData3"></ve-map>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="12">
        <ve-radar :data="chartData4"></ve-radar>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="12">
        <ve-sankey :data="chartData5" :settings="chartSettings2"></ve-sankey>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="12">
        <ve-heatmap :data="chartData6"></ve-heatmap>
      </el-col>
    </el-row>
    
    
  </div>
</template>

<script>
  // @ is an alias to /src

  export default {
    name: 'Home',
    data() {
      this.chartSettings1 = {
        dataType: function (v) {
          return v + ' ￥'
        }
      }
      this.chartSettings2 = {
        links: [
          { source: '首页', target: '列表页a', value: 0.5 },
          { source: '首页', target: '列表页b', value: 0.5 },
          { source: '列表页a', target: '内容页a-1', value: 0.1 },
          { source: '列表页a', target: '内容页a-2', value: 0.4 },
          { source: '列表页b', target: '内容页b-1', value: 0.2 },
          { source: '列表页b', target: '内容页b-2', value: 0.3 }
        ]
      }
      return {
        chartData1: {
          columns: ['日期', '访问用户', '下单用户'],
          rows: [
            { '日期': '2018-05-22', '访问用户': 32371, '下单用户': 19810 },
            { '日期': '2018-05-23', '访问用户': 12328, '下单用户': 4398 },
            { '日期': '2018-05-24', '访问用户': 92381, '下单用户': 52910 },
            { '日期': '2018-05-25', '访问用户': 12328, '下单用户': 52910 },
          ]
        },
        chartData2: {
          columns: ['日期', '访问用户'],
          rows: [
            { '日期': '1/1', '访问用户': 1393 },
            { '日期': '1/2', '访问用户': 3530 },
            { '日期': '1/3', '访问用户': 2923 },
            { '日期': '1/4', '访问用户': 1723 },
            { '日期': '1/5', '访问用户': 3792 },
            { '日期': '1/6', '访问用户': 4593 }
          ]
        },
        chartData3: {
          columns: ['位置', '税收', '人口', '面积'],
          rows: [
            { '位置': '吉林', '税收': 123, '人口': 123, '面积': 92134 },
            { '位置': '北京', '税收': 1223, '人口': 2123, '面积': 29234 },
            { '位置': '上海', '税收': 2123, '人口': 1243, '面积': 94234 },
            { '位置': '浙江', '税收': 4123, '人口': 5123, '面积': 29234 }
          ]
        },
        chartData4: {
          columns: ['日期', '访问用户', '下单用户', '下单率'],
          rows: [
            { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
            { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
            { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
            { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
            { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
            { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
          ]
        },
        chartData5: {
          columns: ['页面', '访问量'],
          rows: [
            { '页面': '首页', '访问量': 100000 },
            { '页面': '列表页a', '访问量': 20000 },
            { '页面': '列表页b', '访问量': 80000 },
            { '页面': '内容页a-1', '访问量': 10000 },
            { '页面': '内容页a-2', '访问量': 10000 },
            { '页面': '内容页b-1', '访问量': 60000 },
            { '页面': '内容页b-2', '访问量': 20000 }
          ]
        },
        chartData6: {
          columns: ['时间', '地点', '人数'],
          rows: [
            { '时间': '星期一', '地点': '北京', '人数': 1000 },
            { '时间': '星期二', '地点': '上海', '人数': 400 },
            { '时间': '星期三', '地点': '杭州', '人数': 800 },
            { '时间': '星期二', '地点': '深圳', '人数': 200 },
            { '时间': '星期三', '地点': '长春', '人数': 100 },
            { '时间': '星期五', '地点': '南京', '人数': 300 },
            { '时间': '星期四', '地点': '江苏', '人数': 800 },
            { '时间': '星期一', '地点': '北京', '人数': 700 },
            { '时间': '星期三', '地点': '上海', '人数': 300 },
            { '时间': '星期二', '地点': '杭州', '人数': 500 }
          ]
        }
      }
    
  },
    components: {
      // HelloWorld
    },
    mounted() {
    },
    methods: {

    },
  }
</script>

<style lang="scss" scoped>
  .home {
    width: 100%;
    height: 100%;
    /* background: url('../assets/home/home_bg2.jpg') no-repeat center center;
    background-size: cover; */
  }
</style>