import isString from '../is/isString';

export type TUrlParam = number | string | boolean;

export interface IAppendUrlParamInput {
    url: string;
    paramName: string;
    paramValue: TUrlParam;
}

export default function appendUrlParam({
    url,
    paramName,
    paramValue,
}: IAppendUrlParamInput): string {
    const separator = containsAnyUrlParam({ url }) ? '&' : '?';
    return `${url}${separator}${encodeParamName(paramName)}=${encodeParamValue(paramValue)}`;
}

function containsAnyUrlParam({ url }: { url: string }): boolean {
    return url.indexOf('?') > -1;
}

export function encodeParamName(paramName: string): string {
    return encodeURIComponent(paramName);
}

function encodeParamValue(paramValue: TUrlParam): TUrlParam {
    return isString(paramValue) ? encodeURIComponent(paramValue as string) : paramValue;
}
