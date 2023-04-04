<template>
	<div class="hamburger-container" @click="toggleClick">
		<el-icon class="collapse-icon">
			<Fold v-show="!store.getters.isCollapse" />
			<Expand v-show="store.getters.isCollapse" />
		</el-icon>
	</div>
</template>
<script lang="ts" setup>
import { useStore } from 'vuex';
const store = useStore();
const toggleClick = () => {
	store.commit('app/SET_ISCOLLAPSE');
};
</script>

<style lang="scss" scoped>
.hamburger-container {
	width: 40px;
	text-align: center;
	line-height: 54px;
	height: 100%;
	cursor: pointer;
	display: inline-block;
	// hover 动画
	transition: background 0.5s;

	&:hover {
		background: rgba(0, 0, 0, 0.1);
	}
	.el-icon {
		font-size: 22px;
	}
}
</style>
