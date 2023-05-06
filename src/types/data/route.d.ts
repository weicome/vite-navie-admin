
type OriginRoute = {
    id: number | string
    path: string
    name: string  // 后端共用鉴权
    redirect?: string
    component: string
    title?: string
    icon?: string
    hidden?: boolean
    children?: Array<OriginRoute>
}
