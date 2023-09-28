import { defAxios as request } from "@/utils/http"

const prefix = "/back"

export const getPhoneList = (data = {}) => {
	return request({
		url: `${prefix}/phone/index`,
		method: "post",
		data
	})
}

export const getPhoneInfo = (id: string | number) => {
	return request({
		url: `${prefix}/phone/display`,
		method: "post",
		data: { id: id }
	})
}

export const savePhone = (data = {}, id: string | number) => {
	if (id) {
		return request({
			url: `${prefix}/phone/modify`,
			method: "post",
			data: [{ id: id }, data]
		})
	}
	return request({
		url: `${prefix}/phone/create`,
		method: "post",
		data
	})
}

export const delPhone = (id: string | number) => {
	return request({
		url: `${prefix}/phone/delete`,
		method: "post",
		data: { id: id }
	})
}
