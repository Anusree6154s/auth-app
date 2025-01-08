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