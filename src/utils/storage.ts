import { APP_KEY } from '@/constant'
export default {
    getVal(): any {
        let obj: any = localStorage.getItem(APP_KEY);
        return obj ? JSON.parse(obj) : {};
    },
    get(key: string): any {
        let obj = this.getVal();
        return obj[key];
    },
    set(key: string, value: any) {
        let obj = this.getVal();
        obj[key] = value;
        localStorage.setItem(APP_KEY, JSON.stringify(obj));
    },
    remove(key: string): void {
        let obj = this.getVal();
        delete obj[key];
        localStorage.setItem(APP_KEY, obj);
    },
    clear(): void {
        localStorage.clear();
    },
}