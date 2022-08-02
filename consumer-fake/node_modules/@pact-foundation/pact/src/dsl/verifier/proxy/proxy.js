"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProxy = exports.waitForServerReady = void 0;
var express_1 = __importDefault(require("express"));
var http_proxy_1 = __importDefault(require("http-proxy"));
var body_parser_1 = __importDefault(require("body-parser"));
var http = __importStar(require("http"));
var logger_1 = __importDefault(require("../../../common/logger"));
var stateHandler_1 = require("./stateHandler/stateHandler");
var hooks_1 = require("./hooks");
var tracer_1 = require("./tracer");
var parseBody_1 = require("./parseBody");
// Listens for the server start event
var waitForServerReady = function (server) {
    return new Promise(function (resolve, reject) {
        server.on('listening', function () { return resolve(server); });
        server.on('error', function () {
            return reject(new Error('Unable to start verification proxy server'));
        });
    });
};
exports.waitForServerReady = waitForServerReady;
// Get the Proxy we'll pass to the CLI for verification
var createProxy = function (config, stateSetupPath) {
    var app = (0, express_1.default)();
    var proxy = new http_proxy_1.default();
    logger_1.default.trace("Setting up state proxy with path: ".concat(stateSetupPath));
    // NOTE: if you change any of these global middleware that consumes the body
    //       review the "proxyReq" event reader below
    app.use(body_parser_1.default.json({
        type: [
            'application/json',
            'application/json; charset=utf-8',
            'application/json; charset=utf8',
        ],
    }));
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.use('/*', body_parser_1.default.raw({ type: '*/*' }));
    (0, hooks_1.registerBeforeHook)(app, config, stateSetupPath);
    (0, hooks_1.registerAfterHook)(app, config, stateSetupPath);
    // Trace req/res logging
    if (config.logLevel === 'debug' || config.logLevel === 'trace') {
        logger_1.default.info('debug request/response logging enabled');
        app.use((0, tracer_1.createRequestTracer)());
        app.use((0, tracer_1.createResponseTracer)());
    }
    // Allow for request filtering
    if (config.requestFilter !== undefined) {
        app.use(config.requestFilter);
    }
    // Setup provider state handler
    app.post(stateSetupPath, (0, stateHandler_1.createProxyStateHandler)(config));
    // Proxy server will respond to Verifier process
    app.all('/*', function (req, res) {
        logger_1.default.debug("Proxying ".concat(req.method, ": ").concat(req.path));
        proxy.web(req, res, {
            changeOrigin: config.changeOrigin === true,
            secure: config.validateSSL === true,
            target: config.providerBaseUrl,
        });
    });
    proxy.on('proxyReq', function (proxyReq, req) { return (0, parseBody_1.parseBody)(proxyReq, req); });
    return http.createServer(app).listen();
};
exports.createProxy = createProxy;
//# sourceMappingURL=proxy.js.map