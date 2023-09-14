<template>
	<n-card title="菜单列表" :bordered="false" class="rounded-16px shadow-sm">
		<n-space class="pb-12px" justify="space-between">
			<n-space>
				<n-button type="primary" @click="handleAddTable"
					><icon ic-round-plus class="mr-4px text-20px" />新增
				</n-button>
				<n-button type="error">
					<icon-ic-round-delete class="mr-4px text-20px" />
					删除
				</n-button>
				<n-button type="success">
					<icon-uil:export class="mr-4px text-20px" />
					导出Excel
				</n-button>
			</n-space>
			<n-space align="center" :size="18">
				<n-button size="small" type="primary" @click="getTableData">
					<icon-mdi-refresh class="mr-4px text-16px" :class="{ 'animate-spin': loading }" />
					刷新表格
				</n-button>
				<column-setting v-model:columns="columns" />
			</n-space>
		</n-space>
		<n-data-table :columns="columns" :data="tableData" :pagination="pagination" default-expand-all />
		<table-action-modal v-model:visible="visible" :type="modalType" :data="editData" />
	</n-card>
</template>

<script setup lang="tsx">
import { type Ref, ref, reactive } from "vue"
import { NSpace, NButton, NPopconfirm, type DataTableColumns, type PaginationProps, NTag } from "naive-ui"

import { StatusLabels } from "@/constants"

import { useBoolean, useLoading } from "@/hooks"

import ColumnSetting from "./components/column-setting.vue"
import TableActionModal, { ModalType } from "./components/table-action-modal.vue"
import { getMenuList } from "@/api"

const { loading, startLoading, endLoaing } = useLoading(false)
const { bool: visible, setTrue: openModal } = useBoolean()

const modalType = ref<ModalType>("add")
const editData = ref<AccountManagement.Menu | null>(null)
const tableData = ref<AccountManagement.Menu[]>([])

const handleAddTable = () => {
	setModalType("add")
	openModal()
}
const handleEditTable = (rowId: string | number) => {
	const findItme = tableData.value.find((item) => item.id === rowId)
	findItme && setEditData(findItme)
	setModalType("edit")
	openModal()
}
const handleDeleteTable = (rowId: string | number) => {
	// $message.success("删除成功，id=" + rowId)
	console.log("rid", rowId)
}

const getTableData = async () => {
	startLoading()
	const { data } = await getMenuList()
	console.log(data)
	if (data) {
		setTimeout(() => {
			setTableData(data)
		}, 1000)
	}
	endLoaing()
}
function setModalType(type: ModalType) {
	modalType.value = type
}
function setEditData(data: AccountManagement.Menu | null) {
	editData.value = data
}
function setTableData(data: AccountManagement.Menu[]) {
	tableData.value = data
}
const columns: Ref<DataTableColumns<AccountManagement.Menu>> = ref([
	{
		key: "id",
		title: "序号"
	},
	{
		key: "title",
		title: "标题",
		align: "center"
	},
	{
		key: "name",
		title: "名称",
		align: "center"
	},
	{
		key: "path",
		title: "路径",
		align: "center"
	},
	{
		key: "url",
		title: "地址",
		align: "center"
	},
	{
		key: "icon",
		title: "图标",
		align: "center"
	},
	{
		key: "type",
		title: "类型",
		align: "center",
		render: (row) => {
			const tagTypes: Record<StatusKey, NaiveUI.ThemeColor> = {
				"0": "error",
				"1": "success",
				"2": "warning"
			}
			return <NTag type={tagTypes[row.type]}>{StatusLabels[row.type]}</NTag>
		}
	},
	{
		key: "status",
		title: "状态",
		align: "center",
		render: (row) => {
			const tagTypes: Record<StatusKey, NaiveUI.ThemeColor> = {
				"0": "error",
				"1": "success",
				"2": "warning"
			}
			return <NTag type={tagTypes[row.status]}>{StatusLabels[row.status]}</NTag>
		}
	},
	{
		key: "actions",
		title: "操作",
		align: "center",
		render: (row) => {
			return (
				<NSpace justify={"center"}>
					<NButton size={"small"} onClick={() => handleEditTable(row.id)}>
						编辑
					</NButton>
					<NPopconfirm onPositiveClick={() => handleDeleteTable(row.id)}>
						{{ default: () => "确认删除", trigger: () => <NButton size={"small"}>删除</NButton> }}
					</NPopconfirm>
				</NSpace>
			)
		}
	}
]) as Ref<DataTableColumns<AccountManagement.Menu>>
const pagination: PaginationProps = reactive({
	page: 1,
	pageSize: 10,
	showSizePicker: true,
	pageSizes: [10, 15, 20, 30],
	onChange: (page: number) => {
		pagination.page = page
	},
	onUpdatePageSize: (pageSize: number) => {
		pagination.pageSize = pageSize
		pagination.page = 1
	}
})
;(function () {
	getTableData()
})()
</script>

<style lang="scss" scoped></style>
