<template>
    <div>
        <el-card>
            <el-row :gutter="25">
                <el-col :span="10">
                    <!-- 搜索添加 -->
                    <el-input placeholder="请输入要搜索的员工姓名" v-model="queryInfo.query" clearable @clear="search">
                        <el-button icon="el-icon-search" slot="append" @click="search">搜索</el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="addDialogVisible = true">添加员工信息</el-button>
                </el-col>
            </el-row>
            <el-table :data="manlist" boder stripe>
                <el-table-column label="编号" prop="id"></el-table-column>
                <el-table-column label="员工姓名" prop="name"></el-table-column>
                <el-table-column label="电话" prop="phone"></el-table-column>
                <el-table-column label="工资" prop="money"></el-table-column>
                <el-table-column label="地址" prop="Address"></el-table-column>
                <el-table-column label="邮箱" prop="Email"></el-table-column>
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
                        :page-sizes="[ 2, 5,10, 100]"
                        :page-size="queryInfo.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                ></el-pagination>
            </div>
        </el-card>
        <el-dialog title="添加员工信息" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
            <!-- 内容主体区域 -->
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="80px">
                <!-- 用户名 -->
                <el-form-item label="员工姓名" prop="name">
                    <el-input v-model="addForm.name"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="phone">
                    <el-input v-model="addForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="工资" prop="money">
                    <el-input v-model="addForm.money"></el-input>
                </el-form-item>
                <el-form-item label="地址" prop="Address">
                    <el-input v-model="addForm.Address"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="Email">
                    <el-input v-model="addForm.Email"></el-input>
                </el-form-item>
            </el-form>
            <!-- 内容底部区域 -->
            <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </span>
        </el-dialog>
        <!-- 修改用户对话框 -->
        <el-dialog title="修改员工信息" :visible.sync="editDialogVisible" width="50%" @colse="editDialogClosed">
            <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
                <el-form-item label="编号" prop="id">
                    <el-input v-model="editForm.id" disabled></el-input>
                </el-form-item>
                <el-form-item label="员工信息" prop="name">
                    <el-input v-model="editForm.name"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="phone">
                    <el-input v-model="editForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="工资" prop="money">
                    <el-input v-model="editForm.money"></el-input>
                </el-form-item>
                <el-form-item label="地址" prop="Address">
                    <el-input v-model="editForm.Address"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="Email">
                    <el-input v-model="editForm.Email"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
        </el-dialog>
    </div>
</template>
.
<script>
    import axios from 'axios'
    

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
                    pageSize: 10,
                },
                list: [],
                blist: [],
                manlist: [], // 用户列表
                total: 0, // 最大数据记录
                addDialogVisible: false,
                addForm: {
                    name: '',
                    phone: '',
                    money: '',
                    Address: '',
                    Email: '',
                },
                editForm: {
                    id: '',
                    name: '',
                    phone: '',
                    money: '',
                    Address: '',
                    Email: '',
                },
                editDialogVisible: false,
                addFormRules: {
                    name: [
                        { required: true, message: '请输入员工姓名', trigger: 'blur' },
                        { min: 2, max: 8, message: '长度在为 2~6 位', trigger: 'blur' },
                    ],
                    phone: [
                        { required: true, message: '请输入员工电话号码', trigger: 'blur' },
                        { min: 6, max: 11, message: '长度在为 6~11 位', trigger: 'blur' },
                    ],
                    money: [
                        { required: true, message: '请输入工资', trigger: 'blur' },
                        { min: 2, max: 11, message: '长度在为 2~11 位', trigger: 'blur' },
                    ],
                    Address: [
                        { required: true, message: '请输入地址', trigger: 'blur' },
                        { min: 2, max: 11, message: '长度在为 2~11 位', trigger: 'blur' },
                    ],
                    Email: [
                        { required: true, message: '请输入邮箱', trigger: 'blur' },
                        { min: 6, max: 20, message: '长度在为 6~20 位', trigger: 'blur' },
                    ],
                },
                editFormRules: {
                    name: [
                        { required: true, message: '请输入员工姓名', trigger: 'blur' },
                        { min: 2, max: 8, message: '长度在为 2~6 位', trigger: 'blur' },
                    ],
                    phone: [
                        { required: true, message: '请输入员工电话号码', trigger: 'blur' },
                        { min: 6, max: 11, message: '长度在为 6~11 位', trigger: 'blur' },
                    ],
                    money: [
                        { required: true, message: '请输入工资', trigger: 'blur' },
                        { min: 2, max: 11, message: '长度在为 2~11 位', trigger: 'blur' },
                    ],
                    Address: [
                        { required: true, message: '请输入地址', trigger: 'blur' },
                        { min: 2, max: 11, message: '长度在为 2~11 位', trigger: 'blur' },
                    ],
                    Email: [
                        { required: true, message: '请输入邮箱', trigger: 'blur' },
                        { min: 6, max: 20, message: '长度在为 6~20 位', trigger: 'blur' },
                    ],
                },
            }
        },
        created() {
            let o = this.queryInfo.pageNum
            this.getmanlist()
        },
        methods: {
            add() {
                this.$refs.addFormRef.validate(async (valid) => {
                    if (!valid) return
                    await axios
                        .post('/api/addcar', {
                            name: this.addForm.name,
                            phone: this.addForm.phone,
                            money: this.addForm.money,
                            Address: this.addForm.Address,
                            Email: this.addForm.Email,
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
            getmanlist() {
                axios
                    .get('/api/car', {
                        params: {
                            pageNum: this.queryInfo.pageNum,
                            pageSize: this.queryInfo.pageSize,
                        },
                    })
                    .then((res) => {
                        this.manlist = res.data.list
                    })
            },
            addDialogClosed() {
                this.$refs.addFormRef.resetFields()
            },
            // 监听pageSize改变的事件
            handleSizeChange(newSize) {
                this.queryInfo.pageSize = newSize
                this.getmanlist() // 数据发生改变重新申请数据
            },
            // 监听pageNum改变的事件
            handleCurrentChange(newPage) {
                this.queryInfo.pageNum = newPage
                this.getmanlist() // 数据发生改变重新申请数据
            },
            search() {
                axios
                    .post('/api/search2', {
                        name: this.queryInfo.query,
                    })
                    .then((res) => {
                        this.manlist = res.data.list
                    })
            },
            stop_search() {
                this.getmanlist()
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
                        this.editForm.name = res.data.list[0].name
                        this.editForm.phone = res.data.list[0].phone
                        this.editForm.money = res.data.list[0].money
                        this.editForm.Address = res.data.list[0].Address
                        this.editForm.Email = res.data.list[0].Email
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
                    .post('/api/updata2', {
                        id: this.editForm.id,
                        name: this.editForm.name,
                        phone: this.editForm.phone,
                        money: this.editForm.money,
                        Address: this.editForm.Address,
                        Email: this.editForm.Email,
                    })
                    .then((res) => {
                        console.log(res.statusText)
                        let a = res.statusText
                        if(a==='OK'){
                            this.$message.success("修改成功")
                            this.getmanlist()
                            this.editDialogVisible = false}

                    })
            },
            userStateChanged(userinfo) {

                axios
                    .post('/api/updata2', {
                        id: userinfo.id,
                        name: userinfo.name,
                        phone: userinfo.phone,
                        money: userinfo.money,
                        Address: userinfo.Address,
                        Email: userinfo.Email,
                    })
                    .then((res) => {
                        let a = res.statusText
                        if(a==='OK'){
                            this.$message.success("修改成功")
                            this.getmanlist()
                        }
                    })
            },
        },
    }
</script>

<style scoped>
    .el-breadcrumb {
        margin-bottom: 20px;
        font-size: 20px;
    }
</style>
