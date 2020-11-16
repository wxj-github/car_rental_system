<template>
  <div id="main">
    <el-card shadow="always">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入查找内容"
            v-model="input"
            clearable>
          </el-input>
        </el-col>
        <el-col :span="4"><el-button type="primary" @click="msgTo('Addstore')">添加门店信息</el-button></el-col>
      </el-row>
        <el-table
        :data="input=='' ? tableData : tableData1 "
          border
          :header-cell-style="{'text-align':'center'}"
          :cell-style="{'text-align':'center'}"
          style="width: 100%">
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column
            prop="shop"
            label="店名"
            width="100">
          </el-table-column>
          <el-table-column
            prop="name"
            label="店长"
            width="60">
          </el-table-column>
          <el-table-column
            prop="num"
            label="店员数"
            width="70">
          </el-table-column>
          <el-table-column
            prop="car"
            label="车辆数"
            width="70">
          </el-table-column>
          <el-table-column
            prop="money"
            label="利润(万）"
            width="80">
          </el-table-column>
          <el-table-column
            prop="time"
            label="营业时间"
            width="100">
          </el-table-column>
          <el-table-column
            prop="tel"
            label="电话"
            width="100">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
          <el-table-column
            label="操作"
            fixed="right"
            width="180">
            <template slot-scope="scope">
              <el-button
                icon="el-icon-edit"
                type="primary"
                size="mini"
                @click="msgTo('Addstore',scope.$index)">编辑</el-button>
              <el-button
                icon="el-icon-delete"
                size="mini"
                type="danger"
                @click="Delete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      input: '',
      tableData: [{
        shop: '汽租分店一',
        name: '大王',
        num: '5',
        car: '20',
        money: '6',
        time: '8:00-20:00',
        tel: '12366840',
        address: '广东省清远市嘟嘟区破烂大街49号'
      },
      {
        shop: '汽租分店二',
        name: '二王',
        num: '3',
        car: '16',
        money: '4.2',
        time: '00:00-10:00',
        tel: '12366850',
        address: '广东省清远市巨人区进击大街1-8号'
      },
      {
        shop: '汽租分店3',
        name: '小王',
        num: '5',
        car: '22',
        money: '5',
        time: '12:00-24:00',
        tel: '12366848',
        address: '广东省清远市部落区野蛮村委会19号'
      },
      {
        shop: '汽租分店四',
        name: '大小王',
        num: '4',
        car: '18',
        money: '4.5',
        time: '10:00-22:00',
        tel: '12366834',
        address: '广东省清远市猪登豆万大广场对面的对面'
      }],
      options: [{
        value: 'shop',
        label: '店名'
      }, {
        value: '选项2',
        label: '店长'
      }, {
        value: '选项3',
        label: '店员数'
      }, {
        value: '选项4',
        label: '车辆数'
      }, {
        value: '选项5',
        label: '电话'
      }, {
        value: '选项6',
        label: '地址'
      }],
      value: ''
    }
  },
  created () {
    this.tableData = JSON.parse(localStorage.getItem('DataList'))
    console.log(this.tableData)
  },
  methods: {
    Delete (index, row) {
      console.log(index, row)
      const bool = window.confirm('是否删除此项信息')
      if (bool) {
        this.tableData.splice(index, 1)
        localStorage.setItem('DataList', JSON.stringify(this.tableData))
      }
    },
    msgTo(routeName, index) {
      this.$router
        .push({ name: routeName, params: { index: index } })
        .catch(() => {})
    }
  },
  computed: {
    tableData1 () {
      return this.tableData.filter((item) => item.shop.indexOf(this.input) > -1)
    }
  }
}
</script>

<style lang="less" scoped>
.el-table{
  margin-top: 15px;
  font-size: 12px;
}

.el-breadcrumb{
  margin-bottom: 15px;
}

.el-row{
  margin-bottom: 30px;
}
</style>
