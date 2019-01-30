## TODO

- [ ] アフィリエイトリンクを追加するフォーム
  - Amazon
  - 楽天
  - Yahoo
- [ ] variation formを更新
- [ ] 画像アップローダ
- [ ] 追加されたフォームを削除

## Data Structure

- posts
  - id
- post_contents
  - id
  - post_id
  - lang
  - body
  - title
  - description
  - keywords
  - image_url

- makers
  - id
- maker_contents
  - id
  - maker_id
  - name
  - description
  - url
- product_lines
  - id
- product_line_contents
  - id
  - product_line_id
  - lang
  - name
  - description
- lineups
  - id
  - product_id
  - product_line_id
- products
  - id
- product_contents
  - id
  - product_id
  - lang
  - name
  - description
  - link
- product_valiations
  - id
  - product_id
  - value
- product_valiation_contents
  - id
  - valiation_id
  - lang
  - name
- product_images
  - id
  - product_id
  - url
- product_image_captions
  - id
  - product_image_id
  - lang
  - caption

## Memo

- productは色やサイズもあるよね
- cycle coffeeもいいなぁ
- min coffeeかなぁ
- queue coffee
- meta coffee
- step coffee

- posts
  - [en / ja] body
  - [en / ja] title
  - [en / ja] description
  - [en / ja] keywords
  - [en / ja] image_url
- makers
  - [en / ja] name
  - [en / ja] description
  - [en / ja] url
- product_lines
  - [en / ja] name
  - [en / ja] description
  - [en / ja] url
- products
  - [en / ja] name
  - [en / ja] description
  - [en / ja] link
  - valiations
    - [en / ja] name
    - value
  - images
    - url
    - [en / ja] caption

ex)
ハリオの500ml/800mlサイズがあり、ステンレスと透明があるサーバ
- サイズ違いは一覧では別に出て欲しい
  - productは別
- けど、バリエーションはわかるようにして欲しい
  - 同じproductであるってのが必要？
- 色違いは一通り出て欲しい

- product_lines
  - ハリオのサーバ
  - product
    - ハリオのサーバ 500ml
      - 透明
      - ステンレス
      - 画像
    - ハリオのサーバ 800ml
      - 透明
      - ステンレス
      - 画像
