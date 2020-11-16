<template>
  <div>
    <el-card>
      <el-row :gutter="25">
        <el-col :span="10">
          <!-- 搜索添加 -->
          <el-input placeholder="请输入要搜索的车主名字" v-model="queryInfo.query" clearable @clear="search">
            <el-button icon="el-icon-search" slot="append" @click="search">搜索</el-button>

            <el-button icon="el-icon-error" type="danger" slot="append" @click="stop_search">取消搜索</el-button>
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" @click="addDialogVisible = true">添加维修信息</el-button>
          <el-button type="primary" @click="getBooklist()">查看预约信息</el-button>
        </el-col>
      </el-row>
      <el-table :data="carlist" boder stripe>
        <el-table-column label="订单号" prop="id"></el-table-column>
        <el-table-column label="汽车信息" prop="carname"></el-table-column>
        <el-table-column label="车主名字" prop="hostname"></el-table-column>
        <el-table-column label="车主电话" prop="phone"></el-table-column>
        <el-table-column label="维修费用" prop="money"></el-table-column>
        <el-table-column label="是否维修完成" prop="state">
          <template slot-scope="scope">
            <!--数据模板-->
            <el-switch v-model="scope.row.state" @change="userStateChanged(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 修改 -->
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pageNum"
          :page-sizes="[1, 2, 5, 100]"
          :page-size="queryInfo.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
        ></el-pagination>
      </div>
    </el-card>
    <el-dialog title="预约信息" :visible.sync="dialogTableVisible">
      <el-table @row-click="handleEdit" :data="booklist" boder stripe>
        <el-table-column prop="carname" label="车辆信息"></el-table-column>
        <el-table-column prop="hostname" label="车主信息"></el-table-column>
        <el-table-column prop="phone" label="车主号码"></el-table-column>
        <el-table-column prop="date" label="预约日期"></el-table-column>
        <el-table-column prop="type" label="预约服务"></el-table-column>
        <el-table-column prop="type" label="操作"
          ><el-button type="success" title="移到维修列表" icon="el-icon-check" circle @click="pushCarlist()"></el-button
        ></el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog title="添加维修信息" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
      <!-- 内容主体区域 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="140px">
        <!-- 用户名 -->

        <el-form-item label="汽车信息" prop="carname">
          <el-input v-model="addForm.carname"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="车主名字" prop="hostname">
          <el-input v-model="addForm.hostname"></el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item label="车主电话" prop="phone">
          <el-input v-model="addForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="维修费用" prop="money">
          <el-input v-model="addForm.money"></el-input>
        </el-form-item>
        <el-form-item label="是否完成维修" prop="state">
          <el-input v-model="addForm.state"></el-input>
        </el-form-item>
      </el-form>
      <!-- 内容底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户对话框 -->
    <el-dialog title="修改维修信息" :visible.sync="editDialogVisible" width="50%" @colse="editDialogClosed">
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="90px">
        <!-- 用户名 -->
        <el-form-item label="维修单号" prop="id">
          <el-input v-model="editForm.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="汽车信息" prop="carname">
          <el-input v-model="editForm.carname"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="车主信息" prop="hostname">
          <el-input v-model="editForm.hostname"></el-input>
        </el-form-item>
        <el-form-item label="车主电话" prop="phone">
          <el-input v-model="editForm.phone"></el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item label="维修费用" prop="money">
          <el-input v-model="editForm.money"></el-input>
        </el-form-item>
        
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定(默认把维修状态修改成“未维修完成”)</el-button>
      </span>
    </el-dialog>
  </div>
</template>
.
<script>
import axios from 'axios'
import { getCar } from '@/api/repairmock'

export default {
  created() {
    this.getUserList()
  },
  data() {
    return {
      // 请求数据
      queryInfo: {
        query: '',
        pageNum: 1,
        pageSize: 5,
      },
      rowlist: [],
      list: [],
      blist: [],
      carlist: [], // 用户列表
      booklist: [],
      total: 0, // 最大数据记录
      addDialogVisible: false,
      dialogTableVisible: false,
      addForm: {
        carname: '',
        hostname: '',
        phone: '',
        money: '',
        state: 'false',
      },
      editForm: {
        id: '',
        carname: '',
        hostname: '',
        phone: '',
        money: '',
        state: 'false',
      },
      editDialogVisible: false,
      addFormRules: {
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
        money: [
          { required: true, message: '请输入维修费用', trigger: 'blur' },
          { min: 2, max: 11, message: '长度在为 2~11 位', trigger: 'blur' },
        ],
        state: [
          { required: true, message: '请确认是否已完成维修', trigger: 'blur' },
          { min: 4, max: 5, message: '请输入true或者false', trigger: 'blur' },
        ],
      },
      editFormRules: {
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
        money: [
          { required: true, message: '请输入维修费用', trigger: 'blur' },
          { min: 2, max: 11, message: '长度在为 2~11 位', trigger: 'blur' },
        ],
        
      },
    }
  },
  created() {
    let o = this.queryInfo.pageNum
    this.getCarlist()
  },
  methods: {
    add() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return
        await axios
          .post('/api/addcar', {
            carname: this.addForm.carname,
            hostname: this.addForm.hostname,
            phone: this.addForm.phone,
            money: this.addForm.money,
            state: this.addForm.state,
          })
          .then((res) => {
            let a = res.data.boo
            if (a === true) {
              this.$message.success('添加成功！！！')
              this.addDialogClosed()
            }
          })
      })
    },
    getBooklist() {
      axios.get('/api/book', {}).then((res) => {
        this.booklist = res.data.list
        console.log(this.booklist)
        this.dialogTableVisible = true
      })
    },
    getCarlist() {
      axios
        .get('/api/car', {
          params: {
            pageNum: this.queryInfo.pageNum,
            pageSize: this.queryInfo.pageSize,
          },
        })
        .then((res) => {
          this.carlist = res.data.list
        })
    },
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    // 监听pageSize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize
      this.getCarlist() // 数据发生改变重新申请数据
    },
    // 监听pageNum改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage
      this.getCarlist() // 数据发生改变重新申请数据
    },
    search() {if(this.queryInfo.query===''){
      this.getCarlist()
    }else{
      axios
        .post('/api/search', {
          hostname: this.queryInfo.query,
        })
        .then((res) => {
          this.carlist = res.data.list
        })}
    },
    stop_search() {
      this.getCarlist()
    },

    showEditDialog(id) {
      console.log(id)
      axios
        .post('/api/return', {
          id,
        })
        .then((res) => {
          console.log(res)

          this.editForm.id = res.data.list[0].id
          this.editForm.carname = res.data.list[0].carname
          this.editForm.hostname = res.data.list[0].hostname
          this.editForm.phone = res.data.list[0].phone
          this.editForm.money = res.data.list[0].money
          this.editForm.state = res.data.list[0].state.toString()
          console.log(this.editForm)

          this.editDialogVisible = true
        })
    },
    // 关闭窗口
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
    // 确认修改
    editUserInfo() {
      axios
        .post('/api/updata', {
          id: this.editForm.id,
          carname: this.editForm.carname,
          hostname: this.editForm.hostname,
          phone: this.editForm.phone,
          money: this.editForm.money,
          state: this.editForm.state,
        })
        .then((res) => {
          console.log(res.statusText)
          let a = res.statusText
          if (a === 'OK') {
            this.$message.success('修改成功')
            this.getCarlist()
            this.editDialogVisible = false
          }
        })
    },
    userStateChanged(userinfo) {
      axios
        .post('/api/updata', {
          id: userinfo.id,
          carname: userinfo.carname,
          hostname: userinfo.hostname,
          phone: userinfo.phone,
          money: userinfo.money,
          state: userinfo.state,
        })
        .then((res) => {
          let a = res.statusText
          if (a === 'OK') {
            this.$message.success('修改成功')
            this.getCarlist()
          }
        })
    },
    handleEdit(row) {
      this.rowlist = row
      //console.log(this.rowlist)
    },
    pushCarlist() {
      this.handleEdit()
      this.$confirm('此操作将添加新的维修订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          console.log(this.rowlist),
          axios
            .post('/api/booktocar', {
              id:this.rowlist.id,
              carname: this.rowlist.carname,
              hostname: this.rowlist.hostname,
              phone: this.rowlist.phone,
              
            })
            .then((res) => {
              console.log(res)
               this.booklist = res.data.blist
               
               this.getCarlist()
              console.log(this.booklist)
            })
            this.$message({
              type: 'success',
              message: '加入维修列表成功!',
            })
        })
        .catch(() => {
          
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
  },
}
</script>

<style  scoped>
.el-breadcrumb {
   height: 50px;
}
</style>
