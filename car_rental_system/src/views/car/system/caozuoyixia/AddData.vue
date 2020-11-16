<template>
<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" > 
  <el-form-item label="汽车品牌" prop="region" style="margin-left:30%;margin-top:10px">
    <el-select v-model="ruleForm.region" placeholder="请选择汽车品牌">
      <el-option label="奔驰" value="Benz"></el-option>
      <el-option label="宝马" value="BMW"></el-option>
      <el-option label="大众" value="FAW-VK"></el-option>
      <el-option label="日产" value="Nissan"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="汽车型号" prop="style" style="margin-left:30%;margin-top:-560px">
    <el-input v-model="ruleForm.style" style="width:221.4px"></el-input>
  </el-form-item>
  <el-form-item label="汽车名称" prop="name" style="margin-left:30%;margin-top:-500px">
    <el-input v-model="ruleForm.name" style="width:221.4px"></el-input>
  </el-form-item>
  <el-form-item label="汽车颜色" prop="color" style="margin-left:30%;margin-top:-430px">
    <el-input v-model="ruleForm.color" style="width:221.4px"></el-input>
  </el-form-item>
  <el-form-item label="日租价格" prop="ppd" style="margin-left:30%;margin-top:-360px">
<el-input v-model="ruleForm.ppd" style="width:221.4px"></el-input>
  </el-form-item>
  <el-form-item label="月租价格" prop="ppm" style="margin-left:30%;margin-top:-290px">
<el-input v-model="ruleForm.ppm" style="width:221.4px"></el-input>
  </el-form-item>
  <el-form-item label="购入时间" required style="margin-left:30%;margin-top:-220px">
    <el-col :span="11">
      <el-form-item prop="date1">
        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width:221.4px;margin-top:-150px"></el-date-picker>
      </el-form-item>
    </el-col>
  </el-form-item>
  <el-form-item style="margin-left:30%;margin-top:-150px">
    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
</template>

<script>
import axios from "axios"
  export default {
    data() {
      return {
        ruleForm: {
          name: '',
          region: '',
          style:'',
          color:'',
          ppd: '',
          ppm:'',
          date1: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入汽车名称', trigger: 'blur' },
          ],
          region: [
            { required: true, message: '请选择汽车品牌', trigger: 'change' }
          ],
          ppd:[
            {
              required: true, message: '请输入日租价格', trigger: 'blur'
            }
          ],
          ppm:[
                {required: true, message: '请输入月租价格', trigger: 'blur'}
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          style:[
            {
              required: true, message: '请输入汽车型号', trigger: 'blur'
            }
          ],
          color:[
            { required: true, message: '请选择颜色', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.ruleForm.region);
            if(this.ruleForm.region=="Benz")
            {
              console.log(this.ruleForm.region+"/sd");
              axios.post('http://localhost:3000/Benz',{
                carNo: this.ruleForm.style,
               carName: this.ruleForm.name,
          carColor: this.ruleForm.color,
          PricePerDay:this.ruleForm.ppd,
          PricePerMounth:this.ruleForm.ppm,
          BuyDay:this.ruleForm.date1,
          inventory: 1
              })
              .then((res)=>{
                const {status} = res;
                if(status===201)
                {
                  console.log("done");
                }
              })
            }
            else if(this.ruleForm.region=="BMW")
            {
              axios.post('http://localhost:3000/BMW',{
                carNo: this.ruleForm.style,
               carName: this.ruleForm.name,
          carColor: this.ruleForm.color,
          PricePerDay:this.ruleForm.ppd,
          PricePerMounth:this.ruleForm.ppm,
          BuyDay:this.ruleForm.date1,
          inventory: 1
              })
              .then((res)=>{
                const {status} = res;
                if(status===201)
                {
                  console.log("done");
                }
              })
            }
            else if(this.ruleForm.region=="FAW-VK")
            {
             axios.post('http://localhost:3000/FAW-VK',{
                carNo: this.ruleForm.style,
               carName: this.ruleForm.name,
          carColor: this.ruleForm.color,
          PricePerDay:this.ruleForm.ppd,
          PricePerMounth:this.ruleForm.ppm,
          BuyDay:this.ruleForm.date1,
          inventory: 1
              })
              .then((res)=>{
                const {status} = res;
                if(status===201)
                {
                  console.log("done");
                }
              })
            }
            else if(this.ruleForm.region=="Nissan")
            {
              axios.post('http://localhost:3000/Nissan',{
                carNo: this.ruleForm.style,
               carName: this.ruleForm.name,
          carColor: this.ruleForm.color,
          PricePerDay:this.ruleForm.ppd,
          PricePerMounth:this.ruleForm.ppm,
          BuyDay:this.ruleForm.date1,
          inventory: 1
              })
              .then((res)=>{
                const {status} = res;
                if(status===201)
                {
                  console.log("done");
                }
              })
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>

</style>