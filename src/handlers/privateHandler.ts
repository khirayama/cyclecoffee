import * as express from 'express';
import * as admin from 'firebase-admin';
import * as React from 'react';
import { renderToString } from 'react-dom/server';

import { SampleComponent } from 'presentations/components/SampleComponent';
import { IAction, IState } from 'presentations/pages/home/interfaces';
import { reducer } from 'presentations/pages/home/reducer';
import { generateLayoutProps, ILayoutProps } from 'presentations/utils/generateLayoutProps';
import { Provider } from 'utils/Container';
import { Store } from 'utils/Store';

const FIREBASE_PROJECT_ID: string = process.env.FIREBASE_PROJECT_ID;
const FIREBASE_API_KEY: string = process.env.FIREBASE_API_KEY;

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: FIREBASE_PROJECT_ID,
    clientEmail: `foo@${FIREBASE_PROJECT_ID}.iam.gserviceaccount.com`,
    privateKey:
      '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDMVklJdtHncA1m\nMxgGvYWCJ0AhRru5XwP9AXk07u2JbdTGxJRcJqiOKTGYzbOYFsN5Kc4be/9JT/uy\naq71nSiReJYCD01G0tiLGfo6IMUGuTdeL+X32sFwZ5OnG55xUyDkCIir6g3w++bB\nZlY2pgqPgUlzuCKxFJU8MlaejDtBjqjkc+sg2OsJhNM0OcKn8y20ofEYSuVzGXP/\n0N2Hhr8treII7cPM6P+2du6L/uePaR9egtYaDzu3XVXObiXMx/dzhU122AHvsfZH\njdIbRmMDcybicubTwe+1q7SaCMiGhevivMc6A48gl88KsGn9FfInYG/u/ggPM76W\nyVE5ny5/AgMBAAECggEAK/vq3JhqCHJzP+uBoXnMMj72q/MI15cfSae2inFfyjRN\nF9gaw1dC8w7k8SpeHT/RJdSc3Aet5P8Fg9s4+/+vStj1GU5n6PXbzN1zom2JW7Ak\nve57hwWcm/B/tPnZ+jTVoKBBoxfHlnbyrfC0YCEPpuJCiFk7hniSwxlm0cwHuU10\nfprGhkuFwZiSz/J+TdvmxmZGIAfWQNZL5hjRQXqQBv4kWfZobNYPzdTRH/36hZZE\nMSndo+ctItJZLyIcX9yWgp/f5ij+QKNxivztGTT9G6HRKMrlXba3Ixw4MwCU+LWl\nGU90J37204zOs1dJ9eUVFADjB6zrvNlhH0l3ROKmyQKBgQDthhPkMco5kcI5+jY5\nB9kbeu/V3Gbbfv50euA976Kyzi/zB0r9xPC3oLvi4IsOPI/O6PLSbi1ZW9aSjHY5\nCjSXwspxx8Mgv2daKxu31cqJyaWLF9OFJlYsVHSbK3hensNzDOZoh23wa/nlwure\n99Gar3v66ZjPTsZM3NtCDShWPQKBgQDcO1ixfxI/xktiJBYwLB7Zum4HAzyJZ+2L\nbPkOLQa8etF564A27/0iJDNhF1pTK6xePj/YKLgSoO4S136aUZMq3Es+laQygxoQ\nMJSUlHVBZYVL5bJqNq77gvr4/8fRKBRkIV+W2Gs5ABQru2eXKFgooRrcfDRvXDex\ne5o1v3TfawKBgGVzVxuoiI9+Sk8pJ+/EAl9Saw4VTXmDDHwD37OUnxFwL9rFyqoJ\nbCeCZ73H2p0CEQp3RP/MP2Jjb4q4o+ZJDZ2kfYOLpzRdjG9e6j/i+NdRYXu/eYDt\nlvDoQcXlE0yW0zRY1jDfZ33BIMOaNWd2wfgn6/SHwdUJ+Hjr/FqB9DChAoGBAM01\n83g5Cr0oPZfuPkqW4gxJfjrElkUG9T6kxRGjfRJlcwmjGm6Wgw2sI8AFraGwIUYT\nxRPbJWIeWJhv+kU7W+FlMivX7g8vQDrzuY8VIolUWreVCgGUgMpVixw34m4PZajD\nvDln4clUPHdfgbBE5Ji/PbNTfNyDVlXn8ZLBmtqPAoGAB2ENiSlGYsIoxvVLq3Kr\nbdcwPvJHzKpBZPB3TWmdQr6aDCMpv6+C8dfGC44tKhtE6TA+0dK5uDZ82ECeRJps\noIWGwqEw3aGVEuLGZfYlTufOmpYqYeWdsFPYWBeJ6YTSPjWuPsQdVwKD+dwtsq6v\nVoXQWDoOQIvxxLqEFhMomUI=\n-----END PRIVATE KEY-----\n',
  }),
  databaseURL: `https://${FIREBASE_PROJECT_ID}.firebaseio.com`,
});

export function authHandler(req: express.Request, res: express.Response, next: express.Next): void {
  const idToken: string = req.cookies.idToken;
  // admin.auth().verifySessionCookie();

  if (idToken) {
    admin
      .auth()
      .verifyIdToken(idToken)
      .then(() => {
        next();
      })
      .catch(() => {
        res.redirect('/');
      });
  } else {
    res.redirect('/');
  }
}

export function privateHandler(req: express.Request, res: express.Response): void {
  const initialState: IState = {
    count: 0,
  };
  const store: Store<IState, IAction> = new Store(initialState, reducer);

  const props: ILayoutProps = generateLayoutProps();
  props.path = req.originalUrl;
  props.title = 'Title';
  props.description = 'Description';
  props.keywords = ['coffee', 'コーヒー', '珈琲', 'カフェ', 'cafe', 'うち'];
  props.image = 'TODO';
  props.scripts = ['/pages/private/bundle.js'];
  props.stylesheets = ['/pages/private/index.css'];
  props.children = renderToString(React.createElement(Provider, { store }, React.createElement(SampleComponent)));

  res.send(req.compiledFunction({ props }));
}
