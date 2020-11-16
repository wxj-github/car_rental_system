<template>
<el-main>
  <el-form :model="userForm" size="mini" label-width="80px">
    <el-form-item label="汽车品牌" prop="region">
    <el-select v-model="userForm.region" placeholder="请选择汽车品牌">
      <el-option label="奔驰" value="Benz" ></el-option>
      <el-option label="宝马" value="BMW"></el-option>
      <el-option label="大众" value="FAW-VK"></el-option>
      <el-option label="日产" value="Nissan"></el-option>
    </el-select>
     <el-button class="searchBtn" type="primary" size="mini" icon="el-icon-search" @click="search()">查询</el-button>
  </el-form-item>
 
</el-form>
<!--表格
    data:数据绑定
    height：只要在el-table元素中定义了height属性，即可实现固定表头的表格，而不需要额外的代码。
    border：表格边框
    prop：字段属性需要跟表格的数据对应
    -->
    <el-table :data="tableData" :height="tableHeight" border style="width: 100%">
      <el-table-column prop="id" label="序号"></el-table-column>
        <el-table-column prop="carNo" label="车型"></el-table-column>
      <el-table-column prop="carName" label="汽车名称"></el-table-column>
      <el-table-column prop="carColor" label="汽车颜色"></el-table-column>
      <el-table-column prop="PricePerDay" label="日租价格"></el-table-column>
      <el-table-column prop="PricePerMounth" label="月租价格"></el-table-column>
      <el-table-column prop="BuyDay" label="购入日期"></el-table-column>
      <el-table-column prop="inventory" label="库存"></el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <a href="#" @click="del(scope.row.id)">删除</a>
        </template>
      </el-table-column>
</el-table>
     <!-- 分页组件-->
    
</el-main>
</template>
<script>
import axios from "axios"
import axios2 from "axios"
    export default {
        data(){
            return{
           userForm:{
               region:'Benz'
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
     search(){
       if(this.userForm.region=='Benz')
       {
       axios.get('http://localhost:3000/Benz')
       .then((res)=>{
         console.log(this.userForm.userName);
         console.log(res);
         this.tableData=res.data;
    
       })
       }
       else if(this.userForm.region=='BMW')
       {
         axios.get('http://localhost:3000/BMW')
       .then((res)=>{
         console.log(this.userForm.userName);
         console.log(res);
         this.tableData=res.data;
    
       })
       }
       else if(this.userForm.region=='Nissan')
       {
         axios.get('http://localhost:3000/Nissan')
       .then((res)=>{
         console.log(this.userForm.userName);
         console.log(res);
         this.tableData=res.data;
       })
     }
     else if(this.userForm.region=='FAW-VK')
     {
       axios.get('http://localhost:3000/FAW-VK')
       .then((res)=>{
         console.log(this.userForm.userName);
         console.log(res);
         this.tableData=res.data;
     })
     }
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
     del(ID){
        if(this.userForm.region=='Benz')
       {
         axios.delete('http://localhost:3000/Benz/'+ID)
       .then((res)=>{
         const {status,data} =res;
         if(status===200)
         {
          axios.get('http://localhost:3000/Benz')
       .then((res)=>{
         console.log(this.userForm.userName);
         console.log(res);
         this.tableData=res.data;
       })
         }
       })
       }
       else if(this.userForm.region=='BMW')
       {
          axios.delete('http://localhost:3000/BMW/'+ID)
       .then((res)=>{
         const {status,data} =res;
         if(status===200)
         {
          axios.get('http://localhost:3000/BMW')
       .then((res)=>{
         console.log(this.userForm.userName);
         console.log(res);
         this.tableData=res.data;
       })
         }
       })
       }
       else if(this.userForm.region=='Nissan')
       {
          axios.delete('http://localhost:3000/Nissan/'+ID)
       .then((res)=>{
         const {status,data} =res;
         if(status===200)
         {
          axios.get('http://localhost:3000/Nissan')
       .then((res)=>{
         console.log(this.userForm.userName);
         console.log(res);
         this.tableData=res.data;
       })
         }
       })
     }
     else if(this.userForm.region=='FAW-VK')
     {
        axios.delete('http://localhost:3000/FAW-VK/'+ID)
       .then((res)=>{
         const {status,data} =res;
         if(status===200)
         {
          axios.get('http://localhost:3000/FAW-VK')
       .then((res)=>{
         console.log(this.userForm.userName);
         console.log(res);
         this.tableData=res.data;
       })
         }
       })
     }
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