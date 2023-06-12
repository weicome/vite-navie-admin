import { MockMethod } from "vite-plugin-mock"
import { Random } from "mockjs"
import { resolveToken, resultError, resultPageSuccess, resultSuccess } from "../_utils"

const adminData: Array<any> = [
	{
		id: 1,
		name: "admin",
		avatar: "https://assets.qszone.com/images/avatar.jpg",
		email: "Ronnie@123.com",
		role: ["admin"]
	},
	{
		id: 2,
		name: "editor",
		avatar: "https://assets.qszone.com/images/avatar.jpg",
		email: "Ronnie@123.com",
		role: ["editor"]
	},
	{
		id: 3,
		name: "guest",
		avatar: "https://assets.qszone.com/images/avatar.jpg",
		role: []
	}
]
const adminApi = [
	{
		url: "/api/admin/list",
		method: "get",
		response: ({ headers, body, query }) => {
			const { page = 1, limit = 10 } = query
			const fluterResult = adminData.filter((n) => n.name.includes(query.name || ""))
			return resultPageSuccess(page, limit, fluterResult)
		}
	},
	{
		url: "/api/admin/info",
		method: "get",
		response: ({ headers, body, query }) => {
			const result = adminData.find((n) => n.id == query.id)
			return resultSuccess({ ...result })
		}
	},
	{
		url: "/api/admin/add",
		method: "post",
		response: ({ headers, body, query }) => {
			const lastId = adminData[adminData.length - 1].id
			const admin = {
				id: lastId + 1,
				name: body?.name,
				avatar: body?.avatar,
				email: body?.email,
				role: ["admin"],
				createTime: Random.now("yyyy-MM-dd HH:mm:ss")
			}
			adminData.push(admin)
			return resultSuccess([])
		}
	},
	{
		url: "/api/admin/update",
		method: "post",
		response: ({ headers, body, query }) => {
			const index = adminData.findIndex((item) => item.id === body.id)
			if (index !== -1) {
				adminData[index] = body.name
				return resultSuccess([])
			}

			return resultError("没有找到该条")
		}
	},
	{
		url: "/api/admin/del",
		method: "post",
		response: ({ headers, body, query }) => {
			// roleData = roleData.filter((item) => item.id !== 2);
			const indexToRemove = adminData.findIndex((item) => item.id === query.id)
			if (indexToRemove !== -1) {
				adminData.splice(indexToRemove, 1)
			}
			return resultSuccess([])
		}
	}
] as MockMethod[]
export default { adminData, adminApi }
