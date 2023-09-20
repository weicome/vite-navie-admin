import { AxiosResponse, InternalAxiosRequestConfig } from "axios"
import { isNullOrUnDef } from "../is"
import { isWithoutToken } from "./helpers"
import { useUserStore } from "@/store/modules"
import router from "@/router"

export const reqResolve = (config: InternalAxiosRequestConfig) => {
	if (config.method === "get") {
		config.params = { ...config.params, t: new Date().getTime() }
	}
	if (isWithoutToken(config)) {
		return config
	}

	const token = useUserStore().token
	if (!token) {
		router.push({ name: "Login" })
		return Promise.reject({ code: "-1", message: "未登录" })
	}
	config.headers.Authorization = config.headers.Authorization || "Bearer " + token
	return config
}

export const reqReject = (error: any) => {
	return Promise.reject(error)
}

export const resResolve = (response: AxiosResponse) => {
	return response?.data
}

export const resReject = (error: any) => {
	let { code, message } = error.response?.data || {}
	if (isNullOrUnDef(code)) {
		code = -1
		message = "接口异常"
	} else {
		switch (code) {
			case 401:
				message = message || "登录已过期"
				break
			case 403:
				message = message || "没有权限"
				break
			case 404:
				message = message || "资源或接口不存在"
				break
			default:
				message = message || "未知异常"
				break
		}
	}
	// console.error(`[${code}] ${error}`)
	window.$message.error(message)
	return Promise.resolve({ code, message, error })
}
