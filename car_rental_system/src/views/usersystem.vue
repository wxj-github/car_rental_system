<template>
<div style="width: 88%;margin-top:10px;">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item>
            <el-select v-model="formInline.Queryitem" placeholder="查询项">
                <el-option label="用户名" value="username"></el-option>
                <el-option label="姓名" value="name"></el-option>
                <el-option label="性别" value="sex"></el-option>
                <el-option label="联系方式" value="phone"></el-option>
                <el-option label="邮箱地址" value="email"></el-option>
                <el-option label="用户权限" value="administrator"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-input v-model="formInline.message" placeholder="请输入查询内容"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="Query">查询</el-button>
            <el-button type="info" @click="cancelQuery">清空</el-button>
            <el-button type="primary" @click="adduser">添加</el-button> 身份：1：管理员；2：销售员；3：顾客

        </el-form-item>
    </el-form>


    <el-table
            fit
            :data="userList"
            style="width: 80%;margin-left: 20px">
        <el-table-column disable
                prop="username"
                label="用户名"
                width="180">

        </el-table-column>
        <el-table-column
                prop="name"
                label="姓名"
                width="120"
        >

        </el-table-column>
        <el-table-column
                prop="sex"
                label="性别"
                width="80"
        >

        </el-table-column>
        <el-table-column
                prop="phone"
                label="联系方式"
                width="160"
        >
        </el-table-column>
        <el-table-column
                prop="email"
                label="邮箱地址"
                width="200"
        >
        </el-table-column>
        <el-table-column
                prop="administrator"
                label="身份"
                width="120"
        >
        </el-table-column>
        <el-table-column label="操作" width="150">
            <template slot-scope="scope">
                <el-button type="primary" size="small" @click="userEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button type="danger" size="small" @click="userDelete(scope.row)">删除</el-button>

            </template>

        </el-table-column>

    </el-table>

    <el-dialog title="编辑用户信息" :visible="userEditForm" :modal-append-to-body='false' @close='closeDialog'>
        <el-form ref="editsForm" :model="editsForm" label-width="80px">
            <el-form-item label="用户名">
                <el-input  v-model="editsForm.username" max-length="12" disabled="disabled"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
                <el-input v-model="editsForm.name"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-input v-model="editsForm.sex"></el-input>
            </el-form-item>
            <el-form-item label="电话">
                <el-input v-model="editsForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="editsForm.email"></el-input>
            </el-form-item>

            <el-form-item label="角色">
                <el-input v-model="editsForm.administrator" ></el-input>
            </el-form-item>
            <el-form-item label="密码" >
                <el-input v-model="editsForm.password" show-password disabled="disabled"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="UserModifyEdit()">确定</el-button>
                <el-button @click="userEditForm = false">取消</el-button>

            </el-form-item>
        </el-form>
    </el-dialog>

    <el-dialog title="添加用户信息" :visible="userAddForm"  :modal-append-to-body='false' @close='closeDialog'>
        <el-form ref="addForm" :model="addForm" label-width="80px">
            <el-form-item label="用户名">
                <el-input  v-model="addForm.username" max-length="12"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
                <el-input v-model="addForm.name"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-input v-model="addForm.sex"></el-input>
            </el-form-item>
            <el-form-item label="电话">
                <el-input v-model="addForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="addForm.email"></el-input>
            </el-form-item>

            <el-form-item label="角色">
                <el-input v-model="addForm.administrator" ></el-input>
            </el-form-item>
            <el-form-item label="密码" >
                <el-input v-model="addForm.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="UserAddEdit()">确定</el-button>
                <el-button @click="userAddForm = false">取消</el-button>

            </el-form-item>
        </el-form>
    </el-dialog>

</div>
</template>

<script>
import axios from 'axios'
    export default {
        name: "Administrator",
        data() {
            return {
                formInline:{
                    message:"",//查询内容
                    Queryitem:""//查询项
                },
                userAddForm:false,
                addForm:{
                    id:'',
                    username:'',
                    name:'',
                    sex:'',
                    phone:'',
                    email:'',
                    administrator:'',
                    password:''
                },
                userList: [],
                userEditForm:false,
                modifyindex:0,
                editsForm:{
                    id:'',
                    username:'',
                    name:'',
                    sex:'',
                    phone:'',
                    email:'',
                    administrator:'0',
                    password:''
                },

            }
        },
        methods: {
            UserAddEdit(){

                let adduser=this.addForm;
                let {username,name,sex,phone,email,administrator,password} = adduser;
                if(name==''||sex==''||phone==''||email==''||administrator==''||username==''||password==''){
                    this.$message.error("内容每一项都不准为空")
                }else{
                    axios.post('http://localhost:3000/userlist/',adduser).then(res=>{
                        console.log("add  res:"+res)
                        // console.log(res.data.data);
                        // if(res.data.data ===1){
                        this.getuserList();
                        this.userAddForm  = false;
                        this.$message('添加成功')
                        // }
                    })
                }
            },

            getuserList(){
                axios.get('http://localhost:3000/userlist/').then(res => {
                    const {status,data} = res;
                    if(status === 200){
                        this.userList = data
                    }
                })
            },
            closeDialog(){
                this.userEditForm = false;
                this.userAddForm = false;
            },
            userEdit(index,row){
                this.userEditForm = true; //编辑信息模态框显示
                this.editsForm = Object.assign({}, row);//  获得所有数据显示在编辑信息模态框里面
                this.modifyindex = index
            },
            UserModifyEdit(){
                let modifyuser=this.editsForm;
                console.log(modifyuser);
                let {name,sex,phone,email,administrator} = modifyuser;
                if(name==''||sex==''||phone==''||email==''||administrator==''){
                    this.$message.error("修改内容除了不可编辑的每一项都不准为空")
                }else{
                    axios.patch('http://localhost:3000/userlist/'+modifyuser.id,modifyuser).then(res=>{
                        console.log("modify  res:"+res)

                        // console.log(res.data.data);
                        // if(res.data.data ===1){
                            this.getuserList();
                            this.userEditForm  = false;
                        this.$message('修改成功')
                        // }
                    })
                }

            },
            adduser(){
                console.log('adduser');
                this.userAddForm = true; //编辑信息模态框显示

            },
            userDelete(row){
                axios.delete('http://localhost:3000/userlist/'+row.id).then(res=>{
                    console.log("delete  res:"+res)
                    this.getuserList();
                    this.$message('删除成功')
                    // }
                })
                // this.$axios.post('/deleteuser',row).then(res=>{
                //     if(res.data.data ===1){
                //         this.getuserList();
                //     }
                // })
            },
            Query(){
                if(this.formInline.message === ""){
                    this.getuserList()
                    return
                }
                //let keyarr = Object.keys(this.editsForm)
                //let i
                // keyarr.forEach((value,index) => {
                //     if(this.formInline.Queryitem.toString() === value.toString())
                //     {i = index}
                // })
                // let query = {
                //     [keyarr[i]]:this.formInline.message
                // }
                let that = this;
                axios.get('http://localhost:3000/userlist?'+this.formInline.Queryitem+'='+this.formInline.message).then(function(res){
                        const {status,data} = res;
                        if(status ===200)
                            that.userList = data
                        })// 成功时的回调
                    .catch(function(error){
                        console.log("error:"+error)
                    })



            },
            cancelQuery(){
                this.formInline.message="";
                this.getuserList()
            }

        },

        mounted() {
            this.getuserList()
        }
    }
</script>

<style scoped>

</style>