import { config } from 'config';
import { Dictionary, IDic, IDicTree } from 'utils/Dictionary';

const name: IDic = {
  ja: 'min. coffee',
};

const componentDictionary: IDicTree = {
  ImageForm: {
    URL: {
      label: {
        ja: 'URL',
      },
      placeholder: {
        ja: '/images/sample.png',
      },
    },
    caption: {
      label: {
        ja: 'キャプション',
      },
      placeholder: {
        ja: 'キャプション文章',
      },
    },
  },
  MakerForm: {
    name: {
      label: {
        ja: '名前',
      },
      placeholder: {
        ja: 'メーカー株式会社',
      },
    },
    description: {
      label: {
        ja: '説明文',
      },
      placeholder: {
        ja: '説明文',
      },
    },
    URL: {
      label: {
        ja: 'URL',
      },
      placeholder: {
        ja: 'https://maker.com',
      },
    },
  },
  ProductEditForm: {
    PRODUCT: {
      ja: '商品情報',
    },
    MAKER: {
      ja: '製造会社・メーカー',
    },
    PRODUCTLINE: {
      ja: '商品ラインナップ',
    },
    addProductLinkButton: {
      ja: 'アフィリエイトリンクを追加',
    },
    addProductVariationButton: {
      ja: 'バリエーション情報を追加',
    },
    addProductImageButton: {
      ja: '商品画像を追加',
    },
  },
  ProductForm: {
    name: {
      label: {
        ja: '名前',
      },
      placeholder: {
        ja: 'Good Dripper',
      },
    },
    description: {
      label: {
        ja: '説明文',
      },
      placeholder: {
        ja: '説明文',
      },
    },
  },
  ProductLineForm: {
    name: {
      label: {
        ja: '名前',
      },
      placeholder: {
        ja: 'Good Product Series',
      },
    },
    description: {
      label: {
        ja: '説明文',
      },
      placeholder: {
        ja: '説明文',
      },
    },
    URL: {
      label: {
        ja: 'URL',
      },
      placeholder: {
        ja: 'https://maker.com/productline',
      },
    },
  },
  ProductLinkForm: {
    text: {
      label: {
        ja: 'リンクテキスト',
      },
      placeholder: {
        ja: 'Amazonで購入',
      },
    },
    URL: {
      label: {
        ja: 'URL',
      },
      placeholder: {
        ja: 'https://amazon.co.jp/product',
      },
    },
  },
  ProductVariationForm: {
    name: {
      label: {
        ja: 'バリエーション名',
      },
      placeholder: {
        ja: 'グレー',
      },
    },
    value: {
      label: {
        ja: 'Hex値(色)',
      },
      placeholder: {
        ja: '#aaa or aaa',
      },
    },
  },
};

const pageDictionary: IDicTree = {
  Privacy: {
    PRIVACY: {
      ja: 'プライバーポリシー',
    },
    description: {
      ja: 'プライバーポリシー',
    },
  },
  Sitemap: {
    SITEMAP: {
      ja: 'サイトマップ',
    },
    description: {
      ja: `${name.ja}のサイトマップ`,
    },
  },
};

const dictionary: IDicTree = {
  name,
  author: {
    ja: name.ja,
  },
  siteDescription: {
    ja: 'おウチカフェ計画',
  },
  Components: componentDictionary,
  Pages: pageDictionary,
};

export const dic: Dictionary = new Dictionary(dictionary, {
  defaultLang: 'ja',
});
