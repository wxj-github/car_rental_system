import axios from 'axios'
export const getUserData = () => {
  return axios.request({
    url: 'user',
    method: 'get',
  })
}
export const getMenu = () => {
  return axios.request({
    url: 'menu',
    method: 'get',
  })
}
export const getCar = () => {
  return axios.request({
    url: 'car',
    method: 'get',
  })
}
export const postCar = () => {
  return axios.request({
    url: 'post/car',
    method: 'post',
  })
}
