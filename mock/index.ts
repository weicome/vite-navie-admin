import { Recordable } from "vite-plugin-mock"
import { createProdMockServer } from "vite-plugin-mock/es/createProdMockServer"
import auth from "./modules/auth"
// import menu from "./modules/menu"
import role from "./modules/role"
import admin from "./modules/admin"
const mockModules: any[] = [...auth, ...role.roleApi, ...admin.adminApi]

// const modules = import.meta.globEager<Recordable>("./modules/*.ts")
// Object.keys(modules).forEach((key) => {
// 	if (key.includes("/_")) {
// 		return
// 	}
// 	mockModules.push(...modules[key].default)
// })
export function setupProdMockServer() {
	console.log("mockModules", mockModules)
	createProdMockServer(mockModules)
}
