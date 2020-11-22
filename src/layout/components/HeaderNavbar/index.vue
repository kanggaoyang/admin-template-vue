<template>
  <div class="header-navbar">
      <ul class="p-menus">
        <!-- <li class="p-menu" v-for="route in getRoutes" :key="route.path" :item="route" :base-path="route.path">{{generateTitle(route.meta.title)}}</li> -->
        <li class="p-menu">首页</li>
        <li class="p-menu">权限测试页
          <ul class="sub-menus">
            <li class="sub-menu">
              <div>指令权限</div>
              <ul>
                <li class="s-sub-menu">
                  <router-link to="/table/complex-table">三级菜单-1</router-link>
                </li>
                <li class="s-sub-menu">三级菜单-2</li>
                <li class="s-sub-menu">三级菜单-3</li>
              </ul>
            </li>
            <li class="sub-menu">
              <div>指令权限</div>
              <ul>
                <li class="s-sub-menu">三级菜单-1</li>
                <li class="s-sub-menu">三级菜单-2</li>
                <li class="s-sub-menu">三级菜单-3</li>
              </ul>
            </li>
            <li class="sub-menu">
              <div>指令权限</div>
              <ul>
                <li class="s-sub-menu">三级菜单-1</li>
                <li class="s-sub-menu">三级菜单-2</li>
                <li class="s-sub-menu">三级菜单-3</li>
              </ul>
            </li>
          </ul>
        </li>
        <li class="p-menu">图标
          <ul class="sub-menus">
            <li class="sub-menu">
              <div>指令权限</div>
              <ul>
                <li class="s-sub-menu">
                  <router-link to="/table/complex-table">三级菜单-1</router-link>
                </li>
                <li class="s-sub-menu">三级菜单-2</li>
                <li class="s-sub-menu">三级菜单-3</li>
              </ul>
            </li>
            <li class="sub-menu">
              <div>指令权限</div>
              <ul>
                <li class="s-sub-menu">三级菜单-1</li>
                <li class="s-sub-menu">三级菜单-2</li>
                <li class="s-sub-menu">三级菜单-3</li>
              </ul>
            </li>
            <li class="sub-menu">
              <div>指令权限</div>
              <ul>
                <li class="s-sub-menu">三级菜单-1</li>
                <li class="s-sub-menu">三级菜单-2</li>
                <li class="s-sub-menu">三级菜单-3</li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
  </div>
</template>

<script>
  export default {
    data(){
      return {
      }
    },
    mounted() {
    },
    methods: {
    },
    computed: {
     
      
    },
  }
</script>

<style lang="scss" scoped>
  ul{
    list-style-type:none;
    padding: 0;
  }
  .header-navbar{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #00a1dd;
    z-index: 1000;
    .p-menus{
      /* text-align: center; */
      margin-left: 100px;
      .p-menu{
        display: inline-block;
        position: relative;
        height: 60px;
        background: transparent;
        color: #fff;
        text-align: center;
        line-height: 60px;
        transition: .5s;
        padding-left: 30px;
        padding-right: 30px;
        margin-right: 5px;
        z-index: 1000;
        cursor: pointer;
        .sub-menus{
          /* display: none; */
          visibility: hidden;
          /* height: 0; */
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          padding: 15px 15px 0 15px;
          background-color: #fff;
          box-shadow: 0 0 6px 0 rgba(0,34,77,.5);
          line-height: 30px;
          border-bottom-left-radius: 5px;
          border-bottom-right-radius: 5px;
          white-space: nowrap;
          color: #434649;
          opacity: 0;
          transition: .5s;
          z-index: 1000;
          .sub-menu{
            display: flex;
            padding-bottom: 10px;
            padding-top: 10px;
            font-weight: 600;
            font-size: 14px;
            border-bottom: 1px dashed #f0f0f0;
            &:first-child{
              padding-top: 0;
            }
            &:last-child{
              border: none;
            }
            ul{
              margin-left: 30px;
              display: flex;
              li{
                margin-right: 15px;
                &.s-sub-menu{
                  color: #434649;
                  font-weight: 400;
                  padding: 0px 8px;
                  border-radius: 4px;
                }
                &:hover{
                  color: #FFF;
                  background-color: #428bca;
                }
              }
            }
          }
        }
        &.active{
          background: #337ab7;
          
        }
        &:hover{
          color: #d2f3ff;
          background-color: #337ab7;
          /* border-bottom: 2px solid #1890ff; */
        }
        &:hover .sub-menus{
          /* height: 200px; */
          visibility:visible;
          opacity: 1;
        }

      }
    }
  }
</style>