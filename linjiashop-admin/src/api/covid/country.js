import request from '@/utils/request'

export default {
  getList: function (params) {
    return request({
      url: '/covid/country/list',
      method: 'get',
      params
    })
  },
  save: function (params) {
    return request({
      url: '/covid/country',
      method: 'post',
      params
    })
  },
  remove: function (id) {
    return request({
      url: '/covid/country',
      method: 'delete',
      params: {
        id: id
      }
    })
  }
}
