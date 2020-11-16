<template>
    <div style="text-align: center">
        <el-form ref="form"
                 style="width: 400px;margin: 0 auto"
                 :rules="rules" :model="form"
                 label-width="80px" >
            <el-form-item label="用户名"  style="margin-top:20px">
                <el-input v-model="form.username" disabled></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="name" style="margin-top:-550px">
                <el-input v-model="form.name" ></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex" style="margin-top:-490px">
                <el-radio-group v-model="form.sex">
                    <el-radio label="男" value="man"></el-radio>
                    <el-radio label="女" value="woman"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="联系方式" prop="phone" style="margin-top:-430px">
                <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="邮箱地址" prop="email" style="margin-top:-370px">
                <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="密码" style="margin-top:-310px">
                <el-input v-model="form.password" show-password></el-input>
            </el-form-item>
            <el-form-item style="margin-top:-250px">
                <el-button type="primary" @click="onSubmit">修改</el-button>
                <el-button @click="$router.push('/')">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "Usermsg",
        data() {
            return {
                form: {
                    id:'',
                    username:"",
                    name: '',
                    sex:'',
                    phone:'',
                    email:'',
                    password:'',
                },
                rules: {
                    sex:[
                        { required: true, message: '请选择性别', trigger: 'blur' },
                    ],
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                        { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'change' }
                    ],
                    phone: [
                        { required: true,message: '请输入手机号码', trigger: 'change' },
                        { pattern:/^[1234567890][1234567890]\d{9}$/ ,message: '请输入 8-11 位数字', trigger: 'blur' },

                    ],
                    email:[
                        { required: true, message: '请输入邮箱地址', trigger: 'change' },
                        {pattern:/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
                            ,message:'请输入正确的邮箱地址',trigger:'blur'}
                    ],
                    password:[
                        { required: true, message: '请输入密码', trigger: 'change' },
                    ]
                    //email:
                },
                name:'',
                pwd:''
            }
        },
        computed:{

        },
        methods: {
            //从axios获取登陆信息接口
            getaxioxData(){
                let loginname=sessionStorage.getItem('loginuser');//取值
                this.name=JSON.parse(loginname).username;//转换赋值
                this.pwd=JSON.parse(loginname).password;
                this.form=JSON.parse(sessionStorage.getItem('loginuser'))
                
                //  axios.get(`http://localhost:3000/userlist?username=${this.name}&password=${this.pwd}`).then((res)=>{
                //     const {status,data} = res;
                //     console.log(data,status);
                //     // this.form = data;
                //     // console.log(this.form);
                // })

            },

            //点击修改信息
            onSubmit() {
                this.$message('修改成功')
                var update = {
                    id:this.form.id,
                    username:this.form.username,
                    name: this.form.name,
                    sex:this.form.sex,
                    phone:this.form.phone,
                    email:this.form.email,
                    password:this.form.password
                }
                // console.log(update.toString())
                axios.put(`http://localhost:3000/userlist/${this.form.id}`,update).then(res=>{
                    console.log(res.data);
                    // const {status,data} = res;
                    // if(status === 200){
                    // console.log("yijingupdate:"+data)}
                    // console.log('下面是更新的data');
                    // console.log(data);
                    sessionStorage.setItem('loginuser',JSON.stringify(res.data));
                })
                axios.patch('http://localhost:3000/userlist/'+this.form.id,update).then(res=>{
                    // console.log("modify  res:"+res)
                    // console.log(res.data.data);
                    // if(res.data.data ===1){
                    this.userEditForm  = false;
                    // }
                })
                console.log('submit!');


            }
        },
        mounted() {
            this.getaxioxData()
        }
    }
</script>

<style scoped>

</style>