
type MenuOption =  import('naive-ui').MenuOption & {
    key: string,
    label: string | (()=>import('vue').VNode),
    icon?: () => import('vue').VNodeChild,
    children?: MenuOption[]
}