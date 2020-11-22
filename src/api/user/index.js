import request from "@/utils/request";

export function login(data) {
  return request({
    url: "/login",
    method: "post",
    data,
  });
}

export function userinfo(params) {
  return request({
    url: "/userinfo",
    method: "get",
    params
  });
}


export function lists(params) {
  return request({
    url: "/user/lists",
    method: "get",
    params
  });
}


export function del(data) {
  return request({
    url: "/user/delete",
    method: "post",
    data,
  });
}

export function delMany(data) {
  return request({
    url: "/user/deleteMany",
    method: "post",
    data,
  });
}


export function create(data) {
  return request({
    url: "/user/create",
    method: "post",
    data,
  });
}

export function detail(params) {
  return request({
    url: "/user/detail",
    method: "get",
    params
  });
}

export function update(data) {
  return request({
    url: "/user/update",
    method: "post",
    data,
  });
}



