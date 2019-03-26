export const config: {
  url: string;
  gaCode: string;
  githubUrl: string;
  facebookPageUrl: string;
  twitterCardType: string;
  twitterAccount: string;
  instagramAccount: string;
} = {
  url: process.env.NODE_ENV === 'production' ? 'https://cyclecoffee.com' : 'http://example.com:3030',
  gaCode: process.env.GOOGLE_ANALYTICS_CODE,
  githubUrl: 'https://github.com/khirayama/cyclecoffee',
  facebookPageUrl: 'https://www.facebook.com/cyclecoffee/',
  twitterCardType: 'summary',
  twitterAccount: '@cyclecoffee',
  instagramAccount: 'cyclecoffee',
};
