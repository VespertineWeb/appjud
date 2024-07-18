export default {
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    SENDPULSE_USER_ID: process.env.SENDPULSE_USER_ID,
    SENDPULSE_SECRET: process.env.SENDPULSE_SECRET,
    SENDPULSE_TOKEN_STORAGE: process.env.SENDPULSE_TOKEN_STORAGE,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL
  },
  reactStrictMode: true
};
