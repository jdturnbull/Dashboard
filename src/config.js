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
  app_base:
    process.env.NODE_ENV === "production"
      ? "https://sprightly-pithivier-b6b45f.netlify.app"
      : "http://localhost:3000",
  api_base:
    process.env.NODE_ENV === "production"
      ? "https://apiv2.communion.so"
      : "http://localhost:7074",
};
