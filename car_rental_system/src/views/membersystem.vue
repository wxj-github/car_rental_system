<template>
  <div>
    <el-form ref="searchform" :inline="true" :model="searchmap" class="elform">
      <el-form-item style="width:150px">
        <el-input v-model="searchmap.number" placeholder="会员卡号"></el-input>
      </el-form-item>
      <el-form-item style="width:150px">
        <el-input v-model="searchmap.name" placeholder="会员姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchmap.sex" placeholder="性别" style="width:80px" clearable>
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="width:150px">
        <el-input v-model="searchmap.phone" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="debounce(selectmember,600,false)()">查询</el-button>
        <el-button type="primary" @click="handleadd">添加</el-button>
        <el-button type="primary" @click="getData">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="memberlist.slice((currentpage - 1) * pagesize, currentpage*pagesize)"
      stripe
      :style="{'width': thewidth}"
      border
      height="475"
      :cell-style="{'text-align':'center'}"
      :header-cell-style="{'text-align':'center'}"
    >
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="number" label="会员卡号" width="150"></el-table-column>
      <el-table-column prop="name" label="会员姓名" width="100"></el-table-column>
      <el-table-column prop="sex" label="性别" width="50"></el-table-column>
      <el-table-column prop="birthday" label="生日" width="100"></el-table-column>
      <el-table-column prop="phone" label="手机号" width="130"></el-table-column>
      <el-table-column prop="rentalcount" label="租赁次数" width="80"></el-table-column>
      <el-table-column prop="credit" label="信用积分" width="80"></el-table-column>
      <el-table-column prop="address" label="地址" width="310"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div :style="{'margin-left': thepage}">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentpage"
        :page-sizes="[10, 20, 30]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>

    <el-dialog :title="title" :visible.sync="dialogFormVisible" width="500px" height="200px">
      <el-form
        :rules="rules"
        :model="addpojo"
        ref="pojoform"
        label-width="100px"
        label-position="right"
        style="width:400px"
      >
        <el-form-item label="会员卡号" prop="number">
          <el-input
            v-model="addpojo.number"
            autocomplete="off"
            onkeyup="value=value.replace(/[^\d]/g,'')"
            maxlength="9"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="会员姓名" prop="name">
          <el-input v-model="addpojo.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="addpojo.sex" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生日" prop="birthday">
          <el-date-picker
            v-model="addpojo.birthday"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input
            v-model="addpojo.phone"
            autocomplete="off"
            maxlength="11"
            show-word-limit
            onkeyup="value=value.replace(/[^\d]/g,'')"
          ></el-input>
        </el-form-item>
        <el-form-item label="租赁次数" prop="rentalcount">
          <el-input v-model="addpojo.rentalcount" autocomplete="off" :disabled="inputdisable" onkeyup="value=value.replace(/[^\d]/g,'')"></el-input>
        </el-form-item>
        <el-form-item label="信用积分" prop="credit">
          <el-input v-model="addpojo.credit" autocomplete="off" :disabled="inputdisable" onkeyup="value=value.replace(/[^\d]/g,'')"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="addpojo.address" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('pojoform')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import memberApi from "@/api/member";
export default {
  data() {
    return {
      memberlist: [],
      total: 0, //总数据数
      currentpage: 1, //当前页码
      pagesize: 10, //每页数据数
      searchmap: {}, //搜索框条件
      dialogFormVisible: false,
      title: "新增会员信息",
      inputdisable: false, //决定输入框能否输入
      addpojo: {
        rentalcount: 0, //默认值为0
        credit: 60, //默认为60分
      }, //存放新增的用户信息
      rules: {
        //校验规则
        number: [
          { required: true, message: "卡号不能为空", trigger: "blur" },
          { min: 9, max: 9, message: "卡号为9位数", trigger: "blur" },
        ],
        name: [
          { required: true, message: "姓名不能为空", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" },
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        birthday: [
          {
            type: "string",
            required: true,
            message: "请选择生日日期",
            trigger: "change",
          },
        ],
        phone: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          { min: 11, max: 11, message: "手机号为11位数", trigger: "blur" },
        ],
        address: [
          { required: true, message: "地址不能为空", trigger: "blur" },
          { min: 3, message: "地址至少为3个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    handleEdit(row) {
      // console.log(index, row);   //index序号，row当前行所有数据
      this.title = "编辑会员信息";
      this.inputdisable = false;
      this.dialogFormVisible = true; //弹出
      if (this.$refs["pojoform"] !== undefined) {
        this.$refs["pojoform"].resetFields();
      }
      axios.get(`http://localhost:3000/data/${row.id}`).then((res) => {
        // console.log("这是res");
        if (res.status === 200) {
          this.addpojo = res.data;
        }
      });
    },
    debounce(func, wait, immediate, arg) {
      return () => {
        // console.log(this.timeout);
        clearTimeout(this.timeout);
        if (immediate) {
          let callnow = !this.timeout;
          this.timeout = window.setTimeout(() => {
            this.timeout = null;
          }, wait);
          if (callnow) {
            func(arg);
          }
        } else {
          this.timeout = window.setTimeout(() => {
            func(arg);
          }, wait);
        }
      };
    },
    handleDelete(row) {
      //删除会员信息
      // console.log(index, row);   //index序号，row当前行所有数据
      // memberApi.delete(row.id).then((res)=>{
      //   if(res.status==200){
      //     this.getData();
      //   }
      // })
      // console.log(row.id);

      this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await axios
            .delete("http://localhost:3000/data/" + row.id)
            .then((res) => {
              console.log("正在删除数据");
              console.log(res.headers);
              if (res.status == 200) {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                this.getData();
              } else {
                this.$message({
                  type: "error",
                  message: "删除失败！",
                });
              }
            });
        })
        .catch(() => {});
    },
    handleadd() {
      //弹出新增会员信息窗口
      this.title = "新增会员信息";
      this.inputdisable = true;
      this.dialogFormVisible = true; //弹出
      //弹出窗口后需要加载dom，resetfields未定义是因为pojoform还没加载出来
      //也可以用$nextTick()解决，这是一个异步事件，当渲染结束之后他的回调函数才会执行
      // this.$nextTick(()=>{清空内容和验证}) 但这个办法只会清除验证信息，内容要通过重新给pojo赋空值
      if (this.$refs["pojoform"] !== undefined) {
        this.$refs["pojoform"].resetFields();
      }
    },
    getData() {
      //获取全部会员信息
      // memberApi
      //   .getList()
      //   .then((response) => {
      //     const resp = response.data;
      //     console.log(resp);
      //     this.memberlist = resp;
      //     this.total = resp.length;
      //   });
      this.searchmap = { number: "", name: "", sex: "", phone: "" };

      axios.get("http://localhost:3000/data").then((res) => {
        // console.log("这是res");
        if (res.status === 200) {
          this.memberlist = res.data;
          this.total = res.data.length;
        }
      });
    },
    async selectmember() {
      await axios
        .get(
          `http://localhost:3000/data?name_like=${this.searchmap.name}&number_like=${this.searchmap.number}&sex_like=${this.searchmap.sex}&phone_like=${this.searchmap.phone}`
        )
        .then((res) => {
          this.memberlist = res.data;
          this.total = res.data.length;
        });
    },
    async addmember() {
      //添加会员信息
      await axios
        .post("http://localhost:3000/data", {
          number: this.addpojo.number,
          name: this.addpojo.name,
          sex: this.addpojo.sex,
          birthday: this.addpojo.birthday,
          phone: this.addpojo.phone,
          rentalcount: this.addpojo.rentalcount,
          credit: this.addpojo.credit,
          address: this.addpojo.address,
        })
        .then((res) => {
          const { status } = res;
          if (status === 201) {
            this.getData();
            this.dialogFormVisible = false; //关闭添加窗口，并显示添加成功
            this.$message({
              type: "success",
              message: "添加成功!",
            });
          } else {
            this.$message({
              type: "error",
              message: "添加失败！",
            });
          }
        });
    },
    async changemember() {
      //修改会员信息
      await axios
        .put(`http://localhost:3000/data/${this.addpojo.id}`, this.addpojo)
        .then((res) => {
          if (res.status === 200) {
            this.getData();
            this.dialogFormVisible = false; //关闭添加窗口，并显示添加成功
            this.$message({
              type: "success",
              message: "修改成功!",
            });
          } else {
            this.$message({
              type: "error",
              message: "修改失败！",
            });
          }
        });
    },
    submitForm(formName) {
      //点击弹出窗口的确定按钮的执行事件，判断是新增还是编辑
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.title == "新增会员信息") {
            this.addmember();
          } else if (this.title == "编辑会员信息") {
            this.changemember();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleSizeChange(val) {
      this.pagesize = val;
      // console.log('显示条数改变了');
    },
    handleCurrentChange(val) {
      this.currentpage = val;
      // console.log('当前页码改变了');
    },
  },
  created() {
    //获取会员信息列表
    this.getData();
  },
  computed: {
    thewidth: function () {
      return this.$store.state.isCollapse ? "95%" : "86%";
    },
    thepage: function () {
      return this.$store.state.isCollapse ? "400px" : "500px";
    },
  },
};
</script>

<style scoped>
.el-table {
  margin-top: 1px;
}
.elform {
  margin-top: 20px;
}
.elpage {
  margin-left: 600px;
}
.el-dialog__wrapper {
  top: -70px;
}
</style>