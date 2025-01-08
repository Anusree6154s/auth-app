// types/express.d.ts
import { IncomingMessage } from 'http';

declare global {
  namespace Express {
    interface Request {
      client?: IncomingMessage['client']; // Extending the Request interface to include 'client'
    }
  }
}
