import {defAxios as request} from '@/utils/http'
import { AxiosResponse } from 'axios'

export const login = (data: LoginParams): Promise<AxiosResponse<LoginResult>> =>{
    return request({
        url: '/auth/login',
        method: 'post',
        data,
    })
}

export const refreshToken = (): Promise<AxiosResponse<LoginResult>> => {
    return request({
        url: '/auth/login',
        method: 'post',
    })
}

export const getInfo = (): Promise<AxiosResponse<UserInfo>> => {
    return request({
        url: '/auth/getInfo',
        method: 'get',
    })
}

export const logout = () => {
    return request({
      url: '/auth/logout',
      method: 'post',
    });
}

export const getRole = (): Promise<AxiosResponse<UserRole>> => {
    return request({
        url: '/auth/getRole',
        method: 'get'
    })
}