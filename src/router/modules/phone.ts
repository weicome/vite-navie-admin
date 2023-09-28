import { RouteRecordRaw } from "vue-router"

const LAYOUT = () => import("@/components/Layouts/Layout.vue")
const phone = [
	{
		path: "/phone",
		name: "Phone",
		component: () => import("@/views/phone/index.vue"),
		meta: {
			title: "电话列表"
		}
	},
	{
		path: "/member",
		name: "Member",
		component: LAYOUT,
		meta: {
			title: "会员管理"
		},
		children: [
			{
				path: "user",
				name: "MemberUser",
				component: () => import("@/views/member/user/index.vue"),
				meta: {
					title: "会员列表"
				}
			},
			{
				path: "tel-phone",
				name: "MemberPhone",
				component: () => import("@/views/member/phone/index.vue"),
				meta: {
					title: "号码簿"
				}
			}
		]
	}
] as RouteRecordRaw[]

export default phone
