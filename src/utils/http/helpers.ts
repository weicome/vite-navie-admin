import { useUserStore } from "@/store/modules/user"
import { InternalAxiosRequestConfig } from "axios"

const WINTHOUT_TOKEN_API = [{ url: "/back/admin/auth/login", method: "POST" }]

export const isWithoutToken = ({ url, method }: InternalAxiosRequestConfig): boolean => {
	return WINTHOUT_TOKEN_API.some((item) => item.url === url && item.method === method?.toUpperCase())
}

export const addBaseParams = (params: any): void => {
	if (!params.userId) {
		params.userId = useUserStore().userId
	}
}
