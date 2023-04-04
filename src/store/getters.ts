import { ISCOLLAPSE } from '@/constant';

const getters = {
    token: (state: any) => state.user.token,
    hasUserInfo: (state: any) => {
        return JSON.stringify(state.user.userInfo) !== '{}';
    },
    userInfo: (state: any) => state.user.userInfo,



    isCollapse: (state: any) => state.app[ISCOLLAPSE],
    menuList: (state: any) => state.app.menuList,
    pageLoading: (state: any) => state.app.pageLoading
};
export default getters;
