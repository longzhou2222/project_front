import Cookies from 'js-cookie';

interface configType {
    expires?: number;
    path: string
}

export default {
    get(key: string) {
        return Cookies.get(key);
    },
    set(key: string, value: string, config?: configType) {
        Cookies.set(key, value, { ...config });
    },
    remove(key: string) {
        Cookies.remove(key);
    }
}