import { defAxios as request } from "@/utils/http"

export const getAdmin = (data = {}) => {
	return request({
		url: "/admin/list",
		method: "get",
		data
	})
}

export const getAdminInfo = (id: string | number) => {
	return request({
		url: `/admin/${id}`,
		method: "get"
	})
}

export const saveAdmin = (data = {}, id: string | number) => {
	if (id) {
		return request({
			url: "/admin",
			method: "put",
			data
		})
	}
	return request({
		url: `/admin/${id}`,
		method: "put",
		data
	})
}

export const delUser = (id: string | number) => {
	return request({
		url: `/admin/${id}`,
		method: "post"
	})
}
