<!--  -->
<template>
  <div class="right-navbar">
    <div class="left">
      <div class="logo-box">
        <img src="@/assets/images/logo.png" alt="" width="20">
      </div>
    </div>
    <div class="right">
      <el-dropdown>
        <span class="el-dropdown-link">
          <span style="cursor: pointer;">个人信息</span><i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>首页</el-dropdown-item>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>

  export default {
    components: {},
    data() {
      //这里存放数据
      return {

      };
    },
    methods: {
      logout(){
        this.$store.dispatch('logout').then(()=>{
          location.reload()
        })
      }
    },
  }
</script>
<style lang='scss' scoped>
  .right-navbar {
    display: flex;
    padding: 15px;
    /* border-bottom: 1px solid #409EFF; */
    background: #409EFF;
    width: 100%;
    position: sticky;
    top: 0;
    z-index: 999;
    .left {
      flex: 1;
    }

    .right {
      width: 100px;
      text-align: right;

      .el-dropdown {
        color: #fff;
      }
    }
  }
</style>