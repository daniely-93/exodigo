import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse as AxiosResponse2 } from "axios";

type AxiosMethods = "GET" | "POST" | "DELETE" | "PUT" | "PATCH";
type Param = Record<string, string | number | boolean | undefined | null>;
export type AxiosResponse<T> = Promise<HigherLevelResponse<T> | HighLevelErrorResponse>;

export type HigherLevelResponse<T> = {
    data: T;
    headers: any;
    error: undefined;
    errorMessage?: string;
    statusCode?: number;
    errorCode?: undefined;
    isSuccess: true;
};

export type HighLevelErrorResponse = {
    data: undefined;
    error: AxiosResponse2<any>;
    headers: any;
    errorMessage: string;
    statusCode: number;
    errorCode: number;
    isSuccess: false;
};

export interface CustomAxiosInstance<T> {
    get: (url: string) => Promise<T>;
    post: (url: string, data?: object | null, headers?: object | null) => Promise<T>;
    delete: (url: string, data?: object | null) => Promise<T>;
    put: (url: string, data?: object | null) => Promise<T>;
    patch: (url: string, data?: object | null) => Promise<T>;
    setToken: (token: string) => void;
    clearToken: () => void;
}

export enum NetworkStatusCode {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    INTERNAL = 500,
}

export enum ContentTypeEnum {
    JSON = "application/json",
    FormData = "multipart/form-data",
}


const BASE_URL = "https://www.thecocktaildb.com/api/json/v1/1";


const createAxiosInstance = (baseURL: string = "") => {
    const axios: AxiosInstance = Axios.create({
        baseURL,
        headers: { "Content-Type": ContentTypeEnum.JSON },
    });

    const ajax = async <T>(
        url: string,
        method: AxiosMethods = "GET",
        data?: object | null,
        headers?: Record<string, string>,
        params?: Param
    ): Promise<HigherLevelResponse<T> | HighLevelErrorResponse> => {
        try {
            const config: AxiosRequestConfig = { url, method, headers, params };
            if (data) config.data = data;
            const res = await axios(config);

            return {
                data: res.data,
                headers: res.headers,
                error: undefined,
                errorMessage: undefined,
                errorCode: undefined,
                statusCode: undefined,
                isSuccess: true,
            };
        } catch (error: any) {
            if (!error.response) {
                // CORS issue
                return {
                    data: undefined,
                    headers: error.response?.headers,
                    error: error.response,
                    statusCode: 500,
                    errorCode: 0,
                    errorMessage: "Server CORS Error",
                    isSuccess: false,
                };
            }

            const errorMessage = error.response.data?.message || error.title || error.message || error.Description || "Server error";

            return {
                data: undefined,
                headers: error.response?.headers,
                error: error.response,
                errorMessage,
                errorCode: error.response.data.errorCode,
                statusCode: error.response.status,
                isSuccess: false,
            };
            // throw message;
        }
    };

    const methods = {
        get<T>(url: string, params?: Param): Promise<HigherLevelResponse<T> | HighLevelErrorResponse> {
            return ajax<T>(url, "GET", undefined, undefined, params);
        },
        post<T>(
            url: string,
            data?: object | null,
            headers?: Record<string, string>,
            params?: Param
        ): Promise<HigherLevelResponse<T> | HighLevelErrorResponse> {
            return ajax<T>(url, "POST", data, headers, params);
        },
        put<T>(url: string, data?: object | null, params?: Param): Promise<HigherLevelResponse<T> | HighLevelErrorResponse> {
            return ajax<T>(url, "PUT", data, undefined, params);
        },
        patch<T>(url: string, data?: object | null, params?: Param): Promise<HigherLevelResponse<T> | HighLevelErrorResponse> {
            return ajax<T>(url, "PATCH", data, undefined, params);
        },
        delete<T>(url: string, data?: object | null, params?: Param): Promise<HigherLevelResponse<T> | HighLevelErrorResponse> {
            return ajax<T>(url, "DELETE", data, undefined, params);
        },
    };

    return {
        ...methods,
    };
};

export const baseUrlApi = createAxiosInstance(BASE_URL);
