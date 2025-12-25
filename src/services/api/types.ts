import { AxiosRequestConfig } from 'axios';

export interface IResponse<T> {
  data?: T | null;
  message: string;
  success: boolean;
  failed: boolean;
  statusCode: number;
  fullResponse?: any;
}

export async function apiCaller<T>(
  type: 'post' | 'get' | 'put' | 'delete',
  url: string,
  data?: any,
  config?: AxiosRequestConfig<any>
): Promise<IResponse<T>> {
  const isDevelopment = process.env.NEXT_PUBLIC_NODE_ENV === 'development';
  let response: IResponse<T>;

  try {
    let apiRes;
    const axiosInstance = (await import('./axios')).default;

    if (type === 'get' || type === 'delete') {
      apiRes = await axiosInstance[type](url, config);
    } else {
      apiRes = await axiosInstance[type](url, data, config);
    }

    response = {
      data: apiRes.data?.Data ?? apiRes.data?.data ?? apiRes.data,
      message: apiRes.data?.ResponseMessage || apiRes.data?.message || '',
      success: apiRes.data?.Success !== false,
      failed: apiRes.data?.Success === false,
      statusCode: apiRes.status,
      fullResponse: apiRes.data,
    };
  } catch (err: any) {
    const errorData = err?.response?.data;
    const message =
      errorData?.ResponseMessage ||
      errorData?.message ||
      err?.response?.data?.error ||
      err?.message ||
      'Something went wrong';

    response = {
      data: null,
      statusCode: err?.response?.status || err?.status || 500,
      success: false,
      failed: true,
      message: message,
      fullResponse: errorData || err?.response?.data,
    };
  }

  if (isDevelopment) {
    console.log('API Call', type.toUpperCase(), url);
    if (data) console.log('data:', data);
    console.log('response:', response);
  }

  return response;
}

const api = {
  async post<T>(url: string, data: any, config?: AxiosRequestConfig<any>) {
    return apiCaller<T>('post', url, data, config);
  },
  async get<T>(url: string, config?: AxiosRequestConfig<any>) {
    return apiCaller<T>('get', url, undefined, config);
  },
  async delete<T>(url: string, config?: AxiosRequestConfig<any>) {
    return apiCaller<T>('delete', url, undefined, config);
  },
  async put<T>(url: string, data: any, config?: AxiosRequestConfig<any>) {
    return apiCaller<T>('put', url, data, config);
  },
};

export default api;
