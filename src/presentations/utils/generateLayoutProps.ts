import { config } from 'config';
import { dic } from 'dic';

export interface ILayoutProps {
  env: string;
  gaCode: string;
  title: string;
  description: string;
  author: string;
  baseUrl: string;
  url: string;
  path: string;
  name: string;
  keywords: string;
  image: string;
  facebookPageUrl: string;
  twitterCardType: string;
  twitterAccount: string;
  pageType: string;
  children: string;
  state: any; // tslint:disable-line:no-any
  scripts: string[];
  stylesheets: string[];
}

export function generateLayoutProps(): ILayoutProps {
  return {
    env: process.env.NODE_ENV || 'development',
    gaCode: config.gaCode,
    author: dic.t('author'),
    name: dic.t('name'),
    baseUrl: config.url,
    url: config.url,
    facebookPageUrl: config.facebookPageUrl,
    twitterCardType: config.twitterCardType,
    twitterAccount: config.twitterAccount,
    pageType: 'cafe',
    path: '',
    // content meta
    title: '',
    description: '',
    keywords: '',
    image: '',
    children: '',
    state: {},
    scripts: [],
    stylesheets: [],
  };
}
