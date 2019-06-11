import axios from 'axios';

export const AxiosDIKey: symbol = Symbol(`Axios`);

export const AxiosServiceInst = axios;

export { AxiosStatic as AxiosService } from 'axios';
export * from 'axios';
