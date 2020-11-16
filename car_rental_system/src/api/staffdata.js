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
export const getman = () => {
  return axios.request({
    url: 'man',
    method: 'get',
  })
}
export const postman = () => {
  return axios.request({
    url: 'post/man',
    method: 'post',
  })
}
