"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.google_refresh_token = exports.senders_gmail_app_password = exports.senders_gmail = exports.redis_url = exports.jwt_secret = exports.github_client_secret = exports.github_client_id = exports.twitter_api_secret = exports.twitter_api_key = exports.facebook_client_secret = exports.facebook_client_id = exports.google_client_secret = exports.google_client_id = exports.session_secret = exports.env = exports.port = void 0;
require("dotenv/config");
exports.port = process.env.PORT || 3000;
exports.env = process.env.NODE_ENV || "";
exports.session_secret = process.env.session_secret || "";
exports.google_client_id = process.env.google_client_id || "";
exports.google_client_secret = process.env.google_client_secret || "";
exports.facebook_client_id = process.env.facebook_client_id || "";
exports.facebook_client_secret = process.env.facebook_client_secret || "";
// is using passport-twitter-oauth2
// const twitter_client_id = process.env.twitter_client_id;
// const twitter_client_secret = process.env.twitter_client_secret;
// if using passport-twitter(uses oauth1)
exports.twitter_api_key = process.env.twitter_api_key || "";
exports.twitter_api_secret = process.env.twitter_api_secret || "";
exports.github_client_id = process.env.github_client_id || "";
exports.github_client_secret = process.env.github_client_secret || "";
exports.jwt_secret = process.env.jwt_secret || "";
exports.redis_url = process.env.redis_url || "";
exports.senders_gmail = process.env.senders_gmail || "";
exports.senders_gmail_app_password = process.env.senders_gmail_app_password || "";
exports.google_refresh_token = process.env.google_refresh_token || "";
