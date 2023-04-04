import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { baseURL } from '@/config'
import store from '@/store';
import { ElMessage } from 'element-plus'

const baseConfig: AxiosRequestConfig = {
    baseURL,
    timeout: 5000
};
const service = axios.create(baseConfig);

service.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
    store.commit('app/SET_PAGELOADING', true);
    if (config.method === 'get') {
        config.params = config.data;
    }
    return config;
}, (err: AxiosRequestConfig): AxiosRequestConfig => {
    ElMessage.error('发送请求失败');
    store.commit('app/SET_PAGELOADING', false);
    return err;
});

service.interceptors.response.use((res: AxiosResponse): ResponseData | boolean => {
    store.commit('app/SET_PAGELOADING', false);
    if (res.status === 200) {
        const { ok, message } = res.data;
        if (ok === 1) {
            return res.data;
        } else {
            ElMessage.error(message || errorCode[10001])
            return false;
        }
    } else {
        ElMessage.error(errorCode[res.status || 10001])
        return false;
    }
}, (err: AxiosError): boolean => {
    store.commit('app/SET_PAGELOADING', false);
    const errRes = err.response;
    let message: string;
    if (errRes) {
        const { status } = err?.response || { status: 10001 };
        message = errorCode[status];
    } else {
        message = errorCode[10001]
    }
    ElMessage.error(message);
    return false;
});

export enum errorCode {
    '成功' = 200,
    '参数错误' = 400,
    '登录过期，请重新登录' = 401,
    '资源不见了' = 404,
    '服务器连接失败' = 500,
    '服务器跑丢了' = 504,
    '未知错误' = 10001
}

export default service