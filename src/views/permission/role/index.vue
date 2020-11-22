<!--  -->
<template>
  <div class="Role-container">
    <div>
      <el-button size="mini" type="primary" @click="addRole">添加角色</el-button>
    </div>
    <br>

    <el-table size="small" :data="roles" style="width: 100%;margin-bottom: 20px;" row-key="_id" border
      default-expand-all :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column prop="_id" label="ID" sortable width="300">
      </el-table-column>
      <el-table-column prop="rolename" label="角色名称" sortable width="200">
      </el-table-column>
      <el-table-column prop="desc" label="描述">
      </el-table-column>
      <el-table-column prop="create_time" label="创建时间">
        <template slot-scope="scope">
          <div>
            {{scope.row.create_time | formatDate('datetime')}}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <div>
            {{scope.row.status == 0 ? '禁用' : '启用'}}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <div>
            <el-button size="mini" type="primary" plain @click="permissionSetting(scope.row._id)">权限设置</el-button>
            <el-button size="mini" type="danger" plain @click="deleteRole(scope.row._id)">删除</el-button>
            <el-button size="mini" type="success" plain @click="editRole(scope.row._id)">编辑</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="角色" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="formValidate">
        <el-form-item prop="rolename" label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="form.rolename"></el-input>
        </el-form-item>
        <el-form-item prop="desc" label="角色描述" :label-width="formLabelWidth">
          <el-input v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-radio-group v-model="form.status" size="mini">
            <el-radio :label="0" border>禁用</el-radio>
            <el-radio :label="1" border>启用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item style="text-align: center;">
          <el-button type="primary" @click="handleCreateRole('formValidate')" size="mini">{{statusBtn==1?'立即创建':'更新'}}
          </el-button>
          <el-button size="mini" @click="dialogFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="设置权限" :visible.sync="settingPermissionVisable" @close="settingPermissionClose">
      <el-tree ref="tree" :data="settingData" show-checkbox node-key="id"
        :props="defaultProps" @check-change="handleGetCheckedNodes" :default-checked-keys="defaultCheckedKeys">
      </el-tree>
      <div slot="footer" style="text-align: center;">
        <el-button type="primary" @click="handleSettingAuth()" size="mini">设置
        </el-button>
        <el-button size="mini" @click="settingPermissionVisable = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { roleList, createRole, delRole, detailRole, updateRole, authRole, authList } from '@/api/permission/role'
  import { menus } from '@/api/permission/menu'
  export default {
    components: {

    },
    data() {
      return {
        roles: [],
        formLabelWidth: '100px',
        dialogFormVisible: false,
        form: {
          rolename: '',
          desc: '',
          status: 1
        },
        rules: {
          rolename: [{ required: true, message: '角色名称不能为空' }],
          desc: [{ required: true, message: '角色描述不能为空', trigger: 'blur' }],
        },
        statusBtn: 1, //  1 为添加 2 为编辑
        settingData: [], // 路有权限数据
        defaultCheckedKeys: [], // tree 默认选中值
        settingPermissionVisable: false,
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        menuId: [],
        roleId: null,
      };
    },
    computed: {},
    watch: {},
    methods: {
      async getRoles() {
        const res = await roleList();
        const { code, result } = res
        this.roles = result
      },
      addRole() {
        this.statusBtn = 1
        this.dialogFormVisible = true
      },
      handleCreateRole(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            const res = this.statusBtn === 1 ? await createRole(this.form) : await updateRole(this.form)
            const { code, message } = res
            this.dialogFormVisible = false
            this.$message({
              type: 'success',
              message: message
            })
            this.getRoles()
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },

      async deleteRole(id) {
        this.$confirm('删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res = await delRole({ id })
          const { code, message } = res
          this.$message({
            type: 'success',
            message: message
          })
          this.getRoles()
        }).catch((error) => {
          console.log(error)
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },

      async editRole(id) {
        this.statusBtn = 2
        this.dialogFormVisible = true
        const res = await detailRole({ id })
        const { code, result } = res
        for (const key in result) {
          if (result.hasOwnProperty(key)) {
            this.form[key] = result[key]
          }
        }
      },

      async permissionSetting(id) {
        this.settingPermissionVisable = true
        this.roleId = id
        this.defaultCheckedKeys = []
        await this.getMenus()  // 先获取 菜单列表 在获取选中 授权菜单
        await authList({roleId: id}).then(res=>{
          const { result } = res
          const { menuId=[] } = result === null ? {} : result  // 后端返回 数据 null 需要做处理
          this.defaultCheckedKeys = menuId  // 默认选中 菜单 id
          
        }).catch(err=>{
          console.log(err)
        })
      },

      getMenus() {
        menus().then(res => {
          const { result } = res
          this.settingData = this.tree(result)
        }).catch(error => {
          console.log(error)
        })
      },

      tree(routes) {
        let dataClone = []
        for (const route of routes) {
          const children = this.childTree(route.children)
          dataClone.push({
            id: route._id,
            children: children,
            label: route.meta.title
          })
        }
        return dataClone
      },
      childTree(childRoutes=[]){
        let childClone = []
        for (const childroute of childRoutes) {
          childClone.push({
            id: childroute._id,
            children: childroute.children,
            label: childroute.meta.title
          })
        }
        return childClone
      },
      // 设置权限
      handleSettingAuth(){
        authRole({
          menuId: this.menuId,
          roleId: this.roleId
        }).then(res=>{
          const { message } = res
          this.$message({
            type: 'success',
            message: message
          })
          this.settingPermissionVisable = false
        }).catch(err=>{
          console.log(err)
        })
      },
      
      handleGetCheckedNodes(){
        let res = this.$refs.tree.getCheckedKeys()
        this.menuId = res
      },
      // 设置权限 dialog close callback  
      settingPermissionClose(){
        this.defaultCheckedKeys = []
      }
    },

    created() {
      this.getRoles()
      // this.getMenus();
    },
    mounted() {
    },
  }
</script>
<style lang="scss" scoped>
</style>