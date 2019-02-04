import * as express from 'express';
import * as firebaseAdmin from 'firebase-admin';

export function createSessionHandler(req: express.Request, res: express.Response): void {
  const idToken: string = req.body.idToken;
  const expiresIn: number = 60 * 60 * 24 * 7 * 2 * 1000;
  firebaseAdmin
    .auth()
    .createSessionCookie(idToken, { expiresIn })
    .then((sessionCookie: string) => {
      res
        .cookie('session', sessionCookie, {
          maxAge: expiresIn,
          httpOnly: true,
          // TODO: It's works under https only. Please use it on production.
          // secure: true,
        })
        .json({ status: 'success' });
    });
}
