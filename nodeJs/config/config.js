const config = {
    port: 5001 || process.env.port,
    mongodbOptions: {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true
    },
    jwt_secret_key: 'secret#123',
    jwt_expiresIn: '24h',
    genId_length: 10
};

const development = {
    mongodb: 'mongodb://localhost:27017/eventInfo'
};

const production = {
    mongodb: 'mongodb://user:password@localhost:27017/eventInfo'
};

let environment = process.env.NODE_ENV || 'development';

console.log(`Loaded Configs: ${environment}`);

module.exports = Object.assign(config, eval(environment));