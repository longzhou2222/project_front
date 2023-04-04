/// <reference types="vite/client" />
declare type ColumnType = {
    label: string;
    prop: string;
    width?: number;
    fixed?: string;
    align?: string;
}

declare type ResponseData = {
    data?: any;
    ok?: number;
    message?: string;
}

declare type MyRouteRaw = {
    id: number,
    name?: string;
    path?: string;
    title?: string;
    component?: any;
    outLink?: boolean;
    linkSrc?: string;
    children?: MyRouteRaw[];
    icon?: string;
}