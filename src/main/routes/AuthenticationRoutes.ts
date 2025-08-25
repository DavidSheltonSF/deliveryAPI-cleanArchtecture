import { Request, Response, Router } from 'express';
import path from 'path';

export class AuthenticationRoutes {
  private static pathName = '/auth';

  static configureRoutes(router: Router) {
    router.get(
      this.pathName + '/reset-password',
      (req: Request, res: Response) => {
        res.sendFile(
          path.join(
            __dirname,
            '../../',
            'public',
            'index.html'
          ), {
            headers: {
              'Content-Type': 'text/html'
            }
          }
        );
      }
    );
  }
}
