import request from '@/utils/request'

export function getList(params) {
    return request({
        url: '/business/card/list',
        method: 'get',
        params
    })
}


export function save(params) {
    return request({
        url: '/business/card',
        method: 'post',
        params
    })
}

export function remove(id) {
    return request({
        url: '/business/card',
        method: 'delete',
        params: {
            id: id
        }
    })
}
