import * as http from 'http';
import { ProxyOptions } from './types';
export declare const waitForServerReady: (server: http.Server) => Promise<http.Server>;
export declare const createProxy: (config: ProxyOptions, stateSetupPath: string) => http.Server;
