import { config } from 'config';
import { Dictionary, IDic, IDicTree } from 'utils/Dictionary';

const name: IDic = {
  ja: 'cycle coffee',
};

const dictionary: IDicTree = {
  name,
  author: {
    ja: name.ja,
  },
  pages: {
    home: {
      title: {
        ja: `${name.ja} | コーヒー定期便 | ポストで受け取り、ゆったりおウチで`,
      },
      description: {
        ja: '月に2回、自信を持ってお勧めできるコーヒー豆をお届けします。',
      },
      keywords: {
        ja: ['coffee', 'コーヒー', '珈琲', 'カフェ', 'cafe', 'うち', '定期便', 'サブスクリプション'].join(','),
      },
      image: {
        ja: 'TODO',
      },
    },
  },
  components: {
    HomePage: {
      Header: {
        Content: {
          signin: {
            ja: 'サインイン',
          },
          signup: {
            ja: 'サインアップ',
          },
        },
      },
      Navigation: {
        service: {
          ja: 'サービス',
        },
        coffee_beans: {
          ja: 'コーヒー豆',
        },
      },
    },
  },
};

export const dic: Dictionary = new Dictionary(dictionary, {
  defaultLang: 'ja',
});
