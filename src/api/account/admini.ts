import { defAxios as request } from "@/utils/http"

const prefix = "/back/admin"

export const getAdmin = (data = {}) => {
	return request({
		url: `${prefix}/user/index`,
		method: "post",
		data
	})
}

export const getAdminInfo = (id: string | number) => {
	return request({
		url: `${prefix}/user/display`,
		method: "post",
		data: { id: id }
	})
}

export const saveAdmin = (data = {}, id: string | number) => {
	if (id) {
		return request({
			url: `${prefix}/user/modify`,
			method: "post",
			data: Object.assign({ id: id }, data)
		})
	}
	return request({
		url: `${prefix}/user/create`,
		method: "post",
		data
	})
}

export const delUser = (id: string | number) => {
	return request({
		url: `${prefix}/user/delete`,
		method: "post",
		data: { id: id }
	})
}
