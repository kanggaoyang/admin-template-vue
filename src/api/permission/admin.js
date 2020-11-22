import request from '@/utils/request'

export function list() {  
  return request({
    url: "/permission/admin/list",
    method: "get",
  });
}

export function create(data) {  
  return request({
    url: "/permission/admin/create",
    method: "post",
    data
  });
}

export function del(data) {  
  return request({
    url: "/permission/admin/delete",
    method: "post",
    data
  });
}
export function detail(params) {  
  return request({
    url: "/permission/admin/detail",
    method: "get",
    params
  });
}
export function update(data) {  
  return request({
    url: "/permission/admin/update",
    method: "post",
    data
  });
}
