<!--  -->
<template>
  <div class='container-404'>
    <div><img src="@/assets/404.png" alt=""><br>
      <p class="text-404">迷路了呀...</p>
    </div>

  </div>
</template>
<script>

  export default {
    //import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
      //这里存放数据
      return {

      };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {

    },
    created() {

    },
    mounted() {

    },
  }
</script>
<style lang='scss' scoped>
  .container-404 {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;

    .text-404 {
      text-align: center;
    }
  }
</style>