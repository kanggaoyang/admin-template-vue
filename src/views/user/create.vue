<!--  -->
<template>
  <div class="container">
    <el-form ref="ruleForm" label-width="80px" :model="formLabelAlign">
      <el-form-item label="Username">
        <el-input v-model="formLabelAlign.name"></el-input>
      </el-form-item>
      <el-form-item label="Email">
        <el-input v-model="formLabelAlign.email"></el-input>
      </el-form-item>
      <el-form-item label="Sex">
        <el-input v-model="formLabelAlign.sex"></el-input>
      </el-form-item>
      <el-form-item label="Password">
        <el-input v-model="formLabelAlign.password"></el-input>
      </el-form-item>
      <el-form-item label="用户头像">
        <el-upload class="avatar-uploader" :action="base_url+'/uploadImg'" :show-file-list="false"
          :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { create } from '@/api/user'
  export default {
    //import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
      
      return {
        base_url: process.env.VUE_APP_BASE_API,
        imageUrl: '',
        formLabelAlign: {
          name: '康高阳_' + Math.random().toString(16).substr(2),
          email: Math.random().toString(10).substr(2, 9) + '@qq.com',
          sex: '男',
          password: '',
          pic: '',
          all_pic: '',
        }
      };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
      back() {
        if (window.history.length <= 1) {
          this.$router.push({ path: "/" });
          return false;
        } else {
          this.$router.go(-1);
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
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
      handleAvatarSuccess(res, file) {
        console.log(res)
        this.imageUrl = this.formLabelAlign.all_pic = res.data.all_url
        this.formLabelAlign.pic = res.data.filename
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {

    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {

    },
  }
</script>
<style lang='scss' scoped>
  ::v-deep .avatar-uploader {
    .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>