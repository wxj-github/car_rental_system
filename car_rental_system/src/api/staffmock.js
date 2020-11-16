import Mock from 'mockjs'

Mock.setup({
  timeout: 100,
})

Mock.mock('/api/menu', {
  menulist: [
    {
      id: 100,
      title: '员工信息',
      path: '/xinxi',
      sList: [
        { id: 101, title: '员工信息管理', path: '/main' }
      ],
    },
  ],
})

const getQuery = (url, name) => {
  console.log(url, name)
  const index = url.indexOf('?')
  if (index !== -1) {
    const queryStr = url.substr(index + 1).split('&')
    for (let i = 0; i < queryStr.length; i++) {
      const itemArr = queryStr[i].split('=')
      if (itemArr[0] === name) {
        return itemArr[1]
      }
    }
  }
  return null
}
const { manlist } = Mock.mock({
  'manlist|50-90': [
    {
      id: '@increment()',
      name: '@cname()',
      phone: '@integer(10000)',
      money: '@natural(3000, 1000000)',
      Address: '@county(true)',
      Email: '@email',
    },
  ],
})

Mock.mock(/\/api\/man/, 'get', (options) => {
  const pageNum = getQuery(options.url, 'pageNum')
  const pageSize = getQuery(options.url, 'pageSize')
  const start = (pageNum - 1) * pageSize
  const end = pageSize * pageNum
  const totalPage = Math.ceil(manlist.length / pageSize)
  const list = pageNum > totalPage ? [] : manlist.slice(start, end)
  return { list: list } //返回这个数组,也就是返回处理后的假数据
})
Mock.mock('/api/post/man', () => {
  return manlist //返回这个数组,也就是返回处理后的假数据
})
Mock.mock('/api/addman', 'post', (options) => {
  console.log(options)
  const body = JSON.parse(options.body)
  manlist.push(
    Mock.mock({
      id: '@increment()',
      name: body.name,
      phone: body.phone,
      money: body.money,
      Address: body.Address,
      Email: body.Email,
    })
  )
  return {
      list: manlist,
      boo:true,
  }
})
Mock.mock('/api/search', 'post', (options) => {
  console.log(options)
  const body = JSON.parse(options.body)
  console.log(body)
  let list = manlist.filter((item)=>{
    　　　　var reg= new RegExp(body.name,'i');
    　　　　return reg.test(item.name);
    　　});
  console.log(manlist)
  return {
      list: list,
      boo:true,
  }
})
Mock.mock('/api/return', 'post', (options) => {
  console.log(options)
  const body = JSON.parse(options.body)
  console.log(body)
  let list = manlist.filter((item)=>{
    return item.id==body.id;
    　　});
  console.log(list)
  return {
      list: list,
      
  }
})
Mock.mock('/api/updata', 'post', (options) => {
  console.log(options)
  const body = JSON.parse(options.body)
  console.log(body)
  manlist.splice(body.id - 1,1,body)
  console.log(manlist)
  return {
      list: manlist,

  }
})
Mock.mock('/api/delete', 'post', (options) => {
  console.log(options)
  let deleteObj = JSON.parse(options.body)
  let deleteId = deleteObj.id
   console.log(deleteId, 'deleteId')
  let List = manList.filter(val => val.id !== deleteId)
  return {
    code: '0',
    message: 'success',
    data: []
  }
})
