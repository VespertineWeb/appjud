// Usando a sintaxe de importação/exportação ES module
export default {
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    SENDPULSE_USER_ID: process.env.SENDPULSE_USER_ID,
    SENDPULSE_SECRET: process.env.SENDPULSE_SECRET,
    SENDPULSE_TOKEN_STORAGE: process.env.SENDPULSE_TOKEN_STORAGE,
  },
};
