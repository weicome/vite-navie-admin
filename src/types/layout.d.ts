
type MenuOption =  import('naive-ui').MenuOption & {
    key: string,
    label: string | (()=>import('vue').VNode),
    routeName?: string,
    routePath?: string,
    icon?: () => import('vue').VNodeChild,
    children?: MenuOption[]
}