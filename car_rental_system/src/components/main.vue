<template>
  <div>
    <app-header></app-header>    
    <app-navbar></app-navbar>
    <app-main></app-main>
    <!-- <div class="footer">&copy;2020 By us</div> -->
  </div>
</template>

<script>
import AppHeader from './AppHeader'
import AppNavbar from './AppNavbar'
import AppMain from './AppMain'

export default {
  components:{
    AppHeader,
    AppNavbar,
    AppMain
  },
  
};
</script>

<style scoped>
.header {
  width: 100%;
  line-height:50px;
  height: 50px;
  background-color: #167bd8;
}
.navbar {
  /* position: absolute; */
  /* width: 180px;
  top: 50px;
  left: 0;
  bottom: 0; */
  float: left;
  height:650px;
  /* background-color: blue; */
}
.main {
  /* position: absolute; */
  /* top: 50px;
  left: 180px;
  right: 0px;
  bottom: 20px; */
  float: left;
  background-color: orange;
}
.footer{
  position: absolute;
  text-align: center;
  left: 180px;
  bottom: 5px;
  right: 0;
  /* background-color: green; */
}

</style>