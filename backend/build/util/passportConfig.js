"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// passportConfig.js
const passport_1 = __importDefault(require("passport"));
const passport_facebook_1 = require("passport-facebook");
const passport_github_1 = require("passport-github");
const passport_google_oauth20_1 = require("passport-google-oauth20");
const passport_openidconnect_1 = __importDefault(require("passport-openidconnect"));
const passport_twitter_1 = require("passport-twitter");
const constants_1 = require("../config/constants");
function configurePassport() {
    // Configure Google OAuth strategy
    // https://stackoverflow.com/questions/70711876/my-https-website-after-google-auth-redirects-to-http
    // ∴ adding backendurl for prodcution purpose
    passport_1.default.use(new passport_google_oauth20_1.Strategy({
        clientID: constants_1.google_client_id,
        clientSecret: constants_1.google_client_secret,
        callbackURL: constants_1.backendUrl + "/auth/oauth/google/callback",
    }, (_, __, profile, done) => done(null, profile)));
    passport_1.default.use(new passport_facebook_1.Strategy({
        clientID: constants_1.facebook_client_id,
        clientSecret: constants_1.facebook_client_secret,
        callbackURL: constants_1.backendUrl + "/auth/oauth/facebook/callback",
    }, (_, __, profile, done) => done(null, profile)));
    // Configure Twitter strategy
    passport_1.default.use(new passport_twitter_1.Strategy({
        consumerKey: constants_1.twitter_api_key,
        consumerSecret: constants_1.twitter_api_secret,
        callbackURL: constants_1.backendUrl + "/auth/oauth/twitter/callback",
    }, (_, __, profile, done) => done(null, profile)));
    // Configure GitHub strategy
    passport_1.default.use(new passport_github_1.Strategy({
        clientID: constants_1.github_client_id,
        clientSecret: constants_1.github_client_secret,
        callbackURL: constants_1.backendUrl + "/auth/oauth/github/callback",
    }, (_, __, profile, done) => done(null, profile)));
    passport_1.default.use(new passport_openidconnect_1.default({
        issuer: "https://accounts.google.com",
        authorizationURL: "https://accounts.google.com/o/oauth2/v2/auth",
        tokenURL: "https://oauth2.googleapis.com/token",
        userInfoURL: "https://openidconnect.googleapis.com/v1/userinfo",
        clientID: constants_1.google_client_id,
        clientSecret: constants_1.google_client_secret,
        callbackURL: constants_1.backendUrl + "/auth/oidc/callback",
    }, (_, profile, done) => __awaiter(this, void 0, void 0, function* () {
        try {
            done(null, profile);
        }
        catch (error) {
            console.error("oidc strategy error:", error);
            done(error);
        }
    })));
    // Serialize and deserialize user
    passport_1.default.serializeUser((user, done) => done(null, user));
    passport_1.default.deserializeUser((user, done) => done(null, user));
}
exports.default = configurePassport;
