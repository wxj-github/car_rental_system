<template>
  <div class="find-container">
    <div class="indents">
      <div
        class="indent"
        v-for="(item, index) in indents"
        :key="item.id"
        @mouseenter="countTime(item.date[1])"
      >
        <span>经办人: {{ item.user }}</span>
        <span>
          <i class="el-icon-s-custom"></i>
          {{ item.name }}
        </span>
        <span>
          <i class="el-icon-mobile-phone"></i>
          {{ item.phone }}
        </span>
        <span>
          <i class="el-icon-location-outline"></i>
          {{ item.address }}
        </span>
        <span>
          <i class="el-icon-truck"></i>
          {{ item.type }}
        </span>
        <span>
          <i class="el-icon-postcard"></i>
          {{ item.num }}
        </span>
        <span>
          <i class="el-icon-date"></i>
          {{ item.date[0] + "-" + item.date[1] }}
        </span>
        <span>
          <i class="el-icon-coin"></i>
          {{ item.sumrent + "元" }}({{ item.rent + "元/天" }})
        </span>
        <span>
          订单剩余:
          <i>{{ countTime(item.date[1]) }}</i
          >小时
        </span>
        <div class="btn">
          <el-button round size="mini" @click="finish(index)"
            >完成订单</el-button
          >
          <el-button round size="mini" @click="urge(item.phone, index)"
            >催促还车</el-button
          >
        </div>
      </div>
    </div>
    <div class="find">
      <div class="tag">
        <el-tag type="info" effect="dark" v-show="tag1">超时订单</el-tag>
        <el-tag type="info" effect="dark" v-show="tag2">最近一个星期</el-tag>
        <el-tag type="info" effect="dark" v-show="tag3">最近一个月</el-tag>
      </div>
      <div class="findindents">
        <div
          class="findindent"
          v-for="(item,index) in find"
          :key="item"
          @mouseenter="countTime(item.date[1])"
        >
          <span>经办人: {{ item.user }}</span>
          <span>
            <i class="el-icon-s-custom"></i>
            {{ item.name }}
          </span>
          <span>
            <i class="el-icon-mobile-phone"></i>
            {{ item.phone }}
          </span>
          <span>
            <i class="el-icon-location-outline"></i>
            {{ item.address }}
          </span>
          <span>
            <i class="el-icon-truck"></i>
            {{ item.type }}
          </span>
          <span>
            <i class="el-icon-postcard"></i>
            {{ item.num }}
          </span>
          <span>
            <i class="el-icon-date"></i>
            {{ item.date[0] + "-" + item.date[1] }}
          </span>
          <span>
            <i class="el-icon-coin"></i>
            {{ item.sumrent + "元" }}({{ item.rent + "元/天" }})
          </span>
          <span>
            订单剩余:
            <i>{{ countTime(item.date[1]) }}</i
            >小时
          </span>
          <div class="btn">
            <el-button round size="mini" @click="finish(item.index,index)">完成订单</el-button>
            <el-button round size="mini" @click="urge(item.phone, item.index)">催促还车</el-button>
          </div>
        </div>
      </div>
      <div class="tagbtn">
        <el-button round size="small" @click="timeout">超时订单</el-button>
        <el-button round size="small" @click="week">最近一个星期</el-button>
        <el-button round size="small" @click="month">最近一个月</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import mock from '@/api/rentalmock'
export default {
  mounted () {
      this.getindent();
  },
  data() {
    return {
      //记录当前查询订单的剩余时间
      time: 0,
      //保存筛选出来的订单
      find: [],
      tag1: false,
      tag2: false,
      tag3: false,
      indents:[],
    };
  },
  methods: {
    getindent(){
      axios.get('/indents').then(response =>{
        this.indents=response.data;
      })
    },
    //计算订单剩余时间
    countTime(end) {
      var nowdate = new Date();
      var time = parseInt(
        (Date.parse(end) - Date.parse(nowdate)) / 1000 / 60 / 60
      );
      this.time = time;
      return time;
    },
    urge(phone) {
      if (this.time <= 0) {
        const loading = this.$loading({
          lock: true,
          text: "正在发送短信到\t" + phone,
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        setTimeout(() => {
          loading.close();
        }, 2000);
      } else {
        this.$message.error("订单未超时 !");
      }
    },
    finish(index,findindex) {
      if (this.time <= 0) {
        axios.post('/finishindent',this.indents[index]);
        axios.post('/deleteindent',index);
        this.indents.splice(index, 1);
        this.find.splice(findindex, 1);
        this.find.forEach(item=> {
          if(item.index>index){
            item.index--;
          }
        });
        this.$message.success("订单完成 !");
      } else {
        this.$message.error("订单未结束 !");
      }
    },
    timeout() {
      this.tag1 = !this.tag1;
      this.find=[];
      if(this.tag1){
        var index=-1;
        this.indents.forEach(item=> {
          index++;
          var start = -this.countTime(item.date[0]);
          var end = this.countTime(item.date[1]);
          if(this.tag2){
            if(start/24<=7&&end<0){
              this.find.push(item);
              this.find[this.find.length-1].index=index;
            }
          }else if(this.tag3){
            if(start/24<=30&&end<0){
              this.find.push(item);
              this.find[this.find.length-1].index=index;
            }
          }else{
            if(end<0){
              this.find.push(item);
              this.find[this.find.length-1].index=index;
            }
          }
        });
      }else{
        if(this.tag2){
          this.tag2 = false;
          this.week();
        }else if(this.tag3){
          this.tag3 = false;
          this.month();
        }
      }
    },
    week() {
      this.tag2 = !this.tag2;
      this.tag3 = false;
      this.find=[];
      if(this.tag2){
        var index=-1;
        this.indents.forEach(item=> {
          index++;
          var start = -this.countTime(item.date[0]);
          var end = this.countTime(item.date[1]);
          if(this.tag1){
            if(start/24<=7&&end<0){
              this.find.push(item);
              this.find[this.find.length-1].index=index;
            }
          }else{
            if(start/24<=7){
              this.find.push(item);
              this.find[this.find.length-1].index=index;
            }
          }
        });
      }else{
        if(this.tag1){
          this.tag1 = false;
          this.timeout();
        }
      }
    },
    month() {
      this.tag2 = false;
      this.tag3 = !this.tag3;
      this.find=[];
      if(this.tag3){
        var index=-1;
        this.indents.forEach(item=> {
          index++;
          var start = -this.countTime(item.date[0]);
          var end = this.countTime(item.date[1]);
          if(this.tag1){
            if(start/24<=30&&end<0){
              this.find.push(item);
              this.find[this.find.length-1].index=index;
            }
          }else{
            if(start/24<=30){
              this.find.push(item);
              this.find[this.find.length-1].index=index;
            }
          }
        });
      }else{
        if(this.tag1){
          this.tag1 = false;
          this.timeout();
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.find-container {
  widows: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  background-color: rgb(244, 244, 245);

  .indents {
    width: 35%;
    height: 100%;
    overflow: auto;
    .indent {
      width: 90%;
      height: 42%;
      margin: 10px 20px;
      border-radius: 10px;
      overflow: hidden;
      background-color: white;
      span {
        display: block;
        width: 100%;
        height: 20px;
        line-height: 20px;
        color: #606266;
        font-size: 15px;
        overflow: hidden;
        margin-bottom: 5px;
        i {
          margin: 0 10px;
        }
        &:first-child {
          text-align: center;
          margin-top: 10px;
        }
        &:last-of-type {
          height: 30px;
          line-height: 30px;
          text-align: center;
          margin-top: 8px;
          i {
            font-size: 20px;
            animation: i 1s infinite;
            @keyframes i {
              from {
                color: white;
              }
              to {
                color: #ff0000;
              }
            }
          }
        }
      }
      .btn {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 12px;
      }
    }
  }

  .find {
    width: 60%;
    height: 100%;
    margin-right: 17px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .tag {
      width: 100%;
      height: 10%;
      display: flex;
      align-items: flex-end;
      border-bottom: 1px solid #C0C4CC;

      .el-tag {
        margin-right: 10px;
        margin-bottom: 5px;
      }
    }
    .findindents {
      width: 100%;
      height: 47%;
      white-space: nowrap;
      overflow: auto;
      overflow-y: hidden;
      border-left: 1px solid #C0C4CC;
      .findindent {
        width: 40%;
        height: 95%;
        display: inline-block;
        margin: 8px 5px ;
        border-radius: 10px;
        overflow: hidden;
        background-color: white;
        span {
          display: block;
          width: 100%;
          height: 20px;
          line-height: 20px;
          color: #606266;
          font-size: 15px;
          overflow: hidden;
          margin-bottom: 5px;
          i {
            margin: 0 10px;
          }
          &:first-child {
            text-align: center;
            margin-top: 10px;
          }
          &:last-of-type {
            height: 30px;
            line-height: 30px;
            text-align: center;
            margin-top: 8px;
            i {
              font-size: 20px;
              animation: i 1s infinite;
              @keyframes i {
                from {
                  color: white;
                }
                to {
                  color: #ff0000;
                }
              }
            }
          }
        }
        .btn {
          width: 100%;
          display: flex;
          justify-content: center;
          margin-top: 12px;
        }
      }
    }
    .tagbtn {
      width: 100%;
      height: 20%;
      border-top: 1px solid #C0C4CC;
      // background-color: rgb(244, 244, 245);
      .el-button{
        margin-top: 5px;
      }
    }
  }
}
</style>
