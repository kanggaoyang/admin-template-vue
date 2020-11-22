
import request from '@/utils/request'

export function menus() {  
  return request({
    url: "/permission/menu/list",
    method: "get",
  });
}

export function createMenu(data) {  
  return request({
    url: "/permission/menu/create",
    method: "post",
    data
  });
}

export function delMenu(data) {  
  return request({
    url: "/permission/menu/delete",
    method: "post",
    data
  });
}

export function detailMenu(params) {  
  return request({
    url: "/permission/menu/detail",
    method: "get",
    params
  });
}


export function updateMenu(data) {  
  return request({
    url: "/permission/menu/update",
    method: "post",
    data
  });
}


