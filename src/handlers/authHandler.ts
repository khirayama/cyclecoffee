import * as express from 'express';
import * as firebaseAdmin from 'firebase-admin';

export function authHandler(req: express.Request, res: express.Response, next: express.Next): void {
  const sessionCookie: string = req.cookies.session || '';
  firebaseAdmin
    .auth()
    // TODO: It's too slow. I should make sure that it is ok to set false.
    // .verifySessionCookie(sessionCookie, true)
    .verifySessionCookie(sessionCookie, false)
    .then((decodedClaims: firebaseAdmin.auth.DecodedIdToken) => {
      req.uid = decodedClaims.uid;
      next();
    })
    .catch((error: Error) => {
      res.redirect('/');
    });
}
