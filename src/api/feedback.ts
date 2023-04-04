import requeset from 'utils/request';

export function queryFeedbackList(data?: any) {
    return requeset({
        url: '/suggest/list.json',
        method: 'get',
        data
    })
};
export function createFeedback(data: any) {
    return requeset({
        url: '/suggest/add.json',
        method: 'post',
        data
    })
};
export function updateFeedback(data: any) {
    return requeset({
        url: '/suggest/update.json',
        method: 'post',
        data
    })
};
export function deleteFeedback(data: any) {
    return requeset({
        url: '/suggest/deleteById.json?id=' + data.id,
        method: 'post',
    })
};