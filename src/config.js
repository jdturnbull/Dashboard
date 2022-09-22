module.exports = {
  environment: process.env.NODE_ENV,
  port: process.env.PORT,
  postgres: {
    host: process.env.HOST,
    port: process.env.PG_PORT,
    user: process.env.PG_USER,
    password: process.env.PG_PASS,
    database: process.env.PG_DB,
  },
  magic: {
    pk: process.env.REACT_APP_MAGIC_PK,
    sk: process.env.REACT_APP_MAGIC_SK,
  },
  shopify: {
    uuid: process.env.REACT_APP_SHOPIFY_UUID,
  },
  api_base: 'http://localhost:7074',
};
