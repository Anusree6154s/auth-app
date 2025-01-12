# Auth App

To study diff auth methods

## Notes

### Table of Contents

1. Basic Auth
2. OAuth based auth
3. JWT token based auth
4. Session based auth
5. Passwordless auth
6. Open ID Connect (OIDC) based auth
7. mTLS based auth
8. Deployment
9. Choice of Techstack

### 1. Basic Auth

- Like Bearer Auth
- Using basic-auth library
- often accompanied by any other form of session/token storage to maintain session expiry

### 2. Oauth

- uses passport-google-oauth20 etc
- that uses passport session to manage sessions
- passport session needs express session
- express session can send cookies from backend to frontned (NEEDS TO BE STUDIED. NOT SURE)

  - while using diff frontend andb backend hosts only if both have https
  - only if frontend and baclemd are on same site(using nginx proxy or setting express.static())
  - _we are using express.static() method to access frontend files via backend_ [in vanilla html]

- **Tips**:
  - use `<base href="http://localhost:8000">` in html head to avoid rewriting baseurl in html (while accessing frontend files via backend express.static()) [in case of vanilla html]
  - use below in nextjs avoid rewriting baseurl
    ```js
    async rewrites() {
    return [
        {
        source: "/auth/:path*", // Frontend route
        destination: "http://localhost:8000/auth/:path*", // Backend route
        },
    ];
    },
    ```

### 3. JWT

- **Redis** is particularly well-suited for token blacklisting token during logout due to its speed, simplicity, and built-in expiration features. Redis is designed for low-latency operations because it stores data in memory. This makes it significantly faster than traditional disk-based databases like MongoDB or SQL.
- created redis db using upstash

### 4. Session based

- Plain session based auth
- It has already been used along with basic auth and oauth, but just t o study it in isolation

### 5. Passwordless

- Only for signup and signin. Verfication is through traditional jwt cookies/headers
- During signin we dont use password(only email). Instead would send an otp to email and verify its expiration. And then will send the token to frontend. (an extra step like 2 factor auth)
- For checking auth this token is sent via headers/stored in cookies each time for every route
- To set up modemailer follow the set mentioned here https://dev.to/chandrapantachhetri/sending-emails-securely-using-node-js-nodemailer-smtp-gmail-and-oauth2-g3a and code mentioned in claude ai code here [claudeai-code.md](./claudeai-code.md)

### 6. OpenID Connect

- We used Google as the OpenID Provider (IdP) and passport-openidconnect to help set up openid

### 7. mTLS (Mutual Transport Layer Security) (not implemented completely cause of minor errors)

- https://github.com/edum-compassuol/mTLS-nodejs-example/blob/main/server/src/server.ts
- Mutual TLS (mTLS) authentication involves verifying both the client and server identities using TLS certificates.
- Includes 2 steps:
  1. creating certficated for server & client
  2. logging in after verifying the certificates (session is managed by header/cookies)
- First You'll need to create the following in a seperate folder called `cert` outside frotend or backend folder:
  - A CA certificate to sign client and server certificates.
  - A server certificate and private key.
  - A client certificate and private key.
- Download ssl from https://slproweb.com/products/Win32OpenSSL.html
- OpenSSL commands to create certificates in cert folder: [ssl-commands.md](./ssl-commands.md)
- **remember to add the folder cert/ and all the related certificate extensions as in [gitignore-commands.md](./gitignore-commands.md) to gitignore before committing**
- If everything is configured correctly:
  - The server will verify the client certificate.
  - The client will verify the server certificate.
- Common Issues
  - Certificate Mismatch: Ensure the client and server - certificates are signed by the same CA.
  - Incorrect Paths: Double-check the file paths for the keys and certificates.
  - Firewall/Port Issues: Ensure port 8443 is open for communication.(convetionally use port 8443 for mTLS)
- Used in Banks (e.g., JPMorgan Chase, Goldman Sachs), Payment Processors (e.g., Stripe, PayPal, Square), Cloud Providers (e.g., AWS, Microsoft Azure, Google Cloud), etc
- Working:
  - Browsers do not natively support mTLS directly due to security constraints. So we will use nextjs api to work with client certificates. (∴ cannot do directly within page.tsx)

### 8. Deployment
- Basic typescript nodejs deployment: https://youtu.be/4mqy5SjkDec?si=rFG2Wu8NYmq-8PjD

### 9. Choice of Techstack
- ReactJS because of not able to use express-session
  - NextSJ was the first choice in order to learn the techstack. But express-session was not letting me set cookies in frontend because of cross-origin. (couldnt find a simple solution in neither stackoverflow nor gpt)
  - So now im serving react build files directly from server