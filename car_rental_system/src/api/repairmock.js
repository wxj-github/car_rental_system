import Mock from 'mockjs'

Mock.setup({
  timeout: 100,
})

Mock.mock('/api/user', {
  username: '老陈',
  password: '12345',
  state: '1',
})
Mock.mock('/api/menu', {
  menulist: [
    {
      id: 100,
      title: '维修平台',
      path: '/weixiu',
      sList: [
        { id: 101, title: '维修情况', path: '/main' },

        {
          id: 102,
          title: '维修预约',
          path: '/book',
        },
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
const { carlist } = Mock.mock({
  'carlist|50-90': [
    {
      id: '@increment()',
      carname: '@first()',
      hostname: '@cname()',
      phone: '@natural(13000000000, 13999999999)',
      money: '@natural(3000, 10000)',
      state: '@boolean()',
      name: '@cname()',
      Address: '@county(true)',
      Email: '@email',
    },
  ],
})

Mock.mock(/\/api\/car/, 'get', (options) => {
  const pageNum = getQuery(options.url, 'pageNum')
  const pageSize = getQuery(options.url, 'pageSize')
  const start = (pageNum - 1) * pageSize
  const end = pageSize * pageNum
  const totalPage = Math.ceil(carlist.length / pageSize)
  const list = pageNum > totalPage ? [] : carlist.slice(start, end)
  return { list: list } //返回这个数组,也就是返回处理后的假数据
})
Mock.mock('/api/post/car', () => {
  return carlist //返回这个数组,也就是返回处理后的假数据
})
Mock.mock('/api/addcar', 'post', (options) => {
  console.log(options)
  const body = JSON.parse(options.body)
  carlist.push(
    Mock.mock({
      id: '@increment()',
      carname: body.carname,
      hostname: body.hostname,
      phone: body.phone,
      money: body.money,
      state: body.state,
      name: '@cname()',
      Address: '@county(true)',
      Email: '@email',
    })
  )
  return {
    list: carlist,
    boo: true,
  }
})
Mock.mock('/api/search2', 'post', (options) => {
  console.log(options)
  const body = JSON.parse(options.body)
  console.log(body)
  let list = carlist.filter((item)=>{
    　　　　var reg= new RegExp(body.name,'i');
    　　　　return reg.test(item.name);
    　　});
  console.log(carlist)
  return {
      list: list,
      boo:true,
  }
})
Mock.mock('/api/search', 'post', (options) => {
  console.log(options)
  const body = JSON.parse(options.body)
  console.log(body)
  let list = carlist.filter((item) => {
    var reg = new RegExp(body.hostname, 'i')
    return reg.test(item.hostname)
  })
  /*let list = carlist.filter(item => {
    return item.hostname ==body.hostname
  } )*/
  console.log(carlist)
  return {
    list: list,
    boo: true,
  }
})
Mock.mock('/api/return', 'post', (options) => {
  console.log(options)
  const body = JSON.parse(options.body)
  console.log(body)
  let list = carlist.filter((item) => {
    return item.id == body.id
  })
  /*let list = carlist.filter(item => {
    return item.hostname ==body.hostname
  } )*/
  console.log(list)
  return {
    list: list,
  }
})
Mock.mock('/api/updata', 'post', (options) => {
  //console.log(options)
  const body = JSON.parse(options.body)
  console.log(body)
  let list = carlist.filter((item) => {
    var reg = new RegExp(body.hostname, 'i')
    return reg.test(item.hostname)
  })
  list[0].username = body.username
  list[0].hostname = body.hostname
  list[0].phone = body.phone
  list[0].money = body.money
  list[0].state = body.state
  
  
  console.log(list)
  carlist.splice(body.id - 1, 1, list[0])
  /*let list = carlist.filter(item => {
    return item.hostname ==body.hostname
  } )*/
  console.log(carlist)
  return {
    list: carlist,
  }
})
Mock.mock('/api/updata2', 'post', (options) => {
  //console.log(options)
  const body = JSON.parse(options.body)
  console.log(body)
  let list = carlist.filter((item) => {
    var reg = new RegExp(body.name, 'i')
    return reg.test(item.name)
  })
  //list[0].username = body.username
  //list[0].hostname = body.hostname
  list[0].phone = body.phone
  list[0].money = body.money
  list[0].name = body.name
  list[0].Address = body.Address
  list[0].Email = body.Email

  console.log(list)
  carlist.splice(body.id - 1, 1, list[0])
  /*let list = carlist.filter(item => {
    return item.hostname ==body.hostname
  } )*/
  console.log(carlist)
  return {
    list: carlist,
  }
})
const { booklist } = Mock.mock({
  'booklist|10-30': [
    {
      id: '@increment()',
      carname: '@first()',
      hostname: '@cname()',
      phone: '@natural(13000000000, 13999999999)',
      date: '@date',
      type: '大修',
    },
  ],
})
Mock.mock('/api/book', 'get', () => {
  console.log(booklist)
  return {
    list: booklist,
  }
})
Mock.mock('/api/addbook', 'post', (options) => {
  //console.log(options)
  const body = JSON.parse(options.body)
  console.log(body)
  booklist.push(
    Mock.mock({
      id: '@increment()',
      carname: body.carname,
      hostname: body.hostname,
      phone: body.phone,
      date: body.date,
      type: body.type,
    })
  )
  console.log(booklist)
  return {
    list: booklist,
    boo: true,
  }
})
Mock.mock('/api/booktocar', 'post', (options) => {
  console.log(options)
  const body = JSON.parse(options.body)
  const index = booklist.findIndex((item) => item.id === body.id)
  booklist.splice(index, 1)
  carlist.push(
    Mock.mock({
      id: '@increment()',
      carname: body.carname,
      hostname: body.hostname,
      phone: body.phone,
      money: '@natural(600, 10000)',
      state: 'false',
      name: '@cname()',
      Address: '@county(true)',
      Email: '@email',
    })
  )
  return {
    list: carlist,
    blist: booklist,
    boo: true,
  }
})
