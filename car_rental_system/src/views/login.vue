<template>
  <div class="bgc">
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      label-width="80px"
      class="login_layout"
    >
      <h2>汽车租赁管理系统</h2>
      <el-form-item label="账号：" prop="username">
        <el-input v-model="form.username" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码：" prop="pwd">
        <el-input
          v-model="form.pwd"
          placeholder="请输入密码"
          type="password"
          @keyup.enter.native="debounce(submitForm, 500, false, 'form')()"
        ></el-input>
      </el-form-item>
      <el-button
        type="primary"
        @click="debounce(submitForm, 500, false, 'form')()"
        class="btn_login"
        >登录</el-button
      >
      <el-button type="primary" @click="reset()">重置</el-button>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      form: {
        username: "",
        pwd: "",
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入账号",
            trigger: "blur",
          },
        ],
        pwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
        timeout: null, //不在这里存储变量，清除不了定时器
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.login();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    debounce(func, wait, immediate, arg) {
      return () => {
        // console.log(this.timeout);
        clearTimeout(this.timeout);
        if (immediate) {
          let callnow = !this.timeout;
          this.timeout = window.setTimeout(() => {
            this.timeout = null;
          }, wait);
          if (callnow) {
            func(arg);
          }
        } else {
          this.timeout = window.setTimeout(() => {
            func(arg);
          }, wait);
        }
      };
    },
    reset() {
      this.form.username = "";
      this.form.pwd = "";
    },
    login() {
      axios
        .get(
          `http://localhost:3000/userlist?username=${this.form.username}&password=${this.form.pwd}`
        )
        .then((res) => {
          //判断长度来看是否是否正确，为0提示用户不存在或密码错误
          if (res.data.length == 0) {
            this.$message({
              type: "error",
              message: "登录失败！用户不存在或密码错误！",
            });
          } else {
            //账户密码正确，登录成功，跳转，并写入session
            sessionStorage.setItem("loginuser", JSON.stringify(res.data[0]));
            this.$message({
              type: "success",
              message: "登录成功！",
            });
            setTimeout(() => {
              this.$router.push("/");
            }, 500);
          }
        });
    },
  },
};
</script>

<style scoped>
.bgc {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("../assets/car2.jpg") no-repeat center top;
  background-position: -238px -161px;
  overflow: hidden;
}
.login_layout {
  width: 400px;
  height: 250px;
  background-color: rgb(205, 205, 245, 0.8);
  box-shadow: 0 0 25px #cac6c6;
  margin: 150px auto;
  border-radius: 30px;
  padding: 30px;
}
h2 {
  text-align: center;
}
.btn_login {
  margin-left: 100px;
  margin-right: 80px;
}
</style>