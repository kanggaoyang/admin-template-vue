<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
  },
  mounted() {
   
  },
  created() {
    // if (sessionStorage.getItem('store')){
    //   this.$store.replaceState(Object.assign({},this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
    // }

    // window.addEventListener('beforeunload', ()=>{
    //   sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    // })
  },
}
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
  #app {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }
</style>
