<template>
  <el-form ref="ruleForm" label-width="80px" :model="formLabelAlign">
    <el-form-item label="分类">
      <el-select v-model="formLabelAlign.categoryid" placeholder="请选择" @change="hangleChange">
        <el-option
          v-for="cate in categoryData"
          :key="cate._id"
          :label="cate.name"
          :value="cate._id">
        </el-option>
      </el-select>
    </el-form-item>
    
    <el-form-item label="标题">
      <el-input v-model="formLabelAlign.title"></el-input>
    </el-form-item>
    <el-form-item label="副标题">
      <el-input v-model="formLabelAlign.subTitle"></el-input>
    </el-form-item>
    <el-form-item label="内容">
      <!-- <el-input v-model="formLabelAlign.content"></el-input> -->
      <vue-editor v-model="formLabelAlign.content" />
    </el-form-item>
    
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
   import { create,categoryList } from '@/api/user/article'
  export default {
    components: {},
    data() {
      return {
        userId: null,
        formLabelAlign: {
          categoryid: '',
          title: '',
          subTitle: '',
          content: '',
        },
        categoryData: []
      };
    },
    computed: {},
    watch: {},
    methods: {
      async category(){
        const res = await categoryList()
        const { code, result} = res
        if (code === 200){
          this.categoryData = result
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.formLabelAlign = {...this.formLabelAlign, ...{userId: this.userId}}
            create(this.formLabelAlign).then((res) => {
              const { code, message } = res
              if (code === 200) {
                this.$message({
                  message: message,
                  type: 'success'
                });
                this.$router.go(-1);
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      hangleChange(val){
        this.formLabelAlign.subTitle = val
      }
    },
    created() {
      this.userId = this.$route.query.userId
    },
    mounted() {
      this.category()
    },
  }
</script>
<style lang='scss' scoped>

</style>