<!--  -->
<template>
  <div class="admin-container">
    <div>
      <el-button size="mini" type="primary" @click="addAdmin">添加管理员</el-button>
    </div>
    <br>
    <el-table size="small" :data="admins" style="width: 100%;margin-bottom: 20px;" row-key="_id" border
      default-expand-all :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column prop="_id" label="ID" sortable>
      </el-table-column>
      <el-table-column prop="username" label="用户名" sortable>
      </el-table-column>
      <el-table-column prop="email" label="邮箱" sortable>
      </el-table-column>
      <el-table-column prop="role" label="角色" sortable>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <div>
            <el-button size="mini" type="danger" plain @click="deleteMenu(scope.row._id)">删除</el-button>
            <el-button size="mini" type="success" plain @click="editMenu(scope.row._id)">编辑</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加管理员" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" size="small" :model="form" ref="adminFormRef">
        <el-form-item label="用户名：" :label-width="formLabelWidth" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码：" :label-width="formLabelWidth" prop="password">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：" :label-width="formLabelWidth" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="角色：" :label-width="formLabelWidth" prop="roleId">
          <el-radio-group v-model="form.roleId">
            <el-radio v-for="item in roleCates" :label="item.label" :key="item.label">{{item.name}}</el-radio>
          </el-radio-group>
          <!-- <el-checkbox-group v-model="form.role">
            <el-checkbox v-for="item in roleCates" :label="item.label" :key="item.label">{{item.name}}</el-checkbox>
          </el-checkbox-group> -->
        </el-form-item>
        <el-form-item>
          <div style="text-align: center;" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleConfirm('adminFormRef')">{{statusBtn==1?'创 建':'更新'}}</el-button>
          </div>
        </el-form-item>
      </el-form>

    </el-dialog>
  </div>
</template>

<script>
  import { list, create, del, detail, update } from '@/api/permission/admin'
  import { roleList } from '@/api/permission/role'
  export default {
    name: 'AdminPermission',
    components: {},
    data() {
      return {
        admins: [],
        formLabelWidth: '120px',
        dialogFormVisible: false,
        form: {
          username: '',
          password: '',
          email: '',
          roleId: ''
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
          roleId: [
            { required: true, message: '请选择角色' },
          ],
        },

        roleCates: [],
        statusBtn: 1,
        adminId: null,
      };
    },
    computed: {},
    watch: {},
    methods: {
      getList() {
        list().then(res => {
          console.log(res)
          const { code, data } = res
          this.admins = data
        }).catch(error => {
          console.log(error)
        })
      },
      getRoleList() {
        roleList().then(res => {
          const { result } = res
          console.log(result)
          this.roleCates = result.map(item => {
            return {
              label: item._id,
              name: item.rolename
            }
          })
        }).catch(error => {
          console.log(error)
        })
      },
      addAdmin() {
        this.dialogFormVisible = true
        this.statusBtn = 1
      },
      handleConfirm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.statusBtn === 1) {
              create(this.form).then(res => {
                this.dialogFormVisible = false
                const { code, message } = res
                this.$message({
                  type: 'success',
                  message
                })
                this.getList()
              }).catch(error => {
                console.log(error)
              })
            }else{
              update({...this.form, ...{_id: this.adminId}}).then(res => {
                this.dialogFormVisible = false
                const { code, message } = res
                this.$message({
                  type: 'success',
                  message
                })
                this.getList()
              }).catch(error => {
                console.log(error)
              })
            }

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      deleteMenu(id) {
        this.$confirm('删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          del({ id }).then(res => {
            const { message } = res
            this.$message({
              type: 'success',
              message
            })
            this.getList()
          }).catch(error => {

          })

        }).catch((error) => {
          console.log(error)
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      editMenu(id) {
        this.adminId = id
        this.dialogFormVisible = true
        this.statusBtn = 2
        detail({ id }).then(res => {
          console.log(res)
          const { result } = res
          for (const key in result) {
            if (this.form.hasOwnProperty(key)) {
              const el = result[key];
              this.form[key] = el
            }
          }
          console.log(this.form)
        }).catch(error => {
          console.log(error)
        })
      }
    },
    created() {
      this.getList()
      this.getRoleList()
    },
    mounted() {

    },
  }
</script>
<style lang='scss' scoped>

</style>