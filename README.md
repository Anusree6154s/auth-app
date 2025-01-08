## Auth App
To study diff auth methods

## Notes

### Oauth
- uses passport-google-oauth20 etc
- that uses passport session to manage sessions
- passport session needs express session
- express session can send cookies from backend to frontned 
    - while using diff frontend andb ackend hosts only if both have https
    - only if frontend and baclemd are on same site(using nginx proxy or setting express.static())
    - *we are using express.static() method to access frontend files via backend*

- **Tips**:
    - use `<base href="http://localhost:8000">` in html head to avoid rewriting baseurl in html (while accessing frontend files via backend express.static())

### JWT
- **Redis** is particularly well-suited for token blacklisting token during logout due to its speed, simplicity, and built-in expiration features. Redis is designed for low-latency operations because it stores data in memory. This makes it significantly faster than traditional disk-based databases like MongoDB or SQL.
- created redis db using upstash