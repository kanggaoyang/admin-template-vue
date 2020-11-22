<template>
  <div v-if="!item.hidden && item.children">
    <template v-if="(item.children.length == 0 || (item.children.length == 1 && item.onlySingleChild))">
      <el-menu-item :index="item.path">
        <span slot="title">{{item.meta && item.meta.title}}</span>
      </el-menu-item>
    </template>


    <el-submenu v-else :index="item.path">
      
      <template slot="title">
        <span>{{item.meta && item.meta.title}}</span>
      </template>

      <template v-for="(child,index) in item.children">

        <sidebar-item v-if="child.children && child.children.length>0" :item="child" :key="child.path"></sidebar-item>

        <el-menu-item v-else :key="child.path" :index="child.path">
          {{child.meta.title}}
        </el-menu-item>

      </template>


    </el-submenu>

  </div>
</template>

<script>
  import path from 'path'
  export default {
    components: {},
    name: 'sidebarItem',
    props: {
      item: {
        type: Object,
      },
      basePath: {
        type: String,
        default: ''
      }
    },
    data() {
      return {

      };
    },
    computed: {

    },
    watch: {},
    //方法集合
    methods: {
      resolvePath(routePath) {
        if (this.isExternal(routePath)) {
          return routePath
        }
        if (this.isExternal(this.basePath)) {
          return this.basePath
        }
        return path.resolve(this.basePath, routePath)
      },
      isExternal(path) {
        return /^(https?:|mailto:|tel:)/.test(path)
      }
    },
    created() {
      // console.log(this.item)
    },
    mounted() {
      // console.log(this.item)
    },
  }
</script>
<style lang='scss' scoped>

</style>