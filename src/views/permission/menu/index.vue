<!--  -->
<template>
  <div class="menu-container">
    <div>
      <el-button size="mini" type="primary" @click="addMenu">添加菜单</el-button>
    </div>
    <br>
    <!-- <el-cascader-panel :options="menus" :props="menusPropsList"></el-cascader-panel> -->

    <el-table size="small" :data="menus" style="width: 100%;margin-bottom: 20px;" row-key="_id" border
      default-expand-all :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column prop="_id" label="ID" sortable width="300">
      </el-table-column>
      <el-table-column prop="path" label="路由 path" sortable width="200">
      </el-table-column>
      <el-table-column prop="name" label="路由 name">
      </el-table-column>
      <el-table-column prop="component" label="路由 component">
      </el-table-column>
      <el-table-column label="路由 hidden">
        <template slot-scope="scope">
          {{scope.row.meta.hidden}}
        </template>
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

    <el-dialog title="添加菜单" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="formValidate">
        <el-form-item label="">
          <el-cascader-panel ref="cascader" @change="handleCascaderPanel" v-model="cascaderPanelData" :options="menus"
            :props="menusProps"></el-cascader-panel>
        </el-form-item>
        <el-form-item prop="parent_id" label="parent_id" :label-width="formLabelWidth">
          <el-input v-model="form.parent_id" disabled></el-input>
        </el-form-item>
        <el-form-item prop="path" label="路由路径（path）" :label-width="formLabelWidth">
          <el-input v-model="form.path"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="路由名称（name）" :label-width="formLabelWidth">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item prop="component" label="路由组件（component）" :label-width="formLabelWidth">
          <el-input v-model="form.component"></el-input>
        </el-form-item>
        <el-form-item prop="redirectTo" label="路由重定向（redirectTo）" :label-width="formLabelWidth">
          <el-input v-model="form.redirectTo"></el-input>
        </el-form-item>
        <el-form-item label="路由设置（meta）" :label-width="formLabelWidth">
          <el-input placeholder="title" v-model="form.meta.title"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth">
          <el-input placeholder="icon" v-model="form.meta.icon"></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth">
          <el-radio-group v-model="form.meta.hidden" size="mini">
            <el-radio :label="true" border>不显示</el-radio>
            <el-radio :label="false" border>显示</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="level" label="路由层级（level）" :label-width="formLabelWidth">
          <el-input v-model.number="form.level" placeholder="Number"></el-input>
        </el-form-item>
        <el-form-item style="text-align: center;">
          <el-button type="primary" @click="handleCreateMenu('formValidate')" size="mini">{{statusBtn==1?'立即创建':'更新'}}
          </el-button>
          <el-button size="mini" @click="dialogFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import { menus, createMenu, delMenu, detailMenu, updateMenu } from '@/api/permission/menu'
  export default {
    components: {

    },
    data() {
      return {
        menus: [],
        menusPropsList: {
          value: '_id',
          label: 'title',
          children: 'children',
        },
        menusProps: {
          value: '_id',
          label: 'title',
          children: 'children',
          checkStrictly: true
        },
        formLabelWidth: '200px',
        dialogFormVisible: false,
        form: {
          group_ids: [],
          parent_id: 0,
          path: '',
          name: '',
          component: '',
          redirectTo: '',
          meta: {
            title: '',
            icon: '',
            hidden: false
          },
          level: '',

        },
        cascaderPanelData: [],
        rules: {
          group_ids: [{ required: true, message: '组ids不能为空' }],
          parent_id: [{ required: true, message: '父级id不能为空', trigger: 'blur' }],
          path: [
            { required: true, message: '路由路径（path）不能为空', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '路由路径（name）不能为空', trigger: 'blur' }
          ],
          component: [
            { required: true, message: '路由组件（name）不能为空', trigger: 'blur' }
          ],
          redirectTo: [
            { required: true, message: '路由重定向（redirectTo）不能为空', trigger: 'blur' }
          ],
        },
        statusBtn: 1, //  1 为添加 2 为编辑
      };
    },
    computed: {},
    watch: {},
    methods: {
      async getMenus() {
        const res = await menus();
        const { code, result } = res
        if (code === 200) {
          this.menus = this.reMenus(result)
        }
      },
      reMenus(result) {
        result = result.map((item) => {
          if (item.children && item.children.length > 0) {
            item.children.map((subItem) => {
              subItem.title = subItem.meta.title
            })
            this.reMenus(item.children)
          }
          item.title = item.meta.title
          return item
        })
        return result
      },
      addMenu() {
        this.statusBtn = 1
        this.dialogFormVisible = true
        for (const key in this.form) {
          if (this.form.hasOwnProperty(key)) {

            if (typeof this.form[key] === 'object') {
              if (Array.isArray(this.form[key])) {
                for (const subkey of this.form[key]) {  // 此处最多只能有两层数据 多层需做递归处理
                  subkey = []
                }
              } else {
                for (const subkey in this.form[key]) {  // 此处最多只能有两层数据 多层需做递归处理
                  this.form[key][subkey] = ''
                }
              }

            } else {
              if (key !== 'parent_id') {
                this.form[key] = '';
              }

            }
          }
        }
      },
      handleCreateMenu(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            const res = this.statusBtn === 1 ? await createMenu(this.form) : await updateMenu(this.form)
            const { code, data, message } = res
            this.dialogFormVisible = false
            this.$message({
              type: 'success',
              message: message
            })
            this.getMenus()
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },
      handleCascaderPanel() {
        let len = this.cascaderPanelData.length,
          cloneData = this.cascaderPanelData.slice(0);
        this.form.group_ids = this.cascaderPanelData.slice(0);
        if (len >= 2) {
          this.form.parent_id = cloneData.splice(len - 2, 1).join('')
        } else {
          this.form.parent_id = cloneData.splice(0, 1).join('')
        }
      },

      async deleteMenu(id) {
        this.$confirm('删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res = await delMenu({ id })
          const { code, message } = res
          this.$message({
            type: 'success',
            message: message
          })
          this.getMenus()
        }).catch((error) => {
          console.log(error)
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },

      async editMenu(id) {
        this.statusBtn = 2
        this.dialogFormVisible = true
        const res = await detailMenu({ id })
        const { code, data } = res
        if (code === 200) {
          for (const key in data) {
            if (data.hasOwnProperty(key)) {
              this.form[key] = data[key]
              if (key === 'group_ids') {
                this.cascaderPanelData = this.form[key]
              }
            }
          }
        }
      },
    },

    created() {
      this.getMenus()
    },
    mounted() {

    },
  }
</script>
<style lang="scss" scoped>
</style>