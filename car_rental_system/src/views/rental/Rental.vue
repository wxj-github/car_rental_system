<template>
  <div class="container">
    <div class="aside" v-bind:style="aside_width">
      <div class="fold">
        <i v-bind:class="fold_icon" @click="fold"></i>
      </div>
      <el-dropdown>
        <span class="el-dropdown-link">
          <i v-bind:class="location_icon"></i>
          <span v-show="isShow">{{ location }}</span>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="i in city"
            :key="i"
            @click.native="cities(i)"
            >{{ i }}</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
      <el-button @click="navbtn(1)" v-bind:class="{ active: isActive1 }">
        <i class="el-icon-shopping-cart-2"></i>
        <span v-show="isShow">生成订单</span>
      </el-button>
      <el-button @click="navbtn(2)" v-bind:class="{ active: isActive2 }">
        <i class="el-icon-map-location"></i>
        <span v-show="isShow">订单跟踪</span>
      </el-button>
      <el-button @click="navbtn(3)" v-bind:class="{ active: isActive3 }">
        <i class="el-icon-timer"></i>
        <span v-show="isShow">历史订单</span>
      </el-button>
    </div>
    <div class="main" :style="main_width">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //获取当前登录用户姓名
      user: "陈奕迅",
      //记录门店
      location: "选择门店",
      //用来隐藏侧边导航栏文字
      isShow: true,
      location_icon: "el-icon-location",
      aside_width: "width:120px;",
      main_width: "width:90%;",
      fold_icon: "el-icon-arrow-left",
      //门店假数据
      city: ["广州", "深圳", "东莞", "肇庆"],
      isActive1: this.$route.path == "/rental/add",
      isActive2: this.$route.path == "/rental/find",
      isActive3: this.$route.path == "/rental/old",
    };
  },
  methods: {
    cities(city) {
      this.location = city;
      this.location_icon = "el-icon-location l-icon";
    },
    fold() {
      if (this.fold_icon == "el-icon-arrow-left") {
        this.fold_icon = "el-icon-arrow-right";
        this.aside_width = "width:35px;";
        this.main_width = "width:95%;";
        this.isShow = false;
      } else {
        this.fold_icon = "el-icon-arrow-left";
        this.aside_width = "width:120px;";
        this.main_width = "width:90%;";
        this.isShow = true;
      }
    },
    navbtn(n) {
      if (n == 1) {
        this.isActive1 = true;
        this.isActive2 = false;
        this.isActive3 = false;
        this.$router.push("add");
      } else if (n == 2) {
        this.isActive1 = false;
        this.isActive2 = true;
        this.isActive3 = false;
        this.$router.push("find");
      } else {
        this.isActive1 = false;
        this.isActive2 = false;
        this.isActive3 = true;
        this.$router.push("old");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 86.5%;
  height: 700px;
  margin-left: 200px;
  // height: 100%;
  background-color: rgb(244, 244, 245);
  border: 1px solid #c0c4cc;
  position: relative;

  .aside {
    height: 100%;
    border-right: 1px solid #c0c4cc;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    z-index: 999;
    top: 0;
    left: 0;
    transition: all 0.5s;
    background-color: white;
    .fold {
      width: 80%;
      height: 30px;
      border-bottom: 1px solid #c0c4cc;
      &:hover {
        border-bottom: 1px solid rgb(64, 158, 255);
      }
      i {
        width: 30px;
        height: 100%;
        font-size: 25px;
        color: rgb(94, 109, 130);
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        cursor: pointer;
        &:hover {
          color: rgb(64, 158, 255);
        }
      }
    }
    .el-dropdown {
      width: 80%;
      height: 30px;
      margin-top: 30px;
      overflow: hidden;
      .el-dropdown-link {
        cursor: pointer;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #606266;
        font-size: 15px;
        i {
          font-size: 20px;
          animation: color 0.5s infinite linear alternate;
          @keyframes color {
            from {
              color: white;
            }
            to {
              color: #ff0000;
            }
          }
        }
        .l-icon {
          color: #ff0000;
          animation: none;
        }
        span {
          height: 100%;
          display: flex;
          align-items: center;
          white-space: nowrap;
          margin-left: 2px;
        }
      }
    }
    .el-button {
      width: 80%;
      height: 30px;
      margin: 0;
      padding: 0;
      margin-top: 30px;
      font-size: 15px;
      border-radius: 0;
      border: none;
      color: rgb(94, 109, 130);
      overflow: hidden;
      background-color: transparent;
      i {
        font-size: 20px;
      }
      &:hover {
        background-color: transparent;
        border-bottom: 1px solid rgb(64, 158, 255);
      }
      &:hover i {
        color: #ff0000;
        animation: run 0.3s infinite alternate;
        @keyframes run {
          from {
            transform: translateY(0) rotateZ(20deg);
          }
          to {
            transform: translateY(-3px) rotateZ(-20deg);
          }
        }
      }
    }
    .active {
      background-color: transparent;
      border-bottom: 1px solid rgb(64, 158, 255);
      i {
        color: #ff0000;
      }
    }
  }
  .main {
    height: 100%;
    position: absolute;
    right: 0;
  }
}
</style>
