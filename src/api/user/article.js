import request from "@/utils/request";

export function lists(params) {
  return request({
    url: "/article/lists",
    method: "get",
    params
  });
}

export function create(data) {
  return request({
    url: "/article/create",
    method: "post",
    data,
  });
}

export function del(data) {
  return request({
    url: "/article/delete",
    method: "post",
    data,
  });
}


export function detail(params) {
  return request({
    url: "/article/detail",
    method: "get",
    params
  });
}


export function categoryList(params) {
  return request({
    url: "/category/list",
    method: "get",
    params
  });
}