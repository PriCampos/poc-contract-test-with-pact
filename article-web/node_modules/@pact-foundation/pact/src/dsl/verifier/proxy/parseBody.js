"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseBody = void 0;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
var parseBody = function (proxyReq, req) {
    if (!req.body || !Object.keys(req.body).length) {
        return;
    }
    var bodyData;
    if (Buffer.isBuffer(req.body)) {
        bodyData = req.body;
    }
    else if (typeof req.body === 'object') {
        bodyData = JSON.stringify(req.body);
    }
    if (bodyData) {
        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
        proxyReq.write(bodyData);
    }
};
exports.parseBody = parseBody;
//# sourceMappingURL=parseBody.js.map