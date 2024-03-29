const GraphQLJSON = require('graphql-type-json');
const packageJSON = require('../package.json');
const { validateConfig } = require('./configSchema');

const resolvers = {
    JSON: GraphQLJSON,
    Query: {
        adapter: (config) => {
            validateConfig(config);

            return config.adapter;
        },
        version: () => packageJSON.version,
        config: config => config,
    },
    Adapter: {
        endpoint: ({ endpoints }, { id }) => endpoints.find(endpoint => endpoint.id === id),
    },
    Endpoint: {
        data: ({ connector }, { request }) => connector(request),
    },
    Config: {
        isValid: (config) => {
            let isValid;

            try {
                validateConfig(config);

                isValid = true;
            } catch (e) {
                isValid = false;
            }

            return isValid;
        },
    },
};

module.exports = {
    resolvers,
};
