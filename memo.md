今日やること：

- [x] ログイン後に認証済みにする
  - 問題点
    - ログイン前に認証済みになっている
  - 解決策
    - ログイン後に認証済みにする
    - ログイン後 token を補完する
  - TODO
    - アクション名 LOGIN を OAUTH に変更
    - アクション名 STORE_JWT を削除
    - LOGIN アクションを作る
      - 認証ステータスの変更
      - JWT の保存
- [ ] article entity module を作成
- [ ] article entity controller を作成
- [ ] article service を作成
- [ ] article entity を作成
      TODO:
- [x] 記事投稿ページ作成（子コンポーネントも切り分ける）
- [x] トップページ作成（記事投稿ページへジャンプするリンクのみ）
- [x] ログイン時にトップページへレンダー
- [x] トークンをグローバルステートとして管理
- [x] ログイン時に jwt を持ってトップページへレンダー
- [ ] 課題クリア（STORE_JWT の名前を変更して、authenticated もそこで）
- [ ] article entity module を作成
- [ ] article entity controller を作成
- [ ] article service を作成
- [ ] article entity を作成
- [ ] 記事保存用のエンドポイント作成
- [ ] api: jwt をデコードして、データベースのユーザー情報と一致してるか検証する middleware を作成
  - Header を log する
  - authorization を log する
  - authorization の value を decode する（Bearer を外すかどうかの確認）
  - decode した後、payload が encode 前と同じ確認
- [ ] 作成した middleware を記事保存用のエンドポイントにひっつける

- [x] ユーザー情報をデータベースに保存する
- [x] JWT の使用を理解する
- [x] ユーザー情報を jwt 化する（id などをキーとしてエンコードする）

- [ ] html/css で layout を作る

registerNewUser 野中でエンコード

エンコードしたトークン nest 側に渡す

新しいエンドポイントを作って、もらったパスポートで承認する

jwt nest のドキュメント

axios middleware

axios jwt

authorization
authenticated のデフォルト値を決められる
