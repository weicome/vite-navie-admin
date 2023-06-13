/** 通用继承类型 */

/** ID */
interface Id {
	id: number | string
}

/** 时间 */
interface Datetime {
	create_at?: string
	update_at?: string
	delete_at?: string
}

/** 状态 */
interface STATUS {
	status: "0" | "1" | "2"
}

/** 取状态Key */
type StatusKey = NonNullable<STATUS["status"]>
declare namespace NaiveUI {
	type ThemeColor = "default" | "error" | "primary" | "info" | "success" | "warning"
}

/** 下拉选项 */
type OptionWithKey<K> = { value: K; label: string }
