<template>
	<div class="navbar">
		<h3 class="title" :style="{ width: store.getters.isCollapse ? variables.hideMenuWidth : variables.menuWidth }">{{ store.getters.isCollapse ? '项目' : title }}</h3>
		<Hamburger />
		<div class="control-wrap">
			<el-avatar class="avatar" :size="30" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
		</div>
	</div>
</template>

<script lang="ts" setup>
import Hamburger from '@/components/Hamburger/index.vue';
import { useStore } from 'vuex';
import { title } from '@/config';
import variables from '@/styles/variables.module.scss';
const store = useStore();
</script>

<style lang="scss" scoped>
@import '@/styles/variables.module.scss';
.navbar {
	height: 40px;
	overflow: hidden;
	position: relative;
	background: #fff;
	box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
	background-image: linear-gradient(to bottom, #f3f3f3, #e2e2e2);
	.title {
		display: inline-block;
		width: $menuWidth;
		vertical-align: top;
		text-align: center;
	}
	.control-wrap {
		float: right;
		height: 100%;
		display: flex;
		margin-right: 10px;
		.avatar {
			margin-top: 4px;
		}
	}
}
</style>
