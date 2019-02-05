users[]:
  [uid]:
    name:
    birthday:
    zip_code:
    address:

user_subscriptions[]:
  [uid]:
    current_plan: [plan_key]
    next_plan: [plan_key]
    trail: [until_at]
// 翌月1日に切り替える
// 毎月1日支払い

user_orders[]:
  [uid]:
    is_next_order_skip:
    orders[]:
      [order_id]: [timestamp]

plans[]:
  [plan_key]:
    name:
    price:
    number_of_shipping:
    number_of_pack:
    amount_of_a_pack:
// price は税込
// shipping は基本的に月2回
// 1pack = 100g

orders[]:
  [order_id]:
    uid: [uid]
    coffee_beans[]:
      [coffee_bean_id]: true
    destination:
    shipping_at:

coffee_beans[]:
  [coffee_bean_id]:
    name:
    description:
    shop: [shop_id]
    is_active:
    fallback_coffee_bean: [coffee_bean_id]
// is_active は在庫状況などによる注文受付中か
// fallback_coffee_bean は is_active が false の時に代用する豆

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
