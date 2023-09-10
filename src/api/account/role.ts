import { defAxios as request } from "@/utils/http"

const prefix = "/back/admin"

export const getAdmin = (data = {}) => {
	return request({
		url: `${prefix}/role/index`,
		method: "post",
		data
	})
}

export const getAdminInfo = (id: string | number) => {
	return request({
		url: `${prefix}/role/display`,
		method: "post",
		data: { id: id }
	})
}

export const saveAdmin = (data = {}, id: string | number) => {
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

export const delUser = (id: string | number) => {
	return request({
		url: `${prefix}/role/delete`,
		method: "post",
		data: { id: id }
	})
}
