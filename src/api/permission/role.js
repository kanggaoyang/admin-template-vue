
import request from '@/utils/request'

export function roleList() {  
  return request({
    url: "/permission/role/list",
    method: "get",
  });
}

export function createRole(data) {  
  return request({
    url: "/permission/role/create",
    method: "post",
    data
  });
}

export function delRole(data) {  
  return request({
    url: "/permission/role/delete",
    method: "post",
    data
  });
}

export function detailRole(params) {  
  return request({
    url: "/permission/role/detail",
    method: "get",
    params
  });
}


export function updateRole(data) {  
  return request({
    url: "/permission/role/update",
    method: "post",
    data
  });
}

export function authRole(data) {  
  return request({
    url: "/permission/auth_role/setting",
    method: "post",
    data
  });
}

export function authList(data) {  
  return request({
    url: "/permission/auth_role/authlist",
    method: "post",
    data
  });
}



