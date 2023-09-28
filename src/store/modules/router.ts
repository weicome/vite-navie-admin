import { getMenus } from "@/api"
import { defineStore } from "pinia"

export const useRouteListStore = defineStore("routeList", {
	state: () => ({
		routeList: [],
		breadcrumb: [],
		getRouter: true
	}),

	actions: {
		async updateRouteList() {
			const modules = import.meta.glob("@/views/**/*.vue")
			const list = await (await getMenus()).data
			// this.routeList = list
		}
	}
})
