<template>
	<template v-for="item in props.routes" :key="item.id">
		<el-sub-menu v-if="item.children && item.children.length > 0" :index="item.id + ''">
			<template #title>
				<i v-if="item.icon" :class="`fa fa-lg fa-fw ${item.icon}`"></i>
				<span>{{ item.title }}</span>
			</template>
			<side-menu :routes="item.children" />
		</el-sub-menu>
		<el-menu-item v-else :index="item.id + ''" @click="itemClick(item)">
			<i v-if="item.icon" :class="`fa fa-lg fa-fw ${item.icon}`"></i>
			<template #title>{{ item.title }}</template>
		</el-menu-item>
	</template>
</template>

<script lang="ts">
export default {
	name: 'sideMenu',
};
</script>
<script lang="ts" setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const props = defineProps({
	routes: {
		type: Array<MyRouteRaw>,
		required: true,
		default: () => [],
	},
});
const itemClick = (menu: MyRouteRaw) => {
	const { outLink, linkSrc, path } = menu;
	if (outLink) {
		window.open(linkSrc);
		router.replace('/');
	} else {
		const renamePath: any = path;
		router.push(renamePath);
	}
};
</script>
<style lang="scss" scoped>
@import '@/styles/variables.module.scss';
.el-menu-item,
:deep(.el-sub-menu__title) {
	font-size: 12px;
	height: 40px;
	line-height: 40px;
	padding: 0 10px 0 10px !important;
	&.is-active {
		background: $activeMenuBg !important;
	}
	i {
		margin-right: 3px;
	}
}
.el-sub-menu {
	:deep(.el-menu) {
		background: $subMenuBg;
		.el-menu-item {
			background: $subMenuBg;
			padding-left: 30px !important;
		}
	}
}
:deep(.el-tooltip__trigger) {
	display: flex;
	justify-content: center;
}
</style>
