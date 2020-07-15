import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/wzznps-pc/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/wzznps-pc/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/wzznps-pc/user/logout',
    method: 'post'
  })
}
