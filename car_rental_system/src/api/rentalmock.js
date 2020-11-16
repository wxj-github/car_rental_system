import Mock from 'mockjs'

let indentList = [
  {
    user: "陈奕迅",
    name: "周杰伦",
    phone: "18026178094",
    address: "肇庆学院",
    type: "奥迪A6",
    num: "粤A·74MN4",
    date: ["2020/8/23", "2020/8/29"],
    rent: 160,
    sumrent: 960,
  },
  {
    user: "陈奕迅",
    name: "李荣浩",
    phone: "17026171094",
    address: "肇庆学院",
    type: "雷克萨斯ES",
    num: "粤S·74MN4",
    date: ["2020/8/17", "2020/8/26"],
    rent: 160,
    sumrent: 2691,
  },
  {
    user: "陈奕迅",
    name: "谢霆锋",
    phone: "16026171094",
    address: "肇庆学院",
    type: "宝马X5",
    num: "粤H·74MN4",
    date: ["2020/7/20", "2020/8/25"],
    rent: 160,
    sumrent: 4331,
  },
  {
    user: "陈奕迅",
    name: "林忆莲",
    phone: "15026171094",
    address: "肇庆学院",
    type: "宝马X7",
    num: "粤S·74MN4",
    date: ["2020/8/23", "2020/8/29"],
    rent: 160,
    sumrent: 320,
  },
  {
    user: "陈奕迅",
    name: "莫文蔚",
    phone: "14026171094",
    address: "肇庆学院",
    type: "奥迪A7",
    num: "粤S·74MN4",
    date: ["2020/6/23", "2020/8/25"],
    rent: 160,
    sumrent: 3200,
  },
  {
    user: "陈奕迅",
    name: "刘德华",
    phone: "18526171094",
    address: "肇庆学院",
    type: "雷克萨斯ES",
    num: "粤S·74MN4",
    date: ["2020/8/17", "2020/8/24"],
    rent: 160,
    sumrent: 320,
  },
  {
    user: "陈奕迅",
    name: "张学友",
    phone: "18096171094",
    address: "肇庆学院",
    type: "雷克萨斯LS",
    num: "粤S·74MN4",
    date: ["2020/7/30", "2020/8/28"],
    rent: 160,
    sumrent: 320,
  },
];

let oldindents = [
  {
    user: "陈奕迅",
    name: "周杰伦",
    phone: "18026178094",
    address: "肇庆学院",
    type: "奥迪A6",
    num: "粤A·74MN4",
    date: ["2020/8/23", "2020/8/24"],
    rent: 160,
    sumrent: 960,
  },
  {
    user: "陈奕迅",
    name: "李荣浩",
    phone: "17026171094",
    address: "肇庆学院",
    type: "雷克萨斯ES",
    num: "粤S·74MN4",
    date: ["2020/8/17", "2020/8/25"],
    rent: 160,
    sumrent: 2691,
  },
  {
    user: "陈奕迅",
    name: "谢霆锋",
    phone: "16026171094",
    address: "肇庆学院",
    type: "宝马X5",
    num: "粤H·74MN4",
    date: ["2020/7/20", "2020/8/25"],
    rent: 160,
    sumrent: 4331,
  },
  {
    user: "陈奕迅",
    name: "林忆莲",
    phone: "15026171094",
    address: "肇庆学院",
    type: "宝马X7",
    num: "粤S·74MN4",
    date: ["2020/8/23", "2020/8/24"],
    rent: 160,
    sumrent: 320,
  },
  {
    user: "陈奕迅",
    name: "莫文蔚",
    phone: "14026171094",
    address: "肇庆学院",
    type: "奥迪A7",
    num: "粤S·74MN4",
    date: ["2020/6/23", "2020/8/20"],
    rent: 160,
    sumrent: 3200,
  },
  {
    user: "陈奕迅",
    name: "刘德华",
    phone: "18526171094",
    address: "肇庆学院",
    type: "雷克萨斯ES",
    num: "粤S·74MN4",
    date: ["2020/8/17", "2020/8/20"],
    rent: 160,
    sumrent: 320,
  },
  {
    user: "陈奕迅",
    name: "张学友",
    phone: "18096171094",
    address: "肇庆学院",
    type: "雷克萨斯LS",
    num: "粤S·74MN4",
    date: ["2020/7/30", "2020/8/25"],
    rent: 160,
    sumrent: 320,
  },
];

Mock.mock('/addindent', ops=>{
    ops = JSON.parse(ops.body)
    indentList.push(ops)
})
Mock.mock('/indents', indentList)
Mock.mock("/deleteindent", (ops) => {
    ops = JSON.parse(ops.body);
    // alert(ops);
    indentList.splice(ops, 1);
});
Mock.mock("/finishindent", (ops) => {
  ops = JSON.parse(ops.body);
  oldindents.push(ops);
});
Mock.mock("/oldindents", oldindents);