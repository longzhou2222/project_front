
export function debounce(fn: any, wait: number) {
    let timer: any = null;
    return function () {
        clearTimeout(timer);
        timer = setTimeout(fn, wait);
    };
}

export function arrToMap(arr: any[], labelKey: string = 'label', valueKey: string = 'value') {
    const map = {};
    arr.forEach(v => {
        map[v[valueKey]] = v[labelKey];
    });
    return map;
};