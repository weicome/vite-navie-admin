import { defAxios as request } from "@/utils/http"
import { AxiosResponse } from "axios"

const prefix = "/back/admin"

export const login = (data: LoginParams): Promise<AxiosResponse<LoginResult>> => {
	return request({
		url: `${prefix}/auth/login`,
		method: "post",
		data
	})
}

export const refreshToken = (): Promise<AxiosResponse<LoginResult>> => {
	return request({
		url: `${prefix}/auth/refresh`,
		method: "post"
	})
}

export const getInfo = (): Promise<AxiosResponse<UserInfo>> => {
	return request({
		url: `${prefix}/auth/info`,
		method: "post"
	})
}

export const logout = () => {
	return request({
		url: `${prefix}/auth/logout`,
		method: "post"
	})
}

//无用
export const getRole = (): Promise<AxiosResponse<UserRole>> => {
	return request({
		url: "/auth/getRole",
		method: "get"
	})
}
