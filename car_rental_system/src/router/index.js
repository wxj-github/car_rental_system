import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login'
import Main from '../components/main'
import MemberSystem from '../views/membersystem'
import StoreSystem from '../views/storesystem'
import UserSystem from '../views/usersystem'
import Rental from '../views/rental/Rental.vue'
import Add from '../views/rental/Add.vue'
import Find from '../views/rental/Find.vue'
import Old from '../views/rental/Old.vue'

Vue.use(VueRouter)

//避免重复点击的警告，报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}



const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      {
        path: '/member',
        name: "Membersystem",
        component: MemberSystem,
        meta: { title: '会员信息管理' }
      },
      {
        path: '/store',
        name: "StoreSystem",
        component: StoreSystem, meta: { title: '门店信息管理' }
      },
      {
        path: '/user',
        name: "UserSystem",
        component: UserSystem, meta: { title: '系统用户管理' }
      },
      {
        path: '/benz',
        name: 'benz',
        component: () => import('@/views/car/system/Benz/Benz.vue'),
        meta: { title: '奔驰系列' }
      },
      {
        path: '/bmw',
        name: 'bmw',
        component: () => import('@/views/car/system/BMW/BMW.vue'),
        meta: { title: '宝马系列' }
      },
      {
        path: '/nissan',
        name: 'nissan',
        component: () => import('@/views/car/system/Nissan/Nissan.vue'),
        meta: { title: '日产系列' }
      },
      {
        path: '/faw-vk',
        name: 'faw-vk',
        component: () => import('@/views/car/system/FAW-VK/FAW-VK.vue'),
        meta: { title: '大众系列' }
      },
      {
        path: '/deletecar',
        name: 'deletecar',
        component: () => import('@/views/car/system/caozuoyixia/DeleteData.vue'),
        meta: { title: '删除汽车信息' }
      },
      {
        path: '/addcar',
        name: 'addcar',
        component: () => import('@/views/car/system/caozuoyixia/AddData.vue'),
        meta: { title: '添加汽车信息' }
      },
      {
        path: '/book',
        name: 'book',
        component: () => import('@/views/book.vue'),
        meta: { title: '维修预约' }
      },
      {
        path: '/repair',
        name: 'repair',
        component: () => import('@/views/repair.vue'),
        meta: { title: '维修情况' }
      },
      {
        path: '/staff',
        name: 'staff',
        component: () => import('@/views/staff.vue'),
        meta: { title: '员工信息管理' }
      },
      {
        path: '/Addstore',
        name: 'Addstore',
        component: () => import('@/views/Addstore.vue'),
        meta: { title: '添加门店信息' }
      },
      {
        path: '/Usermsg',
        name: 'Usermsg',
        component: () => import('@/views/Usermsg.vue'),
        meta: { title: '个人中心' }
      },
      {
        path: '/rental',
        component: Rental,
        children: [
          { path: '', redirect: 'add'},
          { path: 'add', component: Add ,meta: { title: '生成订单' }},
          { path: 'find', component: Find, meta: { title: '订单跟踪' } },
          { path: 'old', component: Old, meta: { title: '历史订单' }},
        ]
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
