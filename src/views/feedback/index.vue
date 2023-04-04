<template>
	<Layout class="feedback">
		<template #header>
			<div class="search-wrap">
				<el-input
					v-model="searchInfo.queryString"
					placeholder="回车触发搜索"
					@keyup.enter.native="query"
				>
					<template #prepend>
						<el-button type="primary" :icon="Search" />
					</template>
				</el-input>
				<el-button
					@click="handleShowDialog('create')"
					type="primary"
					:icon="Plus"
					class="create-btn"
					>新增</el-button
				>
			</div>
		</template>
		<template #table="{ tableHeight }">
			<el-table
				ref="table"
				border
				v-loading="tableLoading"
				:data="tableData"
				:height="tableHeight"
			>
				<el-table-column align="center" type="selection" width="45"> </el-table-column>
				<el-table-column
					v-for="col in columns"
					:key="col.prop"
					:label="col.label"
					:prop="col.prop"
					:align="col.align || 'center'"
					show-overflow-tooltip
					:min-width="col.width"
					:fixed="col.fixed"
				>
					<template #default="{ row }">
						<span v-if="col.prop === 'urgency'">{{ urgencyMap[row[col.prop]] }}</span>
						<span v-else-if="col.prop === 'process'">{{
							processMap[row[col.prop]]
						}}</span>
						<div v-else-if="col.prop === 'operation'">
							<el-button type="primary" link @click="handleShowDialog('update', row)"
								>编辑</el-button
							>
							<el-button type="danger" link @click="handleDelete(row)"
								>删除</el-button
							>
						</div>
						<span v-else>{{ row[col.prop] }}</span>
					</template>
				</el-table-column>
			</el-table>
		</template>
		<template #footer>
			<el-pagination
				small
				:current-page.sync="currentPage"
				:page-size.sync="pageSize"
				:total="total"
				:page-sizes="store.state.app.pageSizes"
				@current-change="handleCurrentChange"
				@size-change="handleSizeChange"
				background
				layout="total, sizes, prev, pager, next, jumper"
			>
			</el-pagination>
			<el-dialog
				:title="dialogType === 'create' ? '新增' : '编辑'"
				v-model="dialogVisible"
				width="500px"
				@close="cancelDialog"
			>
				<el-form
					:model="dialogForm"
					:rules="dialogFormRules"
					ref="formRef"
					label-width="80px"
				>
					<el-form-item label="反馈人" prop="feedbackUser">
						<el-input
							:disabled="isDisabledItem"
							v-model="dialogForm.feedbackUser"
							placeholder="请输入"
						/>
					</el-form-item>
					<el-form-item label="需求简述" prop="demandSummary">
						<el-input v-model="dialogForm.demandSummary" placeholder="请输入" />
					</el-form-item>
					<el-form-item label="需求详情" prop="demandDetail">
						<el-input
							v-model="dialogForm.demandDetail"
							placeholder="请输入"
							type="textarea"
							:rows="3"
						/>
					</el-form-item>
					<el-form-item label="紧急程度" prop="urgency">
						<el-select v-model="dialogForm.urgency" placeholder="请选择">
							<el-option
								v-for="item in urgencyArr"
								:key="item.value"
								:value="item.value"
								:label="item.label"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="处理进度" prop="process">
						<el-select
							:disabled="isDisabledItem"
							v-model="dialogForm.process"
							placeholder="请选择"
						>
							<el-option
								v-for="item in processArr"
								:key="item.value"
								:value="item.value"
								:label="item.label"
							/>
						</el-select>
					</el-form-item>
					<el-form-item label="处理人" prop="processor">
						<el-input
							:disabled="isDisabledItem"
							v-model="dialogForm.processor"
							placeholder="请输入"
						/>
					</el-form-item>
					<el-form-item label="备注" prop="remark">
						<el-input v-model="dialogForm.remark" placeholder="请输入" />
					</el-form-item>
				</el-form>
				<template #footer>
					<div class="dialog-footer">
						<el-button @click="cancelDialog">取消</el-button>
						<el-button
							type="primary"
							:loading="dialogConfirmLoading"
							@click="dialogConfirm"
							>确定</el-button
						>
					</div>
				</template>
			</el-dialog>
		</template>
	</Layout>
</template>

<script lang="ts" setup>
import { ref, computed, nextTick } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import { Search, Plus } from '@element-plus/icons-vue';
import { useStore } from 'vuex';

import Layout from '@/components/Layout/index.vue';
import { arrToMap } from 'utils/index';
import { queryFeedbackList, createFeedback, updateFeedback, deleteFeedback } from '@/api/feedback';
type SearchType = {
	queryString?: string;
};
const urgencyArr = [
	{ label: '较低', value: 1 },
	{ label: '普通', value: 2 },
	{ label: '紧急', value: 3 },
	{ label: '非常紧急', value: 4 },
];
const processArr = [
	{ label: '待处理', value: 1 },
	{ label: '拒绝处理', value: 2 },
	{ label: '开发中', value: 3 },
	{ label: '开发完成', value: 4 },
	{ label: '灰度中', value: 5 },
	{ label: '已完成', value: 6 },
	{ label: '暂停', value: 7 },
];
const urgencyMap = arrToMap(urgencyArr);
const processMap = arrToMap(processArr);
const store = useStore();
const searchInfo = ref<SearchType>({});
const query = (): void => {
	const data = {
		page: currentPage.value,
		pageSize: pageSize.value,
		...searchInfo.value,
	};
	if (!data.queryString) {
		delete data.queryString;
	}
	tableLoading.value = true;
	queryFeedbackList(data)
		.then((res) => {
			tableLoading.value = false;
			if (res) {
				const { data, count } = res.data;
				tableData.value = data;
				total.value = count;
			} else {
				tableData.value = [];
				total.value = 0;
			}
		})
		.catch((err) => {
			console.log(err);
			tableLoading.value = false;
		});
};

const columns: ColumnType[] = [
	{ label: '反馈人', prop: 'feedbackUser', width: 120, fixed: 'left' },
	{ label: '反馈时间', prop: 'feedbackTime', width: 150 },
	{ label: '需求简述', prop: 'demandSummary', width: 150 },
	{ label: '紧急程度', prop: 'urgency', width: 120 },
	{ label: '处理进度', prop: 'process', width: 120 },
	{ label: '处理人', prop: 'processor', width: 120 },
	{ label: '处理时间', prop: 'processTime', width: 150 },
	{ label: '备注', prop: 'remark', width: 150 },
	{ label: '操作', prop: 'operation', width: 100, fixed: 'right' },
];
const tableData = ref([]);
const tableLoading = ref<boolean>(false);
const currentPage = ref<number>(1);
const pageSize = ref<number>(store.state.app.pageSize || 50);
const total = ref<number>(0);
const handleCurrentChange = (page: number): void => {
	currentPage.value = page;
	query();
};
const handleSizeChange = (size: number): void => {
	pageSize.value = size;
	query();
};
query();

type EditType = {
	id?: number;
	admin?: boolean;
	feedbackUser?: string;
	feedbackTime?: string;
	demandSummary?: string;
	demandDetail?: string;
	urgency?: number;
	process?: number;
	processor?: string;
	remark?: string;
};
const formRef = ref<FormInstance>();
const dialogType = ref<string>('create');
const dialogVisible = ref<boolean>(false);
const dialogConfirmLoading = ref<boolean>(false);
const dialogForm = ref<EditType>({
	urgency: 1,
	process: 1,
});
const dialogFormRules = ref<FormRules>({
	// feedbackUser: [{ required: true, message: '请输入' }],
	// demandSummary: [{ required: true, message: '请输入' }],
	// demandDetail: [{ required: true, message: '请输入' }],
	// urgency: [{ required: true, message: '请选择' }],
	// process: [{ required: true, message: '请选择' }],
	// processor: [{ required: true, message: '请输入' }],
	// remark: [{ required: true, message: '请输入' }],
});
const isDisabledItem = computed(() => {
	return (
		dialogType.value === 'create' || (!dialogForm.value.admin && dialogType.value === 'update')
	);
});

const handleShowDialog = (type: string, record?: EditType) => {
	formRef.value?.clearValidate();
	dialogType.value = type;
	dialogVisible.value = true;
	if (type === 'update') {
		dialogForm.value = { ...record };
	}
};

const dialogConfirm = async () => {
	await formRef.value?.validate((valid) => {
		if (valid) {
			const data = { ...dialogForm.value };
			const successCb = (res: ResponseData | boolean) => {
				dialogConfirmLoading.value = false;
				if (res) {
					ElMessage({
						type: 'success',
						message: `${dialogType.value === 'create' ? '新增' : '编辑'}成功`,
					});
					query();
					cancelDialog();
				}
			};
			const errorCb = (err: any) => {
				console.log(err);
				dialogConfirmLoading.value = false;
			};
			dialogConfirmLoading.value = true;
			if (dialogType.value === 'create') {
				createFeedback(data)
					.then((res: ResponseData | boolean) => {
						successCb(res);
					})
					.catch((err) => {
						errorCb(err);
					});
			} else {
				updateFeedback(data)
					.then((res: ResponseData | boolean) => {
						successCb(res);
					})
					.catch((err) => {
						errorCb(err);
					});
			}
		}
	});
};
const cancelDialog = () => {
	dialogForm.value = {
		urgency: 1,
		process: 1,
	};
	dialogVisible.value = false;
};

const handleDelete = (record: EditType) => {
	ElMessageBox.confirm('确定删除当前消息反馈吗', '确认', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'error',
	})
		.then(() => {
			deleteFeedback({ id: record.id }).then((res) => {
				if (res) {
					ElMessage({
						type: 'success',
						message: '删除成功',
					});
					query();
				}
			});
		})
		.catch(() => {});
};
</script>

<style lang="scss" scoped>
.feedback {
	.search-wrap {
		.create-btn {
			margin-right: 10px;
			vertical-align: top;
			float: right;
		}
	}
}
</style>
