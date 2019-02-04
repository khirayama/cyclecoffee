match /users/{uid} {
  allow read, write: if request.auth.uid == uid;
}
users[]:
  [uid]:
    name:
    birthday:
    zip_code:
    address:

match /user_status/{uid} {
  allow read: if request.auth.uid == uid;
}
user_status[]:
  [uid]:
    current_plan: [plan_key]
    trail: [until_at]

match /user_status/{uid} {
  allow read, write: if request.auth.uid == uid;
}
user_next_status[]:
  [uid]:
    plan: [plan_key]
    is_next_order_skip:

match /user_orders/{uid} {
  allow read: if request.auth.uid == uid;
}
user_orders[]:
  [uid]:
    [order_id]: [timestamp]

match /plans {
  allow read: if true;
}
plans[]:
  [plan_key]:
    name:
    price: // 税込
    number_of_shipping:
    number_of_pack:
    amount_of_a_pack:

match /orders {
  allow read: if request.auth.uid == resource.data.uid;
}
orders[]:
  [order_id]:
    uid: [uid]
    coffee_beans[]:
      [coffee_bean_id]: true
    destination:
    shipping_at:

match /coffee_beans {
  allow read: if true;
}
coffee_beans[]:
  [coffee_bean_id]:
    name:
    description:
    shop: [shop_id]
    is_active: // 在庫状況などによる注文受付中か
    fallback_coffee_bean: [coffee_bean_id]

match /shops {
  allow read: if true;
}
shops[]:
  [shop_id]:
    name:
    logo_url:
    address:
    lat:
    lng:
    email:
    tel:
    web:
    ec:
    facebook:
    twitter:
    instagram:
    google_maps:
    coffee_beans[]:
      [coffee_bean_id]: true

## 仮データ

// 送り状: https://www.google.com/search?q=%E3%82%AF%E3%83%AA%E3%83%83%E3%82%AF%E3%83%9D%E3%82%B9%E3%83%88+%E9%80%81%E3%82%8A%E7%8A%B6&source=lnms&tbm=isch&sa=X&ved=0ahUKEwiz0emwgKPgAhWCad4KHbLPC80Q_AUIDigB&biw=1440&bih=798#imgrc=OPwrnezmn0NhxM:
// users
{
  name: 'Kotaro Hirayama',
  birthday: '2019-02-06',
  zip_code: '1234567'
  address: '東京都千代田区丸ノ内1',
  subscription: {
    current_plan: 'standard',
    next_plan: 'standard',
    trail: null,
  },
  orders: ['order_1_id', 'order_2_id'],
  is_next_order_skip: false,
}

// plans
{
  name: 'スタンダード',
  price: 1980,
  number_of_shipping: 2,
  number_of_pack: 1,
  amount_of_a_pack: 100,
}

// orders
{
  coffee_beans: [
    'gohobi_key', // lengthとpack数が一致しなかったら単品2つとか
  ],
  destination: '東京都千代田区丸ノ内1',
  shipping_at: '2019-02-06',
}

// coffee_beans
{
  name: 'ごほうびブレンド',
  description: '日常のごほうびに。',
  shop_id: 'saredo_coffee_id',
  bean_photo_url: '',
  is_active: true,
  fallback_coffee_bean: 'horoniga_key',
}

// shops
{
  name: 'Saredo Coffee',
  logo_url: 'https://static.wixstatic.com/media/46f3bc_92060ada9098488bad9732b3687a86a5~mv2.png/v1/fill/w_794,h_566,al_c,q_85,usm_0.66_1.00_0.01/26142830_1468543073244742_1185751502_o%20(.webp',
  address: '福岡県福岡市中央区六本松3丁目11-33-101',
  lat: 33.5794,
  lng: 130.381028,
  email: null,
  tel: '0927911313',
  web: 'https://www.saredocoffee.com/',
  ec: 'https://www.saredocoffee.com/shop',
  facebook: 'https://www.facebook.com/SaredoCoffee/',
  instagram: 'https://www.instagram.com/saredocoffee/',
  google_maps: 'https://goo.gl/maps/jfZhdSXprhn",
  coffee_beans: ['gohobi_key', 'horoniga_key'],
}

## メモ

- 固定回数の配送にしないと死にそう
- next_planに関しては暗黙的に月間切り替え
- packは暗黙的に1パック100g
- 初月は無料でいんじゃない？その分、日付はどうしようかな
  - 曜日ベースの方がうれしいよなぁ
  - 曜日ベース: 第1、第3木曜に発送とか
    - 最大で間隔が3週間空いてしまう(21日)
  - 日付ベース: 毎月1日、15日発送とか
    - 最大でも16日しか間が開かない
    - 年末年始とか関係なくなる
- チラシというかお手紙みたいなのは入れたいな
  - 初回挨拶
  - ロードマップ
- orderは毎月バッチで処理する
  - 確定日の告知
  - is_next_order_skipをfalseに戻す
- coffee_bean.is_activeがfalseの時は、fallback_coffee_beanを再帰的に当てる
- coffee_bean.is_activeは月初に確定
- ってみると日付ベース配送がバランスいいか

## 想定TODO

- 01日 1st 配送開始
- 10日 2nd オーダー確定 / 次回のcoffee_bean.is_active確定
- 15日 2nd 配送開始
- 24日 1nd オーダー確定 / 次回のcoffee_bean.is_active確定

## Firestoreルール

Ref: https://firebase.google.com/docs/firestore/security/secure-data?hl=ja

service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid} {
      allow read, write: if request.auth.uid == uid;
    }
  }
}
