<!--  -->
<template>
  <el-container>
    <div v-if="result" class="article-container">
      <h2>{{result.title}} <sub>{{result.subTitle}}</sub></h2>
      <br><br>
      <p>{{result.create_time | formatDate}}   <span v-if="result.categoryId">分类：{{result.categoryId.name}}</span></p><br>
      <div v-html="result.content"></div>
    </div>
  </el-container>

</template>

<script>
  import { detail } from '@/api/user/article'
  export default {
    components: {},
    data() {
      return {
        id: null,
        result: {}
      };
    },
    computed: {},
    watch: {},
    //方法集合
    methods: {
      async getDetail(id) {
        const res = await detail({ id })
        const { code, result } = res
        this.result = result
      }
    },
    created() {
      this.id = this.$route.query.id
      this.getDetail(this.id)
    },
    mounted() {

    },
    beforeCreate() { }, //生命周期 - 创建之前
    beforeMount() { }, //生命周期 - 挂载之前
    beforeUpdate() { }, //生命周期 - 更新之前
    updated() { }, //生命周期 - 更新之后
    beforeDestroy() { }, //生命周期 - 销毁之前
    destroyed() { }, //生命周期 - 销毁完成
    activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
  }
</script>
<style lang="scss" scoped>
  .article-container{
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    width: 1200px;
    margin: 0 auto;
    padding-left: 30px;
    padding-right: 30px;
    padding-bottom: 100px;
    h2{
      margin-top: 60px;
      text-align: center;
    }
    ::v-deep img{
      max-width: 100%;
    }
    ::v-deep .ql-align-center{
      text-align: center;
    }
  }
</style>