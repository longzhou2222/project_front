<template>
	<div :class="`layout_page${className ? ' ' + className : ''}`">
		<header ref="header" class="layout_header">
			<slot name="header"> </slot>
		</header>
		<main ref="table" class="layout_table">
			<slot name="table" :tableHeight="tableHeight"> </slot>
		</main>
		<footer ref="footer" class="layout_footer">
			<slot name="footer"> </slot>
		</footer>
	</div>
</template>

<script lang="ts">
export default {
	name: 'LayoutPage',
};
</script>

<script lang="ts" setup>
import { ref, onMounted, nextTick } from 'vue';
import { debounce } from '@/utils';
const props = defineProps({
	initIsCalculate: {
		type: Boolean,
		default: true,
	},
	className: {
		type: String,
	},
	isDynamicColumn: {
		type: Boolean,
		default: false,
	},
});
const header = ref<HTMLElement>();
const table = ref<HTMLElement>();
const footer = ref<HTMLElement>();
const tableHeight = ref<number>(500);
onMounted(async () => {
	if (!props.isDynamicColumn) {
		await nextTick();
		calculateTableHeight();
		window.onresize = debounce(calculateTableHeight, 300);
	}
});

// watch(props.initIsCalculate, () => {

// })
// 	watch: {
// 		initIsCalculate(newVal) {
// 			if (newVal && this.isDynamicColumn) {
// 				this.calculateTableHeight();
// 				window.onresize = debounceNew(this.calculateTableHeight, 100);
// 			}
// 		},
// 	},

const calculateTableHeight = () => {
	const navbarHeight = 40;
	const headerHeight: number = header.value?.offsetHeight || 0;
	const footerHeight: number = footer.value?.offsetHeight || 0;
	const windowHeight: number = document.documentElement.offsetHeight;
	// el-main padding: 20; table margin 上下各10
	const paddingAndMargin = 20 + 10 + 10;
	const calculateHeight: number =
		windowHeight - navbarHeight - headerHeight - footerHeight - paddingAndMargin;
	tableHeight.value = calculateHeight;
};
</script>
