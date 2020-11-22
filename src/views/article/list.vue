<template>
  <div>
    <div style="margin-bottom: 15px;">
      <div style="display: flex;">
        <h2 style="margin-right: 10px;">文章列表 </h2>
        <router-link :to="{name: 'CreateArticle', query: {userId: userId}}">
          <el-button type="default" size="small">添加</el-button>
        </router-link>
      </div>
    </div>
    <el-table :data="articleTableData" style="width: 100%" border>
      <el-table-column type="index" :index="1"></el-table-column>
      <el-table-column prop="title" label="标题">
      </el-table-column>
      <el-table-column prop="subTitle" label="副标题">
      </el-table-column>
      <!-- <el-table-column prop="content" label="内容" width="300">
      </el-table-column> -->
      <el-table-column label="创建时间" width="220">
        <template slot-scope="scope">
          {{scope.row.create_time | formatDate}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <div>
            <router-link tag="a" target="_blank" :to="{name: 'DetailArticle', query: {id: scope.row._id}}">
              <el-button type="success" size="mini">查看详情</el-button>
            </router-link>
            <el-button type="danger" size="mini" @click="deleteArticle(scope.row._id)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <br>
  </div>
</template>

<script>
  import { lists, del } from '@/api/user/article'
  export default {
    data() {
      return {
        userId: null,
        articleTableData: [],
      }
    },
    created() {
    },
    mounted() {
      this.userId = this.$route.query.userId
      this.getArticleList({ userId: this.userId })
    },
    methods: {
      async getArticleList(condi) {
        const res = await lists(condi)
        const { code, result } = res
        if (code === 200) {
          this.articleTableData = result;
        }
      },
      async deleteArticle(id) {
        this.$confirm('删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res = await del({ id })
          const { code, message } = res
          if (code === 200) {
            this.getArticleList({ userId: this.userId })
            this.$message({
              type: 'success',
              message: message
            });
          }

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
    }
  }
</script>

<style lang="scss" scoped>

</style>