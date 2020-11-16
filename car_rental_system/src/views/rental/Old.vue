<template>
  <div class="old-container">
    <div class="indents">
      <div
        class="indent"
        v-for="item in indents"
        :key="item.id"
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
      </div>
    </div>
    <div class="find">
      <div class="tag">
        <el-tag type="info" effect="dark" v-show="tag2">最近一个星期</el-tag>
        <el-tag type="info" effect="dark" v-show="tag3">最近一个月</el-tag>
      </div>
      <div class="findindents">
        <div
          class="findindent"
          v-for="item in find"
          :key="item"
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
        </div>
      </div>
      <div class="tagbtn">
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
    this.oldindents();
  },
  data() {
    return {
      //保存筛选出来的订单
      find: [],
      tag2: false,
      tag3: false,
      indents:[]
    };
  },
  methods: {
    oldindents(){
      axios.get('/oldindents').then(response =>{
        this.indents=response.data;
      })
    },
    //计算订单开始时间与当前时间的天数差
    countTime(end) {
      var nowdate = new Date();
      var time = parseInt(
        (Date.parse(end) - Date.parse(nowdate)) / 1000 / 60 / 60
      );
      return time;
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
          if(start/24<=7){
              this.find.push(item);
              this.find[this.find.length-1].index=index;
          }
        });
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
          if(start/24<=30){
              this.find.push(item);
              this.find[this.find.length-1].index=index;
            }
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.old-container {
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
      height: 31%;
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
      height: 35%;
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
        }
      }
    }
    .tagbtn {
      width: 100%;
      height: 20%;
      border-top: 1px solid #C0C4CC;
      .el-button{
        margin-top: 5px;
      }
    }
  }
}
</style>
