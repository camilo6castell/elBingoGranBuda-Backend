require("dotenv").config();

const ENV = process.env.NODE_ENV || "development";

const envConfig = {
    env: ENV,
    port: process.env.PORT || 3001,
    dbUri: {
        development: process.env.DB_URI_DEV,
        test: process.env.DB_URI_TEST,
        production: process.env.DB_URI_PROD,
    }[ENV],
};

if (!envConfig.dbUri) {
    throw new Error(`❌ No DB URI defined for environment: ${ENV}`);
}

module.exports = envConfig;
