import "dotenv/config";

export const session_secret = process.env.session_secret || "";

export const google_client_id = process.env.google_client_id || "";
export const google_client_secret = process.env.google_client_secret || "";

export const facebook_client_id = process.env.facebook_client_id || "";
export const facebook_client_secret = process.env.facebook_client_secret || "";

// is using passport-twitter-oauth2
// const twitter_client_id = process.env.twitter_client_id;
// const twitter_client_secret = process.env.twitter_client_secret;

// if using passport-twitter(uses oauth1)
export const twitter_api_key = process.env.twitter_api_key || "";
export const twitter_api_secret = process.env.twitter_api_secret || "";

export const github_client_id = process.env.github_client_id || "";
export const github_client_secret = process.env.github_client_secret || "";

export const frontendUrl = process.env.frontendUrl || "";
export const backendUrl = process.env.backendUrl || "";

export const jwt_secret = process.env.jwt_secret || "";

export const redis_url = process.env.redis_url || "";

export const senders_gmail = process.env.senders_gmail || "";
export const senders_gmail_app_password =
  process.env.senders_gmail_app_password || "";
export const google_refresh_token = process.env.google_refresh_token || "";
