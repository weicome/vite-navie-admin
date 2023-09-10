import axios, { AxiosInstance, AxiosRequestConfig } from "axios"
import { resResolve, resReject, reqResolve, reqReject } from "./interceptors"

const createAxios = (options: AxiosRequestConfig = {}): AxiosInstance => {
	const defaultOptions: AxiosRequestConfig = {
		baseURL: import.meta.env.VITE_APP_BASE_API,
		timeout: 12000
	}

	const service = axios.create({ ...defaultOptions, ...options })
	service.defaults.withCredentials = true // 该设置由laravel规定跨域
	service.interceptors.request.use(reqResolve, reqReject)
	service.interceptors.response.use(resResolve, resReject)
	return service
}

export const defAxios = createAxios()
