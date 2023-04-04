<template>
	<div class="layout-container">
		<el-container class="layout-container">
			<el-header>
				<Navbar />
			</el-header>
			<el-container>
				<el-aside :class="store.getters.isCollapse ? 'close-menu' : 'open-menu'">
					<Menu />
				</el-aside>
				<el-main>
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script lang="ts">
export default {
	name: 'Layouts',
};
</script>
<script lang="ts" setup>
import Navbar from './components/Navbar.vue';
import Menu from './components/Menu.vue';
import { useStore } from 'vuex';
const store = useStore();
</script>

<style lang="scss" scoped>
@import '@/styles/variables.module.scss';
.layout-container {
	width: 100%;
	height: 100%;
	overflow: hidden;
}
.el-header {
	height: 40px;
	line-height: 40px;
	background-color: #c8d2df;
	color: #333;
	padding: 0;
}

:deep(.el-aside) {
	background-color: $menuBg;
	color: #ccc;
	text-align: center;
	width: $menuWidth;
}
.open-menu {
	transition: width #{$menuDuration};
	width: $menuWidth;
}
.close-menu {
	transition: width #{$menuDuration};
	width: $hideMenuWidth;
}

:deep(.el-main) {
	color: #333;
	padding: 10px;
}
</style>
