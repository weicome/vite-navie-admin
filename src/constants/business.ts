/** 业务基础字典 */

export function transformObjectToOption<T extends object>(obj: T) {
	return Object.entries(obj).map(([value, label]) => ({
		value,
		label
	})) as OptionWithKey<keyof T>[]
}

/** 状态标签 */
export const StatusLabels: Record<StatusKey, string> = {
	0: "禁用",
	1: "正常",
	2: "删除"
}

/** 状态下拉选项 */
export const StatusOptions = transformObjectToOption(StatusLabels)
