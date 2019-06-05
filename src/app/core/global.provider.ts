import { Provider } from 'vue-di-container';

import { HttpService } from './services/http.service';

export const serviceProvider: Provider<any>[] = [
    HttpService,
];
