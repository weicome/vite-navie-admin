import { resolveToken, resultSuccess, resultError } from "../_utils"
import type { MockMethod } from "vite-plugin-mock"
const token = {
	admin: "admin",
	editor: "editor"
}

export default [
	{
		url: "/api/auth/login",
		method: "post",
		response: ({ body }) => {
			if (["admin", "editor"].includes(body?.name)) {
				return resultSuccess({ token: token[body.name] })
			} else {
				return resultError("没有此用户")
			}
		}
	},
	{
		url: "/api/auth/refreshToken",
		method: "post",
		response: ({ headers }) => {
			return resultSuccess({ token: resolveToken(headers?.autho) })
		}
	},
	{
		url: "/api/auth/getInfo",
		method: "get",
		response: ({ headers }) => {
			const token = resolveToken(headers?.authorization)
			const data = {
				id: 1,
				name: "admin",
				avatar: "https://assets.qszone.com/images/avatar.jpg",
				role: ["super"]
			}
			return resultSuccess(data)
		}
	}
] as MockMethod[]

// const users = [
// 	{
// 		url: "/api/user",
// 		method: "get",
// 		response: ({ headers }) => {
// 			return {
// 				code: 0,
// 				data: {
// 					...(users[token] || users.guest)
// 				}
// 			}
// 		}
// 	}
// ] as MockMethod[]
