## Auth App

To study diff auth methods

## Notes

### Oauth

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

### JWT

- **Redis** is particularly well-suited for token blacklisting token during logout due to its speed, simplicity, and built-in expiration features. Redis is designed for low-latency operations because it stores data in memory. This makes it significantly faster than traditional disk-based databases like MongoDB or SQL.
- created redis db using upstash

### Passwordless

- Only for signup and signin. Verfication is through traditional jwt cookies/headers
- During signin we dont use password(only email). Instead would send an otp to email and verify its expiration. And then will send the token to frontend. (an extra step like 2 factor auth)
- For checking auth this token is sent via headers/stored in cookies each time for every route
- To set up modemailer follow the set mentioned here https://dev.to/chandrapantachhetri/sending-emails-securely-using-node-js-nodemailer-smtp-gmail-and-oauth2-g3a and code mentioned in claude ai code here [claudeai-code.md](./claudeai-code.md)
