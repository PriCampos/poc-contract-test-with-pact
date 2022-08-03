"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setHeaders = exports.setBody = exports.setQuery = exports.setRequestMethodAndPath = exports.setResponseDetails = exports.setRequestDetails = exports.contentTypeFromHeaders = void 0;
var matchers_1 = require("../dsl/matchers");
var ramda_1 = require("ramda");
var util_1 = require("util");
// eslint-disable-next-line
var INTERACTION_PART;
(function (INTERACTION_PART) {
    INTERACTION_PART[INTERACTION_PART["REQUEST"] = 1] = "REQUEST";
    INTERACTION_PART[INTERACTION_PART["RESPONSE"] = 2] = "RESPONSE";
})(INTERACTION_PART || (INTERACTION_PART = {}));
var CONTENT_TYPE_HEADER = 'content-type';
var CONTENT_TYPE_JSON = 'application/json';
var contentTypeFromHeaders = function (headers, defaultContentType) {
    var contentType = defaultContentType;
    (0, ramda_1.forEachObjIndexed)(function (v, k) {
        if ("".concat(k).toLowerCase() === CONTENT_TYPE_HEADER) {
            contentType = (0, matchers_1.matcherValueOrString)(v);
        }
    }, headers || {});
    return contentType;
};
exports.contentTypeFromHeaders = contentTypeFromHeaders;
var setRequestDetails = function (interaction, req) {
    (0, exports.setRequestMethodAndPath)(interaction, req);
    (0, exports.setBody)(INTERACTION_PART.REQUEST, interaction, req.headers, req.body);
    (0, exports.setHeaders)(INTERACTION_PART.REQUEST, interaction, req.headers);
    (0, exports.setQuery)(interaction, req.query);
};
exports.setRequestDetails = setRequestDetails;
var setResponseDetails = function (interaction, res) {
    interaction.withStatus(res.status);
    (0, exports.setBody)(INTERACTION_PART.RESPONSE, interaction, res.headers, res.body);
    (0, exports.setHeaders)(INTERACTION_PART.RESPONSE, interaction, res.headers);
};
exports.setResponseDetails = setResponseDetails;
var setRequestMethodAndPath = function (interaction, req) {
    if ((req === null || req === void 0 ? void 0 : req.method) && (req === null || req === void 0 ? void 0 : req.path)) {
        var method = req === null || req === void 0 ? void 0 : req.method;
        var reqPath = (0, matchers_1.matcherValueOrString)(req === null || req === void 0 ? void 0 : req.path);
        interaction.withRequest(method, reqPath);
    }
};
exports.setRequestMethodAndPath = setRequestMethodAndPath;
var setQuery = function (interaction, query) {
    (0, ramda_1.forEachObjIndexed)(function (v, k) {
        if ((0, util_1.isArray)(v)) {
            v.forEach(function (vv, i) {
                interaction.withQuery(k, i, (0, matchers_1.matcherValueOrString)(vv));
            });
        }
        else {
            interaction.withQuery(k, 0, (0, matchers_1.matcherValueOrString)(v));
        }
    }, query);
};
exports.setQuery = setQuery;
var setBody = function (part, interaction, headers, body) {
    if (body) {
        var matcher = (0, matchers_1.matcherValueOrString)(body);
        var contentType = (0, exports.contentTypeFromHeaders)(headers, CONTENT_TYPE_JSON);
        switch (part) {
            case INTERACTION_PART.REQUEST:
                interaction.withRequestBody(matcher, contentType);
                break;
            case INTERACTION_PART.RESPONSE:
                interaction.withResponseBody(matcher, contentType);
                break;
            default:
                break;
        }
    }
};
exports.setBody = setBody;
var setHeaders = function (part, interaction, headers) {
    (0, ramda_1.forEachObjIndexed)(function (v, k) {
        switch (part) {
            case INTERACTION_PART.REQUEST:
                interaction.withRequestHeader("".concat(k), 0, (0, matchers_1.matcherValueOrString)(v));
                break;
            case INTERACTION_PART.RESPONSE:
                interaction.withResponseHeader("".concat(k), 0, (0, matchers_1.matcherValueOrString)(v));
                break;
            default:
                break;
        }
    }, headers);
};
exports.setHeaders = setHeaders;
//# sourceMappingURL=ffi.js.map