import { Recordable } from "vite-plugin-mock"

// 获取token
export function resolveToken(authorization): string{
    const reqTokenSplit = authorization.split(' ')
    if(reqTokenSplit.length === 2){
        return reqTokenSplit[1]
    }
    return ''
}
// 请求成功
export function resultSuccess<T = Recordable>(data: T, {message = 'ok'} = {}){
    return {
        code: 0,
        data,
        message
    }
}
// 请求失败
export function resultError(message = 'Request failed') {
    return {
      code: -1,
      data: {},
      message
    };
}
// 分页成功
export function resultPageSuccess<T = any >(page: number, pageSize: number, list: T[]) {
    const pageData = pagination(page,pageSize,list)
    return {
        code: 0,
        data: {
            list: pageData,
            page: ~~page,
            size: ~~pageSize,
            total: list.length
        },
        message: 'success'
    }
}

// 分页器
export function pagination<T = any>(page: number, pageSize: number, array: T[]) {
    const offset = (page -1) * Number(pageSize)
    const ret = 
        offset + Number(pageSize) >= array.length 
        ? array.slice(offset, array.length)
        : array.slice(offset, offset + Number(pageSize))
    return ret
}