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

const { loading, startLoading, endLoaing } = useLoading(false)
const { bool: visible, setTrue: openModal } = useBoolean()

const modalType = ref<ModalType>("add")
const editData = ref<AccountManagement.Menu | null>(null)
const tableData = ref<AccountManagement.Menu[]>([
	{
		id: 1,
		parentId: 0,
		name: "Account",
		path: "/account",
		url: "account",
		title: "账号管理",
		type: "0",
		status: "0",
		children: [
			{
				id: 2,
				parentId: 1,
				name: "Admin",
				path: "admin",
				url: "account/admini/index",
				title: "管理员列表",
				type: "1",
				status: "0",
				children: [
					{
						id: 3,
						parentId: 2,
						name: "AdminList",
						path: "list",
						url: "account/admini/list",
						title: "列表",
						type: "2",
						status: "0"
					},
					{
						id: 4,
						parentId: 2,
						name: "AdminSave",
						path: "save",
						url: "account/admini/save",
						title: "保存",
						type: "2",
						status: "0"
					},
					{
						id: 5,
						parentId: 2,
						name: "AdminInfo",
						path: "info",
						url: "account/admini/info",
						title: "详情",
						type: "2",
						status: "0"
					},
					{
						id: 6,
						parentId: 2,
						name: "AdminDel",
						path: "delete",
						url: "account/admini/delete",
						title: "删除",
						type: "2",
						status: "0"
					}
				]
			},
			{
				id: 7,
				parentId: 1,
				name: "Role",
				path: "role",
				url: "account/role/index",
				title: "角色列表",
				type: "1",
				status: "0",
				children: [
					{
						id: 8,
						parentId: 7,
						name: "RoleList",
						path: "list",
						url: "account/role/list",
						title: "列表",
						type: "2",
						status: "0"
					},
					{
						id: 9,
						parentId: 7,
						name: "RoleSave",
						path: "save",
						url: "account/role/save",
						title: "保存",
						type: "2",
						status: "0"
					},
					{
						id: 10,
						parentId: 7,
						name: "RoleInfo",
						path: "info",
						url: "account/role/info",
						title: "详情",
						type: "2",
						status: "0"
					},
					{
						id: 11,
						parentId: 7,
						name: "RoleDel",
						path: "delete",
						url: "account/role/delete",
						title: "删除",
						type: "2",
						status: "0"
					}
				]
			},
			{
				id: 12,
				parentId: 1,
				name: "Menu",
				path: "menu",
				url: "account/menu/index",
				title: "菜单列表",
				type: "1",
				status: "0",
				children: [
					{
						id: 13,
						parentId: 12,
						name: "MenuList",
						path: "list",
						url: "account/menu/list",
						title: "列表",
						type: "2",
						status: "0"
					},
					{
						id: 14,
						parentId: 12,
						name: "MenuSave",
						path: "save",
						url: "account/menu/save",
						title: "保存",
						type: "2",
						status: "0"
					},
					{
						id: 15,
						parentId: 12,
						name: "MenuInfo",
						path: "info",
						url: "account/menu/info",
						title: "详情",
						type: "2",
						status: "0"
					},
					{
						id: 16,
						parentId: 12,
						name: "MenuDel",
						path: "delete",
						url: "account/menu/delete",
						title: "删除",
						type: "2",
						status: "0"
					}
				]
			}
		]
	}
])

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
	const { data } = { data: "" }
	// const { data } = await getAdmin()

	console.log(data)
	if (data) {
		setTimeout(() => {
			// setTableData(data)
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
