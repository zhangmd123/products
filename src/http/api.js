/*
* api接口统一管理
*/
import { get, post, del, put } from './index.js';
// const baseurl = 'http://localhost:3009'

/*getarr*/
export const _userlist = p => get('/userlist', p)

/* 添加一条 */
export const _submit = p => post('/user', p)

//用户登录
export const loginApi = p => post('/api/v1/auth/manager_login', p);

//商品
export const listApi = p => get('/api/v1/admin/products', p);
export const createApi = p => post('/api/v1/admin/products', p);
export const modifyOne = (id, p) => put(`/api/v1/admin/products/${id}`, p);  //修改
export const delOne = (id) => del(`/api/v1/admin/products/${id}`);  //删除
export const getOneById = id => get(`/api/v1/admin/products/${id}`);  //根据id获取获取数据

//商品分类
export const _getCategory = p => get('/api/v1/admin/product_categories', p);
export const _createCategory = p => post('/api/v1/admin/product_categories', p);
export const _delCategory = (id) => del(`/api/v1/admin/product_categories/${id}`);  //删除
export const _modifyCategory = (id, p) => put(`/api/v1/admin/product_categories/${id}`, p);  //修改