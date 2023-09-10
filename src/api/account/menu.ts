import { defAxios as request } from "@/utils/http"

const prefix = "/back/admin"

export const getAdmin = (data = {}) => {
	return request({
		url: `${prefix}/menu/index`,
		method: "post",
		data
	})
}

export const getAdminInfo = (id: string | number) => {
	return request({
		url: `${prefix}/menu/display`,
		method: "post",
		data: { id: id }
	})
}

export const saveAdmin = (data = {}, id: string | number) => {
	if (id) {
		return request({
			url: `${prefix}/menu/modify`,
			method: "post",
			data: [{ id: id }, data]
		})
	}
	return request({
		url: `${prefix}/menu/create`,
		method: "post",
		data
	})
}

export const delUser = (id: string | number) => {
	return request({
		url: `${prefix}/menu/delete`,
		method: "post",
		data: { id: id }
	})
}
