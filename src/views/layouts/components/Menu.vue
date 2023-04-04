<template>
	<el-scrollbar>
		<el-menu
			class="menu"
			:default-active="activeMenu"
			:collapse="store.getters.isCollapse"
			:unique-opened="true"
			:background-color="variables.menuBg"
			:text-color="variables.menuTextColor"
			:active-text-color="variables.menuActiveTextColor"
			:ellipsis="true"
			mode="vertical"
		>
			<Sidebar :routes="menuList" />
		</el-menu>
	</el-scrollbar>
</template>

<script lang="ts" setup>
import { ref, Ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import variables from '@/styles/variables.module.scss';
import Sidebar from './Sidebar.vue';
const store = useStore();
const route = useRoute();
const menuList = ref(store.getters.menuList);
const activeMenu: Ref<string> = ref('');
const queryActiveMenu = () => {
	menuList.value.forEach((v: MyRouteRaw) => {
		if (!v.outLink && v.path === route.path) {
			activeMenu.value = v.id + '';
		}
	});
};
queryActiveMenu();
</script>

<style lang="scss" scoped>
.title {
	height: 40px;
	line-height: 40px;
}
.el-menu {
	border: none;
}
</style>
