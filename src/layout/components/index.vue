<template>
  <div class="app-main">
    <!-- <navbar></navbar> -->
    <!-- <header-navbar></header-navbar> -->
    <div class="content">
      <navbar></navbar>
      <div class="right-main">
        <right-navbar></right-navbar>
        <div class="right-menu">
          <transition name="fade-transform" mode="out-in">
            <keep-alive include="true">
              <router-view></router-view>
            </keep-alive>
          </transition>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  // import Navbar from './Navbar'
  import RightNavbar from './RightNavbar'
  import Navbar from './Navbar'

  export default {
    components: {
      Navbar,
      RightNavbar,
    },
    name: 'appMain',
    data() {
      return {
      };
    },
    methods: {
    }
  }
</script>

<style lang="scss" scoped>
  .content {
    height: 100%;

    .right-menu {
      height: calc(100% - 52px);
      padding: 15px;
      box-sizing: border-box;
    }

    .right-main {
      /* height: 100vh; */
      max-height: calc(100% - 52px);
      margin-left: 210px;
    }
  }
</style>