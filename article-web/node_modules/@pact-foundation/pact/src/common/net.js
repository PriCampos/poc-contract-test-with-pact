"use strict";
/**
 * Network module.
 * @module net
 * @private
 */
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.freePort = exports.isPortAvailable = exports.portCheck = exports.localAddresses = void 0;
var net = __importStar(require("net"));
var bluebird_1 = require("bluebird");
exports.localAddresses = ['127.0.0.1', 'localhost', '0.0.0.0', '::1'];
var portCheck = function (port, host) {
    return new Promise(function (resolve, reject) {
        var server = net
            .createServer()
            .listen({ port: port, host: host, exclusive: true })
            .on('error', function (e) {
            if (e.code === 'EADDRINUSE') {
                reject(new Error("Port ".concat(port, " is unavailable on address ").concat(host)));
            }
            else {
                reject(e);
            }
        })
            .on('listening', function () {
            server.once('close', function () { return resolve(); }).close();
        });
    });
};
exports.portCheck = portCheck;
var isPortAvailable = function (port, host) {
    return Promise.resolve(bluebird_1.Promise
        .map(exports.localAddresses, 
    // we meed to wrap the built-in Promise with bluebird.reflect() so we can
    // test the result of the promise without failing bluebird.map()
    function (h) { return bluebird_1.Promise.resolve((0, exports.portCheck)(port, h)).reflect(); }, 
    // do each port check sequentially (as localhost & 127.0.0.1 will conflict on most default environments)
    { concurrency: 1 })
        .then(function (inspections) {
        // if every port check failed, then fail the `isPortAvailable` check
        if (inspections.every(function (inspection) { return !inspection.isFulfilled(); })) {
            return Promise.reject(new Error("Cannot open port ".concat(port, " on ipv4 or ipv6 interfaces")));
        }
        // the local addresses passed - now check the host that the user has specified
        return (0, exports.portCheck)(port, host);
    }));
};
exports.isPortAvailable = isPortAvailable;
var freePort = function () {
    return new Promise(function (res) {
        var s = net.createServer();
        s.listen(0, function () {
            var port = s.address().port;
            s.close(function () { return res(port); });
        });
    });
};
exports.freePort = freePort;
//# sourceMappingURL=net.js.map