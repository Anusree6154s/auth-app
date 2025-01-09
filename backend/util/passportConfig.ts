// passportConfig.js
import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { Strategy as GitHubStrategy } from "passport-github";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import OpenIDConnectStrategy from "passport-openidconnect";
import { Strategy as TwitterStrategy } from "passport-twitter";
import {
  facebook_client_id,
  facebook_client_secret,
  github_client_id,
  github_client_secret,
  google_client_id,
  google_client_secret,
  twitter_api_key,
  twitter_api_secret,
} from "../config/constants";

function configurePassport() {
  // Configure Google OAuth strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: google_client_id,
        clientSecret: google_client_secret,
        callbackURL: "/auth/oauth/google/callback",
      },
      (accessToken: any, refreshToken: any, profile: any, done: any) =>
        done(null, profile)
    )
  );

  passport.use(
    new FacebookStrategy(
      {
        clientID: facebook_client_id,
        clientSecret: facebook_client_secret,
        callbackURL: "/auth/oauth/facebook/callback",
      },
      (accessToken: any, refreshToken: any, profile: any, done: any) =>
        done(null, profile)
    )
  );

  // Configure Twitter strategy
  passport.use(
    new TwitterStrategy(
      {
        consumerKey: twitter_api_key,
        consumerSecret: twitter_api_secret,
        callbackURL: "/auth/oauth/twitter/callback",
      },
      (accessToken: any, refreshToken: any, profile: any, done: any) =>
        done(null, profile)
    )
  );

  // Configure GitHub strategy
  passport.use(
    new GitHubStrategy(
      {
        clientID: github_client_id,
        clientSecret: github_client_secret,
        callbackURL: "/auth/oauth/github/callback",
      },
      (accessToken: any, refreshToken: any, profile: any, done: any) =>
        done(null, profile)
    )
  );


  passport.use(
    new OpenIDConnectStrategy(
      {
        issuer: "https://accounts.google.com",
        authorizationURL: "https://accounts.google.com/o/oauth2/v2/auth",
        tokenURL: "https://oauth2.googleapis.com/token",
        userInfoURL: "https://openidconnect.googleapis.com/v1/userinfo",
        clientID: google_client_id,
        clientSecret: google_client_secret,
        callbackURL: "/auth/oidc/callback",
      },
      async (issuer: any, profile: any, done: any) => {
        try {
          done(null, profile);
        } catch (error) {
          console.error("oidc strategy error:", error);
          done(error);
        }
      }
    )
  );

  // Serialize and deserialize user
  passport.serializeUser((user: any, done: any) => done(null, user));
  passport.deserializeUser((user: any, done: any) => done(null, user));
}

export default configurePassport;
