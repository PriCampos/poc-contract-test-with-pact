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
Object.defineProperty(exports, "__esModule", { value: true });
var chai = __importStar(require("chai"));
var MatchersV3 = __importStar(require("./matchers"));
var expect = chai.expect;
describe('V3 Matchers', function () {
    describe('#like', function () {
        it('returns a JSON representation of a like matcher', function () {
            var result = MatchersV3.like({
                a: 'b',
            });
            expect(result).to.deep.equal({
                'pact:matcher:type': 'type',
                value: {
                    a: 'b',
                },
            });
        });
    });
    describe('#eachKeylike', function () {
        it('returns a JSON representation of an eachKeyLike matcher', function () {
            var result = MatchersV3.eachKeyLike('004', {
                id: '004',
            });
            expect(result).to.deep.equal({
                'pact:matcher:type': 'values',
                value: {
                    '004': {
                        id: '004',
                    },
                },
            });
        });
    });
    describe('#eachLike', function () {
        it('returns a JSON representation of an eachLike matcher', function () {
            var result = MatchersV3.eachLike({
                a: 'b',
            });
            expect(result).to.deep.equal({
                'pact:matcher:type': 'type',
                value: [
                    {
                        a: 'b',
                    },
                ],
            });
        });
    });
    describe('#atLeastOneLike', function () {
        describe('with no examples', function () {
            it('returns a JSON representation of an atLeastOneLike matcher', function () {
                var result = MatchersV3.atLeastOneLike({
                    a: 'b',
                });
                expect(result).to.deep.equal({
                    'pact:matcher:type': 'type',
                    min: 1,
                    value: [
                        {
                            a: 'b',
                        },
                    ],
                });
            });
        });
        describe('when provided examples', function () {
            it('returns a JSON representation of an atLeastOneLike matcher with the correct number of examples', function () {
                var result = MatchersV3.atLeastOneLike({
                    a: 'b',
                }, 4);
                expect(result).to.deep.equal({
                    'pact:matcher:type': 'type',
                    min: 1,
                    value: [{ a: 'b' }, { a: 'b' }, { a: 'b' }, { a: 'b' }],
                });
            });
        });
    });
    describe('#atLeastLike', function () {
        describe('with no examples', function () {
            it('returns a JSON representation of an atLeastLike matcher', function () {
                var result = MatchersV3.atLeastLike({
                    a: 'b',
                }, 2);
                expect(result).to.deep.equal({
                    'pact:matcher:type': 'type',
                    min: 2,
                    value: [{ a: 'b' }, { a: 'b' }],
                });
            });
        });
        describe('when provided examples', function () {
            it('returns a JSON representation of an atLeastLike matcher with the correct number of examples', function () {
                var result = MatchersV3.atLeastLike({
                    a: 'b',
                }, 2, 4);
                expect(result).to.deep.equal({
                    'pact:matcher:type': 'type',
                    min: 2,
                    value: [{ a: 'b' }, { a: 'b' }, { a: 'b' }, { a: 'b' }],
                });
            });
        });
        it('throws an error if the number of examples is less than the minimum', function () {
            expect(function () { return MatchersV3.atLeastLike({ a: 'b' }, 4, 2); }).to.throw('atLeastLike has a minimum of 4 but 2 elements were requested. Make sure the count is greater than or equal to the min.');
        });
    });
    describe('#atMostLike', function () {
        describe('with no examples', function () {
            it('returns a JSON representation of an atMostLike matcher', function () {
                var result = MatchersV3.atMostLike({
                    a: 'b',
                }, 2);
                expect(result).to.deep.equal({
                    'pact:matcher:type': 'type',
                    max: 2,
                    value: [{ a: 'b' }],
                });
            });
        });
        describe('when provided examples', function () {
            it('returns a JSON representation of an atMostLike matcher with the correct number of examples', function () {
                var result = MatchersV3.atMostLike({
                    a: 'b',
                }, 4, 4);
                expect(result).to.deep.equal({
                    'pact:matcher:type': 'type',
                    max: 4,
                    value: [{ a: 'b' }, { a: 'b' }, { a: 'b' }, { a: 'b' }],
                });
            });
        });
        it('throws an error if the number of examples is more than the maximum', function () {
            expect(function () { return MatchersV3.atMostLike({ a: 'b' }, 2, 4); }).to.throw('atMostLike has a maximum of 2 but 4 elements where requested. Make sure the count is less than or equal to the max.');
        });
    });
    describe('#constrainedArrayLike', function () {
        describe('with no examples', function () {
            it('returns a JSON representation of an constrainedArrayLike matcher', function () {
                var result = MatchersV3.constrainedArrayLike({
                    a: 'b',
                }, 2, 4);
                expect(result).to.deep.equal({
                    'pact:matcher:type': 'type',
                    min: 2,
                    max: 4,
                    value: [{ a: 'b' }, { a: 'b' }],
                });
            });
        });
        describe('when provided examples', function () {
            it('returns a JSON representation of an constrainedArrayLike matcher with the correct number of examples', function () {
                var result = MatchersV3.constrainedArrayLike({
                    a: 'b',
                }, 2, 4, 3);
                expect(result).to.deep.equal({
                    'pact:matcher:type': 'type',
                    min: 2,
                    max: 4,
                    value: [{ a: 'b' }, { a: 'b' }, { a: 'b' }],
                });
            });
        });
        it('throws an error if the number of examples is less than the minimum', function () {
            expect(function () {
                return MatchersV3.constrainedArrayLike({ a: 'b' }, 4, 6, 2);
            }).to.throw('constrainedArrayLike has a minimum of 4 but 2 elements where requested. Make sure the count is greater than or equal to the min.');
        });
        it('throws an error if the number of examples is more than the maximum', function () {
            expect(function () {
                return MatchersV3.constrainedArrayLike({ a: 'b' }, 4, 6, 8);
            }).to.throw('constrainedArrayLike has a maximum of 6 but 8 elements where requested. Make sure the count is less than or equal to the max.');
        });
    });
    describe('#integer', function () {
        it('returns a JSON representation of an integer matcher', function () {
            var result = MatchersV3.integer(100);
            expect(result).to.deep.equal({
                'pact:matcher:type': 'integer',
                value: 100,
            });
        });
        describe('when the example is zero', function () {
            it('returns a JSON representation of an integer matcher', function () {
                var result = MatchersV3.integer(0);
                expect(result).to.deep.equal({
                    'pact:matcher:type': 'integer',
                    value: 0,
                });
            });
        });
        describe('when no example is given', function () {
            it('also includes a random integer generator', function () {
                var result = MatchersV3.integer();
                expect(result).to.deep.equal({
                    'pact:matcher:type': 'integer',
                    'pact:generator:type': 'RandomInt',
                    value: 101,
                });
            });
        });
    });
    describe('#decimal', function () {
        it('returns a JSON representation of an decimal matcher', function () {
            var result = MatchersV3.decimal(100.3);
            expect(result).to.deep.equal({
                'pact:matcher:type': 'decimal',
                value: 100.3,
            });
        });
        describe('when the example is zero', function () {
            it('returns a JSON representation of an integer matcher', function () {
                var result = MatchersV3.decimal(0.0);
                expect(result).to.deep.equal({
                    'pact:matcher:type': 'decimal',
                    value: 0.0,
                });
            });
        });
        describe('when no example is given', function () {
            it('also includes a random decimal generator', function () {
                var result = MatchersV3.decimal();
                expect(result).to.deep.equal({
                    'pact:matcher:type': 'decimal',
                    'pact:generator:type': 'RandomDecimal',
                    value: 12.34,
                });
            });
        });
    });
    describe('#number', function () {
        it('returns a JSON representation of an number matcher', function () {
            var result = MatchersV3.number(100.3);
            expect(result).to.deep.equal({
                'pact:matcher:type': 'number',
                value: 100.3,
            });
        });
        describe('when no example is given', function () {
            it('also includes a random integer generator', function () {
                var result = MatchersV3.number();
                expect(result).to.deep.equal({
                    'pact:matcher:type': 'number',
                    'pact:generator:type': 'RandomInt',
                    value: 1234,
                });
            });
        });
    });
    describe('#boolean', function () {
        it('returns a JSON representation of a like matcher', function () {
            var result = MatchersV3.boolean(true);
            expect(result).to.deep.equal({
                'pact:matcher:type': 'type',
                value: true,
            });
        });
    });
    describe('#string', function () {
        it('returns a JSON representation of a like matcher', function () {
            var result = MatchersV3.string('true');
            expect(result).to.deep.equal({
                'pact:matcher:type': 'type',
                value: 'true',
            });
        });
    });
    describe('#regex', function () {
        it('returns a JSON representation of a regex matcher', function () {
            var result = MatchersV3.regex('\\d+', '1234');
            expect(result).to.deep.equal({
                'pact:matcher:type': 'regex',
                regex: '\\d+',
                value: '1234',
            });
        });
        describe('when given a regular expression', function () {
            it('returns a JSON representation of a regex matcher', function () {
                var result = MatchersV3.regex(/\d+/, '1234');
                expect(result).to.deep.equal({
                    'pact:matcher:type': 'regex',
                    regex: '\\d+',
                    value: '1234',
                });
            });
        });
    });
    describe('#equal', function () {
        it('returns a JSON representation of an equality matcher', function () {
            var result = MatchersV3.equal('true');
            expect(result).to.deep.equal({
                'pact:matcher:type': 'equality',
                value: 'true',
            });
        });
    });
    describe('#datetime', function () {
        describe('when an example is given', function () {
            it('returns a JSON representation of a datetime matcher', function () {
                var result = MatchersV3.datetime("yyyy-MM-dd'T'HH:mm:ss.SSSX", '2016-02-11T09:46:56.023Z');
                expect(result).to.deep.equal({
                    'pact:matcher:type': 'timestamp',
                    format: "yyyy-MM-dd'T'HH:mm:ss.SSSX",
                    value: '2016-02-11T09:46:56.023Z',
                });
            });
        });
    });
    describe('#time', function () {
        it('returns a JSON representation of a time matcher', function () {
            var result = MatchersV3.time('HH:mm:ss', '09:46:56');
            expect(result).to.deep.equal({
                'pact:generator:type': 'Time',
                'pact:matcher:type': 'time',
                format: 'HH:mm:ss',
                value: '09:46:56',
            });
        });
    });
    describe('#date', function () {
        it('returns a JSON representation of a date matcher', function () {
            var result = MatchersV3.date('yyyy-MM-dd', '2016-02-11');
            expect(result).to.deep.equal({
                'pact:generator:type': 'Date',
                'pact:matcher:type': 'date',
                format: 'yyyy-MM-dd',
                value: '2016-02-11',
            });
        });
    });
    describe('#includes', function () {
        it('returns a JSON representation of an include matcher', function () {
            var result = MatchersV3.includes('true');
            expect(result).to.deep.equal({
                'pact:matcher:type': 'include',
                value: 'true',
            });
        });
    });
    describe('#nullValue', function () {
        it('returns a JSON representation of an null matcher', function () {
            var result = MatchersV3.nullValue();
            expect(result).to.deep.equal({
                'pact:matcher:type': 'null',
            });
        });
    });
    describe('#url', function () {
        it('returns a JSON representation of a regex matcher for the URL', function () {
            var result = MatchersV3.url2('http://localhost:8080', [
                'users',
                '1234',
                'posts',
                'latest',
            ]);
            expect(result).to.deep.equal({
                'pact:matcher:type': 'regex',
                regex: '.*(\\/users\\/1234\\/posts\\/latest)$',
                value: 'http://localhost:8080/users/1234/posts/latest',
            });
        });
        describe('when provided with a regex matcher', function () {
            it('returns a JSON representation of a regex matcher for the URL', function () {
                var result = MatchersV3.url2('http://localhost:8080', [
                    'users',
                    MatchersV3.regex('\\d+', '1234'),
                    'posts',
                    'latest',
                ]);
                expect(result).to.deep.equal({
                    'pact:matcher:type': 'regex',
                    regex: '.*(\\/users\\/\\d+\\/posts\\/latest)$',
                    value: 'http://localhost:8080/users/1234/posts/latest',
                });
            });
        });
        describe('when provided with a regular expression', function () {
            it('returns a JSON representation of a regex matcher for the URL', function () {
                var result = MatchersV3.url2('http://localhost:8080', [
                    'users',
                    /\d+/,
                    'posts',
                    'latest',
                ]);
                expect(result).to.deep.contain({
                    'pact:matcher:type': 'regex',
                    regex: '.*(\\/users\\/\\d+\\/posts\\/latest)$',
                });
                expect(result.value).to.match(/\/users\/\d+\/posts\/latest$/);
            });
        });
        describe('when no base URL is provided', function () {
            it('returns regex matcher and a MockServerURL generator', function () {
                var result = MatchersV3.url([
                    'users',
                    MatchersV3.regex('\\d+', '1234'),
                    'posts',
                    'latest',
                ]);
                expect(result).to.deep.equal({
                    'pact:matcher:type': 'regex',
                    'pact:generator:type': 'MockServerURL',
                    regex: '.*(\\/users\\/\\d+\\/posts\\/latest)$',
                    value: 'http://localhost:8080/users/1234/posts/latest',
                    example: 'http://localhost:8080/users/1234/posts/latest',
                });
            });
        });
    });
    describe('#uuid', function () {
        it('returns a JSON representation of an regex matcher for UUIDs', function () {
            var result = MatchersV3.uuid('ba4bd1bc-5556-11eb-9286-d71bc5b507be');
            expect(result).to.deep.equal({
                'pact:matcher:type': 'regex',
                regex: '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}',
                value: 'ba4bd1bc-5556-11eb-9286-d71bc5b507be',
            });
        });
        it('throws an exception if the example value does not match the UUID regex', function () {
            expect(function () { return MatchersV3.uuid('not a uuid'); }).to.throw();
            expect(function () { return MatchersV3.uuid('ba4bd1bc-5556-11eb-9286'); }).to.throw();
            expect(function () {
                return MatchersV3.uuid('ba4bd1bc-5556-11eb-9286-d71bc5b507be-1234');
            }).to.throw();
        });
        it('if no example is provided, it sets up a generator', function () {
            var result = MatchersV3.uuid();
            expect(result).to.deep.equal({
                'pact:matcher:type': 'regex',
                'pact:generator:type': 'Uuid',
                regex: '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}',
                value: 'e2490de5-5bd3-43d5-b7c4-526e33f71304',
            });
        });
    });
});
//# sourceMappingURL=matchers.spec.js.map