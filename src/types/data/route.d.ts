
type OriginRoute = {
    parentPath?: string
    menuUrl: string
    menuName?: string
    routeName?: string
    hidden?: boolean
    outLink?: string
    affix?: boolean
    cacheable?: boolean
    isRootPath?: boolean
    iconPrefix?: string
    icon?: string
    badge?: string | number
    isSingle?: boolean
    localFilePath?: string
    children?: Array<OriginRoute>
}
