<template>
  <div class="AddDate">
    <el-card shadow="always">
      <el-form :model="AddForm" :rules="AddFormRules" ref="AddForm" label-width="100px" class="demo-AddForm" >
        <el-form-item label="店名" prop="shop">
          <el-input v-model="AddForm.shop"></el-input>
        </el-form-item>
        <el-form-item label="店长" prop="name">
          <el-input v-model="AddForm.name"></el-input>
        </el-form-item>
        <el-form-item label="店员数" prop="num">
          <el-input v-model="AddForm.num"></el-input>
        </el-form-item>
        <el-form-item label="车辆数" prop="car">
          <el-input v-model="AddForm.car"></el-input>
        </el-form-item>
        <el-form-item label="利润（万）" prop="money">
          <el-input v-model="AddForm.money"></el-input>
        </el-form-item>
        <el-form-item label="营业时间" prop="time">
          <el-input v-model="AddForm.time"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="tel">
          <el-input v-model="AddForm.tel"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="AddForm.address"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-show="AddForm.isAdd" @click="Add('AddForm')">确 定</el-button>
          <el-button @click="resetForm('AddForm')" v-show="AddForm.isAdd">重 置</el-button>
          <el-button type="primary" v-show="AddForm.isShow" @click="Edit">保 存</el-button>
          <el-button @click="back" >返回</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      AddForm: {
        shop: '',
        name: '',
        num: '',
        car: '',
        money: '',
        time: '',
        tel: '',
        address: '',
        isShow: true,
        isAdd: true
      },
      allAddForm: [],
      AddFormRules: {
        shop: [
          { required: true, message: '请输入店名', trigger: 'blur' },
          {
            min: 2,
            max: 14,
            message: '店名的长度在2～14个字',
            trigger: 'blur'
          }
        ],
        name: [
          { required: true, message: '请输入店长名', trigger: 'blur' },
          {
            min: 2,
            max: 14,
            message: '店长名的长度在2～14个字',
            trigger: 'blur'
          }
        ],
        num: [
          { required: true, message: '请输入员工数', trigger: 'blur' },
          {
            min: 1,
            max: 10,
            message: '员工数的长度在1～10个数字',
            trigger: 'blur'
          }
        ],
        car: [
          { required: true, message: '请输入车辆数', trigger: 'blur' },
          {
            min: 1,
            max: 10,
            message: '车辆数的长度在1～10个数字',
            trigger: 'blur'
          }
        ],
        money: [
          { required: true, message: '请输入利润（万）', trigger: 'blur' },
          {
            min: 1,
            max: 18,
            message: '利润的长度在1～18个数字',
            trigger: 'blur'
          }
        ],
        time: [
          { required: true, message: '请输入营业时间', trigger: 'blur' },
          {
            min: 4,
            max: 44,
            message: '营业时间的长度在4～14个数字',
            trigger: 'blur'
          }
        ],
        tel: [
          { required: true, message: '请输入电话', trigger: 'blur' },
          {
            min: 4,
            max: 18,
            message: '电话的长度在4～18个字',
            trigger: 'blur'
          }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' },
          {
            min: 4,
            max: 34,
            message: '地址的长度在4～34个字',
            trigger: 'blur'
          }
        ]
      },
      oneIndex: ''
    }
  },
  created () {
    this.oneIndex = this.$route.params.index
    if (this.oneIndex || this.oneIndex === 0) {
      this.AddForm.isAdd = false
      this.AddForm.isShow = true
      this.allAddForm = JSON.parse(localStorage.getItem('DataList'))
      console.log(this.allAddForm)
      this.AddForm.shop = this.allAddForm[this.oneIndex].shop
      this.AddForm.name = this.allAddForm[this.oneIndex].name
      this.AddForm.num = this.allAddForm[this.oneIndex].num
      this.AddForm.car = this.allAddForm[this.oneIndex].car
      this.AddForm.money = this.allAddForm[this.oneIndex].money
      this.AddForm.time = this.allAddForm[this.oneIndex].time
      this.AddForm.tel = this.allAddForm[this.oneIndex].tel
      this.AddForm.address = this.allAddForm[this.oneIndex].address
    } else {
      this.AddForm.isAdd = true
      this.AddForm.isShow = false
    }
  },
  methods: {
    Add (formName) {
      this.$refs[formName].validate((valid) => {
        if (localStorage.getItem('DataList')) {
          console.log(this.AddForm)
          this.allAddForm = JSON.parse(localStorage.getItem('DataList'))
          this.allAddForm.push(this.AddForm)
          console.log(this.allAddForm)
          localStorage.setItem('DataList', JSON.stringify(this.allAddForm))
        } else {
          this.allAddForm.push(this.AddForm)
          localStorage.setItem('DataList', JSON.stringify(this.allAddForm))
        }
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this.$router.push({ name: 'StoreSystem' })
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    Edit () {
      const a = this.allAddForm.findIndex((item, index) => {
        return index === this.oneIndex
      })
      this.allAddForm[a].shop = this.AddForm.shop
      this.allAddForm[a].name = this.AddForm.name
      this.allAddForm[a].num = this.AddForm.num
      this.allAddForm[a].car = this.AddForm.car
      this.allAddForm[a].money = this.AddForm.money
      this.allAddForm[a].time = this.AddForm.time
      this.allAddForm[a].tel = this.AddForm.tel
      this.allAddForm[a].address = this.AddForm.address
      localStorage.setItem('DataList', JSON.stringify(this.allAddForm))
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      this.$router.push({ name: 'StoreSystem' })
    },
    back() {
      this.$router.push({ name: 'StoreSystem' })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
