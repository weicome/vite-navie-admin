import { defAxios as request } from "@/utils/http";

export const getUsers = (data ={}) =>{
    return request({
        url: '/users',
        method: 'get',
        data
    })
}

export const getUserInfo = (id: string|number) =>{
    return request({
        url: `/user/${id}`,
        method: 'get',
    })
}

export const saveUser = (data = {}, id: string|number) =>{
    if(id){
        return request({
            url: '/user',
            method: 'put',
            data
        })
    }
    return request({
        url: `/user/${id}`,
        method: 'put',
        data
    })  
}

export const delUser = (id: string|number) =>{
    return request({
        url: `/user/${id}`,
        method: 'post',
    })  
}