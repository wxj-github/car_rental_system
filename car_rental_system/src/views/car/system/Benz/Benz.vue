<template>
<el-main>
  <el-form :model="userForm" size="mini" label-width="80px">
<el-row>
  <el-col :span="5">
    <el-form-item label="车型">
    <el-input v-model="userForm.userName" placeholder="请输入车型"></el-input>
    </el-form-item>
  </el-col>
  <el-button class="searchBtn" type="primary" size="mini" icon="el-icon-search" @click="search()">查询</el-button>
  <el-button type="primary" size="mini" icon="el-icon-refresh" @click="reset()">重置</el-button>
</el-row>
</el-form>
<!--表格
    data:数据绑定
    height：只要在el-table元素中定义了height属性，即可实现固定表头的表格，而不需要额外的代码。
    border：表格边框
    prop：字段属性需要跟表格的数据对应
    -->
    <el-table 
    :data="tableData.slice((currentpage1-1)*pagesize,currentpage1*pagesize)" :height="tableHeight" border style="width: 100%">
      <el-table-column prop="id" label="序号"></el-table-column>
        <el-table-column prop="carNo" label="车型"></el-table-column>
      <el-table-column prop="carName" label="汽车名称"></el-table-column>
      <el-table-column prop="carColor" label="汽车颜色"></el-table-column>
      <el-table-column prop="PricePerDay" label="日租价格"></el-table-column>
      <el-table-column prop="PricePerMounth" label="月租价格"></el-table-column>
      <el-table-column prop="BuyDay" label="购入日期"></el-table-column>
      <el-table-column prop="inventory" label="库存"></el-table-column>
</el-table>
     <!-- 分页组件-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentpage1"
      :page-sizes="[10,20,30]"
      :page-size="pagesize"
      layout="total, prev, pager, next"
      :total="this.tableData.length"
      align="center">
    </el-pagination>
</el-main>
</template>
<script>
import axios from "axios"
    export default {
        data(){
            return{
              total:0,
              currentpage1:1,
              pagesize:9,
              searchmap:{},
           userForm:{
               userName:""
           },
            //表格高度 window.innerHeight窗口文档显示高度
      tableHeight: window.innerHeight,
      //表格数据绑定
       tableData: [
      ],
            }
        },
         //该钩子函数执行时所有的DOM挂载和渲染都已完成，此时在该钩子函数中进行任何DOM操作都不 会有问题
// 在数据变化后要执行的某个操作，而这个操作需要使用随数据改变而改变的DOM结构的时候，
// 这个操作都应该放进Vue.nextTick()的回调函数中
  mounted() {
    this.$nextTick(() => {
      this.tableHeight = window.innerHeight - 210; //后面的50：根据需求空出的高度，自行调整
      this.getAllData();
    });
  },
   methods: {
     reset(){
       this.userForm.userName="";
       this.getAllData();
     },
     search(){
       axios.get('http://localhost:3000/Benz?carNo_like='+this.userForm.userName)
       .then((res)=>{
         console.log(this.userForm.userName);
         console.log(res);
         this.tableData=res.data;
        
       })
     },
     getAllData(){
       axios.get('http://localhost:3000/Benz')
       .then((res)=>{
         console.log(res);
         const {status,data} = res ;
         if(status===200){
           this.tableData=data;
         }
       })
     },
     handleSizeChange(val){
       this.pagesize=val;
     },
     handleCurrentChange(val){
       this.currentpage1=val;
     }
    }
    }
</script>
<style lang="scss" scoped>
.el-main{
    padding-top: 5px !important;
}
.aa{
    width: 300px;
    height: 28px;
    margin-bottom: 35px;
}
.searchBtn{
    margin-left: 30px;
}
</style>
