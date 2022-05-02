import request from '../request/request'

export function getIndex() {
    return request({
        url: '/api/shop/classList',
        method: 'post'
    })
}