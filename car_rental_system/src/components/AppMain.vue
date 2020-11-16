<template>
  <div>
    <i
      class="arrow-icon"
      :class="[this.$store.state.isCollapse ? 'el-icon-s-unfold' : ' el-icon-s-fold']"
      @click="$store.commit('changeisCollapse')"
    ></i>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item class="title" v-show="$route.path!='/'">
        <span class="shu">|</span>
        <b>{{$route.meta.title}}</b>
      </el-breadcrumb-item>
      <el-breadcrumb-item class="title" v-if="$route.path=='/'">
        <span class="shu">|</span>
        <b>首页</b>
      </el-breadcrumb-item>
      <el-breadcrumb-item v-if="$route.path!='/'">
        <b class="back" @click="$router.push('/')">返回首页</b>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 轮播图   <el-carousel-item >-->
    <el-carousel indicator-position="outside" height="630px" v-if='$route.path=="/"'>
      <el-carousel-item v-for="item in lunbo" :key="item.id">
        <img :src="item.src" height="740px" >
      </el-carousel-item>
    </el-carousel>

    <!-- <div class='title'>{{$route.meta.title}}</div> -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  methods: {},
  data() {
    return {
      lunbo:[
        {
          id:1,
          src:require('@/assets/ccar1.jpg')
        },
        {
          id:2,
          src:require('@/assets/ccar2.jpg')
        },
        {
          id:3,
          src:require('@/assets/ccar3.jpg')
        },
        {
          id:4,
          src:require('@/assets/ccar4.jpg')
        },
        {
          id:5,
          src:require('@/assets/ccar5.jpg')
        },
      ]
    };
  },
};
</script>

<style scoped>
.arrow-icon {
  float: left;
  background: #f4f9ff;
  border: 1px solid transparent;
  cursor: pointer;
  font-size: 23px;
  /* height: 39px; */
  line-height: 39px !important;
  width: 40px;
  text-align: center;
}
.el-breadcrumb {
  height: 42px;
  line-height: 40px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.title {
  padding-left: 10px;
}
.shu {
  color: green;
  padding-right: 5px;
}
.back {
  cursor: pointer;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>