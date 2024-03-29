const { describe, it } = require('mocha');
const { expect } = require('chai');
const { resolvers } = require('./resolvers');
const packageJSON = require('../package.json');

describe('resolvers', function () {
    describe('JSON resolvers', function () {
        it('has a JSON resolver', function () {
            const resolver = resolvers.JSON;

            expect(resolver).to.exist;
        });
    });

    describe('Query resolvers', function () {
        describe('#adapter', function () {
            it('returns the adapter', function () {
                const config = {
                    adapter: {
                        id: 'foo',
                        endpoints: [],
                    },
                };

                const resolver = resolvers.Query.adapter;
                const result = resolver(config);

                expect(result).to.exist;
                expect(result).to.have.property('id', config.adapter.id);
            });

            it('throws when the adapter config is invalid', function () {
                const config = {
                    adapter: {
                        id: 'foo',
                    },
                };

                const resolver = resolvers.Query.adapter;
                const failingCall = () => resolver(config);

                expect(failingCall).to.throw('INVALID_CONFIG');
            });
        });

        describe('#version', function () {
            it('returns the version', function () {
                const resolver = resolvers.Query.version;
                const result = resolver();

                expect(result).to.exist;
                expect(result).to.have.equal(packageJSON.version);
            });
        });

        describe('#config', function () {
            it('returns the raw adapter cofiguration', function () {
                const config = {
                    adapter: {
                        id: 'foo',
                        endpoints: [],
                    },
                };

                const resolver = resolvers.Query.config;
                const result = resolver(config);

                expect(result).to.equal(config);
            });
        });
    });

    describe('Adapter resolvers', function () {
        describe('#endpoint', function () {
            it('returns an endpoint', function () {
                const adapter = {
                    endpoints: [
                        {
                            id: 'foo',
                        },
                    ],
                };

                const resolver = resolvers.Adapter.endpoint;
                const result = resolver(adapter, { id: 'foo' });

                expect(result).to.exist;
                expect(result).to.have.property('id', adapter.endpoints[0].id);
            });
        });
    });

    describe('Endpoint resolvers', function () {
        describe('#data', function () {
            it('returns the data for an endpoint', function () {
                const value = 'foo';
                const endpoint = {
                    connector: () => ({
                        value,
                    }),
                };

                const resolver = resolvers.Endpoint.data;
                const result = resolver(endpoint, {});

                expect(result).to.exist;
                expect(result).to.deep.equal({ value });
            });
        });
    });

    describe('Config resolvers', function () {
        describe('#isValid', function () {
            it('returns true when the configuration is valid', function () {
                const config = {
                    adapter: {
                        id: 'foo',
                        endpoints: [],
                    },
                };

                const resolver = resolvers.Config.isValid;
                const result = resolver(config);

                expect(result).to.equal(true);
            });

            it('returns false when the configuration is not valid', function () {
                const config = {
                    adapter: {
                        id: 'foo',
                    },
                };

                const resolver = resolvers.Config.isValid;
                const result = resolver(config);

                expect(result).to.equal(false);
            });
        });
    });
});
