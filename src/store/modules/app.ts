import Storage from '@/utils/storage';
import { ISCOLLAPSE, LANG } from '@/constant';

export default {
    namespaced: true,
    state: () => ({
        title: 'xxx111222',
        menuList: [
            {
                id: 1,
                title: '个人信息',
                outLink: true,
                linkSrc: '/index.xhtml#/welcome',
                icon: 'fa-home',
            },
            {
                id: 2,
                title: '用户管理',
                outLink: true,
                linkSrc: '/index.xhtml#/user/user_list',
                icon: 'fa-user',
            },
            {
                id: 3,
                title: '项目查询',
                outLink: true,
                linkSrc: '/index.xhtml#/project/find',
                icon: 'fa-cubes'
            },
            {
                id: 4,
                title: '数据库坐标',
                outLink: true,
                linkSrc: '/index.xhtml#/db/db_list',
                icon: 'fa-joomla'
            },
            {
                id: 5,
                title: '后台项目',
                outLink: true,
                icon: 'fa-jsfiddle',
                children: [
                    {
                        id: 51,
                        title: '项目发布',
                        outLink: true,
                        linkSrc: '/index.xhtml#/publish/publish',
                    },
                    {
                        id: 52,
                        title: '容器列表',
                        outLink: true,
                        linkSrc: '/index.xhtml#/publish/tomcat_list_view',
                    },
                ]
            },
            {
                id: 6,
                title: '前端项目',
                outLink: true,
                icon: 'fa-joomla',
                children: [
                    {
                        id: 61,
                        title: '项目发布',
                        outLink: true,
                        linkSrc: '/index.xhtml#/html/publish',
                    }
                ]
            },
            {
                id: 7,
                title: '项目申请',
                outLink: true,
                linkSrc: '/index.xhtml#/project/project_apply',
                icon: 'fa-github'
            },
            {
                id: 8,
                title: '项目组管理',
                outLink: true,
                icon: 'fa-jsfiddle',
                children: [
                    {
                        id: 81,
                        title: '项目组管理',
                        outLink: true,
                        linkSrc: '/index.xhtml#/team/team_list',
                    },
                    {
                        id: 82,
                        title: '项目组申请',
                        outLink: true,
                        linkSrc: '/index.xhtml#/team/team_apply',
                    },
                ]
            },
            {
                id: 9,
                title: '小工具',
                outLink: true,
                icon: 'fa-cog',
                children: [
                    {
                        id: 91,
                        title: 'yaml生成',
                        outLink: true,
                        linkSrc: '/index.xhtml#/tools/yaml',
                    }
                ]

            },
            {
                id: 10,
                title: '消息设置',
                outLink: true,
                linkSrc: '/index.xhtml#/msg/profile',
                icon: 'fa-cog',
            },
            {
                id: 11,
                title: '优化建议',
                path: '/feedback',
                outLink: false,
                icon: 'fa-commenting',
            }
        ],
        [ISCOLLAPSE]:
            Storage.get(ISCOLLAPSE) === null ? true : !!Storage.get(ISCOLLAPSE),
        pageLoading: false,
        pageSizes: [50, 80, 100, 200],
        pageSize: 50,
    }),
    mutations: {
        SET_PAGELOADING(state: any, loading: boolean) {
            state.pageLoading = loading;
        },
        SET_ISCOLLAPSE(state: any) {
            state[ISCOLLAPSE] = !state[ISCOLLAPSE];
            Storage.set(ISCOLLAPSE, state[ISCOLLAPSE]);
        },
        /**
         * 设置国际化
         */
        setLanguage(state: any, lang: string) {
            state.language = lang;
            Storage.set(LANG, lang);
        },
        /**
         * 添加tag
         */
        // addTagsViewList(state, tag) {
        //     // 没有重复的情况下才允许添加
        //     const isFind = state.tagsViewList.find(
        //         (item) => item.path === tag.path
        //     );
        //     if (!isFind) {
        //         state.tagsViewList.push(tag);
        //         Storage.set(TAGS_VIEW, state.tagsViewList);
        //     }
        // },
        // /**
        //  * 为指定的 tag 修改 title
        //  */
        // changeTagView(state, { index, tag }) {
        //     state.tagsViewList[index] = tag;
        //     Storage.set(TAGS_VIEW, state.tagsViewList);
        // },
        // // 移除tag
        // removeTagsView(state, payload) {
        //     if (payload.type === 'index') {
        //         state.tagsViewList.splice(payload.index, 1);
        //     } else if (payload.type === 'right') {
        //         state.tagsViewList.splice(
        //             payload.index + 1,
        //             state.tagsViewList.length - payload.index + 1
        //         );
        //     } else if (payload.type === 'other') {
        //         state.tagsViewList.splice(
        //             payload.index + 1,
        //             state.tagsViewList.length - payload.index + 1
        //         );
        //         state.tagsViewList.splice(0, payload.index);
        //     }
        //     Storage.set(TAGS_VIEW, state.tagsViewList);
        // }
    }
};
