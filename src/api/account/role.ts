import { defAxios as request } from "@/utils/http"

const prefix = "/back/admin"

export const getRoleList = (data = {}) => {
	return request({
		url: `${prefix}/role/index`,
		method: "post",
		data
	})
}

export const getRoleInfo = (id: string | number) => {
	return request({
		url: `${prefix}/role/display`,
		method: "post",
		data: { id: id }
	})
}

export const saveRole = (data = {}, id: string | number) => {
	if (id) {
		return request({
			url: `${prefix}/role/modify`,
			method: "post",
			data: [{ id: id }, data]
		})
	}
	return request({
		url: `${prefix}/role/create`,
		method: "post",
		data
	})
}

export const delRole = (id: string | number) => {
	return request({
		url: `${prefix}/role/delete`,
		method: "post",
		data: { id: id }
	})
}
