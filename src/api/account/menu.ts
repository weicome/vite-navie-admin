import { defAxios as request } from "@/utils/http"

const prefix = "/back/admin"

export const getMenuList = (data = {}) => {
	return request({
		url: `${prefix}/menu/index`,
		method: "post",
		data
	})
}

export const getMenuInfo = (id: string | number) => {
	return request({
		url: `${prefix}/menu/display`,
		method: "post",
		data: { id: id }
	})
}

export const saveMenu = (data = {}, id: string | number) => {
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

export const delMenu = (id: string | number) => {
	return request({
		url: `${prefix}/menu/delete`,
		method: "post",
		data: { id: id }
	})
}
