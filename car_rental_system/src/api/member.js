import request from '@/utils/request'


export default{
  //获取会员数据
  getList(){
      return request({
        url: '/data',
        method:'get'
      })
  },
  //分页搜索，page，当前页码，size每页条数，searchmap搜索条件
  search(page,size,searchmap){
    return request({
      url:`/member/list/search/${page}/${size}`,
      method:'post',
      data: searchmap
    })
  },
  delete(id){
    return request({
      url:`/data/${id}`,
      method:'delete',
      data: id
    })
  }
  
}