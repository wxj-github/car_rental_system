<template>
  <div class="header">
    <span class="header-text">汽车租赁信息管理系统</span>
    <div class="header-right">
      <el-dropdown placement="bottom-start">
        <span class="el-dropdown-link icon-wrap">
          <img class="user-img" src="../assets/people.png" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="$router.push('/Usermsg')">个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="exit">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div class="header-right-text">
        <div class="header-wellcome">欢迎你，{{name}}</div>
        <div class="header-time">{{headerTime}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headerTime: "",
      name:"",
    };
  },
  methods: {
    showtime() {
      var week = [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
      ];
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var hour = date.getHours();
      var minutes = date.getMinutes();
      var second = date.getSeconds();
      this.headerTime =
        year +
        "." +
        (month < 10 ? "0" + month : month) +
        "." +
        day +
        " " +
        " " +
        hour +
        ":" +
        (minutes <10 ? "0"+minutes  : minutes)+
        ":" +
        (second < 10 ? "0" + second : second) +
        "" +
        (week[date.getDay()] || "");
    },
    getusername(){
      let loginname=sessionStorage.getItem('loginuser');//取值
      this.name=JSON.parse(loginname).username;//转换赋值
    },
    exit(){
      console.log("退出");
      sessionStorage.removeItem('loginuser');
      this.$router.push('/login');
    }
  },
  mounted() {
    this.showtime();
    setInterval(() => {
      this.showtime()
    }, 1000);
  },
  created(){
    this.getusername();
  }
    
};
</script>

<style scoped>
.header-text {
  font-size: 22px;
  font-weight: bold;
  color: #fff;
  padding-left: 25px;
}
.header-right {
  float: right;
  margin-right: 15px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.icon-wrap {
  width: 50px;
  height: 50px;
  font-size: 35px;
  margin-right: 5px;
}
.user-img {
  margin-top: 2px;
  height: 45px;
  width: 45px;
}

.header-wellcome {
  font-size: 14px;
}
.header-right-text {
  float: right;
  color: #fff;
  line-height: 15px;
  margin-top: 9px;
}
.header-time {
  float: right;
  color: #fff;
  line-height: 13px;
  margin-top: 5px;
}
</style>