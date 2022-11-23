# map-front

都道府県別の総人口推移グラフを表示する SPA

## 環境構築

[wiki](https://github.com/yama-t/map-front/wiki)に記載。

## 作業開始

VSCode の拡張機能「Dev Containers」を使用します。

### 1. Docker を起動する

デスクトップの Docker を起動します。

### 2. VSCode で Dev Containers を起動する

VSCode を起動後、左下の緑色の部分をクリック。

![vscode_remote_container](https://user-images.githubusercontent.com/7401408/203480962-ab1b9813-e7c7-4e64-b9cb-c2db9544a15f.png)

Open Folder in Container を選択し、クローンしたプロジェクトのフォルダーを選択する。
![open_folder](https://user-images.githubusercontent.com/7401408/203481540-cbea78eb-b126-4c24-b1a5-a16df4e08e38.png)

### 3. コンテナ起動

自動でコンテナが起動後、下記の処理も行われます。

- 開発サーバーの起動
- ブラウザでの表示

### 備考

一度、VSCode で Dev Containers を利用すると、「作業の開始」タブに「（フォルダ名）[Dev Container]」の履歴が残る。
次からはそこをクリックして開始することも可能。

![start](https://user-images.githubusercontent.com/7401408/203496907-d9b07157-1810-4b8c-a49a-de4afc0b9867.png)

## コンテナの再起動

VSCode 左下の緑色の部分をクリックし、「Rebuild Container」を選択する。

## 切断

VSCode 左下の緑色の部分をクリックし、「リモート接続を終了」を選択する。

## コマンド

### 開発サーバーの起動

```
yarn dev
```
