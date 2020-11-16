<template>
  <div class="navbar">
    <el-menu
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="$store.state.isCollapse"
      :default-openeds="openeds"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-s-goods"></i>
          <span>商品管理</span>
        </template>
        <el-menu-item-group>
          <template slot="title">
            <i class="el-icon-truck"></i>汽车信息管理
          </template>
          <el-menu-item index="1-1" @click="$router.push('/benz')"><i class="el-icon-truck"></i>奔驰系列</el-menu-item>
          <el-menu-item index="1-2" @click="$router.push('/bmw')"><i class="el-icon-truck"></i>宝马系列</el-menu-item>
          <el-menu-item index="1-3" @click="$router.push('/faw-vk')"><i class="el-icon-truck"></i>大众系列</el-menu-item>
          <el-menu-item index="1-4" @click="$router.push('/nissan')"><i class="el-icon-truck"></i>日产系列</el-menu-item>
          <el-menu-item index="1-5" @click="$router.push('/addcar')"><i class="el-icon-truck"></i>添加汽车信息</el-menu-item>
          <el-menu-item index="1-6" @click="$router.push('/deletecar')"><i class="el-icon-truck"></i>删除汽车信息</el-menu-item>
        </el-menu-item-group>
         <el-menu-item-group>
          <template slot="title">
            <i class="el-icon-help"></i>维修保养管理
          </template>
          <el-menu-item index="1-7" @click="$router.push('/repair')"><i class="el-icon-help"></i>维修情况</el-menu-item>
          <el-menu-item index="1-8" @click="$router.push('/book')"><i class="el-icon-help"></i>维修预约</el-menu-item>
        </el-menu-item-group>

      </el-submenu>

      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span>订单管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1" @click="torental">
            <i class="el-icon-s-finance"></i>租赁信息管理
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>系统管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1" @click="touser">
            <i class="el-icon-user"></i>用户信息管理
          </el-menu-item>
          <el-menu-item index="3-2" @click="tostore">
            <i class="el-icon-s-home"></i>门店信息管理
          </el-menu-item>
          <el-menu-item index="3-3" @click="tostaff">
            <i class="el-icon-user-solid"></i>员工信息管理
          </el-menu-item>
          <el-menu-item index="3-4" @click="tomembersys">
            <i class="el-icon-s-custom"></i>会员信息管理
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      openeds: ["2", "3"],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log("open" + key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log("close" + key, keyPath);
    },
    tomembersys() {
      this.$router.push("/member");
    },
    tostaff() {
      this.$router.push("/staff");
    },
    tostore() {
      this.$router.push("/store");
    },
    touser() {
      this.$router.push("/user");
    },
    torental() {
      this.$router.push("/rental");
    },
    tocar() {
      this.$router.push("/car");
    },
    torepair() {
      this.$router.push("/repair");
    },
  },
};
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 650px;
}
</style>