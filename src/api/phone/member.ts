import { defAxios as request } from "@/utils/http"

const prefix = "/back/member"

export const getMemberUserList = (data = {}) => {
	return request({
		url: `${prefix}/user/index`,
		method: "post",
		data
	})
}

export const getMemberUserInfo = (id: string | number) => {
	return request({
		url: `${prefix}/user/display`,
		method: "post",
		data: { id: id }
	})
}

export const saveMemberUser = (data = {}, id: string | number) => {
	if (id) {
		return request({
			url: `${prefix}/user/modify`,
			method: "post",
			data: [{ id: id }, data]
		})
	}
	return request({
		url: `${prefix}/user/create`,
		method: "post",
		data
	})
}

export const delMemberUser = (id: string | number) => {
	return request({
		url: `${prefix}/user/delete`,
		method: "post",
		data: { id: id }
	})
}
