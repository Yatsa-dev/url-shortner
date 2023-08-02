export default () => ({
  port: parseInt(process.env.PORT) || 3000,
  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/test',
  domainUrl: process.env.DOMAIN_URL,
});
