<template>
  <div>
      <el-form ref="sizeFormRef" :model="sizeForm" :rules="sizeFormRules" label-width="80px" size="mini">
  <el-form-item label="汽车信息" prop="carname" style="margin-top:10px">
    <el-input v-model="sizeForm.carname"></el-input>
  </el-form-item>
  <el-form-item label="车主信息" prop="hostname" style="margin-top:-550px">
    <el-input v-model="sizeForm.hostname"></el-input>
  </el-form-item>
  <el-form-item label="车主电话" prop="phone" style="margin-top:-480px">
    <el-input v-model="sizeForm.phone"></el-input>
  </el-form-item>
  <el-form-item label="预约时间" style="margin-top:-420px">
    <el-col :span="11">
      <el-date-picker
      v-model="sizeForm.date"
      type="date"
      placeholder="选择日期"
      format="yyyy 年 MM 月 dd 日"
      value-format="yyyy-MM-dd">
    </el-date-picker>
    </el-col>
    <el-col class="line" :span="2"></el-col>
    
  </el-form-item>
  <el-form-item label="维修服务" style="margin-top:-360px">
    <el-checkbox-group v-model="sizeForm.type">
      <el-checkbox-button label="日常护理" name="type"></el-checkbox-button>
      <el-checkbox-button label="翻新" name="type"></el-checkbox-button>
      <el-checkbox-button label="大修" name="type"></el-checkbox-button>
    </el-checkbox-group>
  </el-form-item>
  
  <el-form-item size="large" style="margin-top:-290px"> 
    <el-button type="primary" @click="onSubmit">立即预约</el-button>
    <el-button @click="reset">重置</el-button>
  </el-form-item>
</el-form>
  </div>
</template>

<script>
import axios from 'axios'
  export default {
    data() {
      return {
        sizeForm: {
          carname: '',
          hostname: '',
          phone: '',
          date: '',
          type: [],
        },
        sizeFormRules: {
        carname: [
          { required: true, message: '请输入汽车名字', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' },
        ],
        hostname: [
          { required: true, message: '请输入车主名字', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在为 2~6 位', trigger: 'blur' },
        ],
        phone: [
          { required: true, message: '请输入车主电话号码', trigger: 'blur' },
          { min: 6, max: 11, message: '长度在为 6~11 位', trigger: 'blur' },
        ],
      },
      };
    },
    methods: {
      onSubmit() {
        console.log(this.sizeForm);
       axios
          .post('/api/addbook', {
          carname: this.sizeForm.carname,
         hostname :this.sizeForm.hostname ,
         phone :this.sizeForm.phone ,
         date:this.sizeForm.date ,
         type :this.sizeForm.type[0] ,
          })
          .then((res) => {
            let a = res.data.boo
            if (a === true) {
              this.$message.success('添加成功！！！')
              this.reset()
            }
          })
     
      },
      reset(){
         this.sizeForm.carname = ''
         this.sizeForm.hostname = ''
         this.sizeForm.phone = ''
         this.sizeForm.date = ''
         this.sizeForm.type = ''
      }
    }
  };
</script>

<style scoped>
.el-breadcrumb{
    height: 50px;
}
.el-form{
    width: 50%;
    margin: auto;
}
</style>