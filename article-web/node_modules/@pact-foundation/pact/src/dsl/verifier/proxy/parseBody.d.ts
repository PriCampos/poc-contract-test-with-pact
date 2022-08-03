/// <reference types="node" />
import * as http from 'http';
interface ReqBodyExtended extends http.IncomingMessage {
    body?: Buffer | Record<string, unknown>;
}
export declare const parseBody: (proxyReq: http.ClientRequest, req: ReqBodyExtended) => void;
export {};
