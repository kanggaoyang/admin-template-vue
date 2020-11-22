<template>
  <div class="sidebar">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
        :collapse="isCollapse" router>
        <!-- <el-menu-item index="/home">
          <span slot="title">首页</span>
        </el-menu-item> -->

        <sidebar-item v-for="menu in routes" :key="menu.path" :item="menu" :base-path="menu.path"></sidebar-item>

      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import sidebarItem from './sidebarItem.vue'
  export default {
    name: 'navbar',
    components: {
      sidebarItem
    },
    data() {
      return {
        activeIndex: '2',
        isCollapse: false,
        // routes: this.$store.getters.routes,
        defaultActive: '/home'
      };
    },
    mounted() {
      // console.log(this.routes)
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    computed: {
      // ...mapGetters([
      //   'routes'
      // ])
      routes() {
        let routes = this.$store.getters.routes
        console.log(routes)
        routes = routes.filter(item => {
          if (item.children && item.children.length > 0) {
            item.children = item.children.filter(subItem => {
              if (!subItem.meta.hidden) {
                return subItem
              }
            })
          }
          // console.log(item.meta.hidden)
          return !item.meta.hidden
        })

        return routes
      }
    },
    watch: {
      $route: {
        handler(to, from) {
          console.log(to.path)
          this.defaultActive = to.path
        },
        immediate: true
      }
    },
  }
</script>

<style scoped>
  .el-menu {
    border: none;
  }

  a {
    text-decoration: none !important;
  }

  .sidebar {
    transition: width 0.28s;
    width: 210px !important;
    background-color: #fff;
    /* height: calc(100% - 60px); */
    /* margin-top: 60px; */
    position: fixed;
    font-size: 0px;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
    background-color: #fff;
    border-right: 1px solid #e6e6ee;
    overflow: scroll;

  }

</style>