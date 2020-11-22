<template>
  <div>
    <div style="margin-bottom: 15px;">
      <div style="display: flex;">
        <h2 style="margin-right: 10px;">用户列表 </h2>
        <router-link to="create" name="CreateUser">
          <el-button type="default" size="small">添加</el-button>
        </router-link>
      </div>
      <br>
      <div>
        <el-input v-model="username" placeholder="用户名" style="width: 200px;margin-right: 15px;"></el-input>
        <el-button type="primary" @click="handleSearch">search</el-button>
      </div>
      <div style="margin-top: 10px">
        <el-button type="danger" size="mini" @click="handleManyDelete">批量删除</el-button>
      </div>
    </div>
    <el-table :data="userTableData" style="width: 100%" border @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="_id" label="ID" width="260">
      </el-table-column>
      <el-table-column prop="name" label="用户名" width="180">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="260">
      </el-table-column>
      <el-table-column prop="sex" label="性别">
      </el-table-column>
      <el-table-column prop="password" label="密码" width="180">
      </el-table-column>
      <el-table-column prop="create_time" label="创建时间" width="220">
        <template slot-scope="scope">
          {{scope.row.create_time | formatDate}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="220">
        <template slot-scope="scope">
          <div>
            <router-link :to="{name: 'Article', query: {userId: scope.row._id}}">
              <el-button type="primary" size="mini">查看文章</el-button>
            </router-link>
            <router-link :to="{path: 'edit', query: {id: scope.row._id}}">
              <el-button type="success" size="mini">编辑</el-button>
            </router-link>
            <el-button type="danger" size="mini" @click="deleteUser(scope.row._id)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <br>
    <el-pagination background layout="total, sizes, prev, pager, next" :totalPage="totalPage" :total="total" :page-size="pageSize"
    :page-sizes="[10, 20, 30, 40]" :current-page.sync="currentPage" @size-change="handleSizeChange" @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>

<script>
  import { lists, del, delMany } from '@/api/user'
  export default {
    data() {
      return {
        userTableData: [],
        username: '',
        multipleSelection: [],
        currentPage: 1,
        pageSize: 5,
        total: 0,
        totalPage: 0
      }
    },
    mounted() {
      this.getUserList()
    },
    methods: {
      async getUserList(condi) {
        const res = await lists(condi)
        const { code, result } = res
        if (code === 200) {
          this.userTableData = result.list;
          this.total = result.total;
          this.totalPage = result.page
        }
      },
      async deleteUser(id) {
        this.$confirm('删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res = await del({ id })
          const { code, result } = res
          if (code === 200) {
            this.getUserList()
          }
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        })

      },
      handleSearch() {
        this.currentPage = 1;
        this.getUserList({ name: this.username, page: this.currentPage })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val.map((item) => {
          return item._id;
        })
        console.log(this.multipleSelection)
      },
      handleSizeChange(val) {
        this.currentPage = 1;
        this.getUserList({ name: this.username, pageSize: val, page: this.currentPage })
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.getUserList({ name: this.username, page: val })
      },
      async handleManyDelete() {
        if (this.multipleSelection.length === 0) {
          this.$message({
            type: 'warning',
            message: '请选择要删除的用户！'
          });
          return
        }
        this.$confirm('批量删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res = await delMany({ ids: this.multipleSelection })
          const { code, message } = res
          if (code === 200) {
            this.$message({
              type: 'success',
              message: message
            });
            this.getUserList()
          }
        })

      }
    },
  }
</script>

<style lang="scss" scoped>

</style>