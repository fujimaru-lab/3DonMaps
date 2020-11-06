# 3DonMaps

Mapへの3D描画を試す

## harp.gl-example

harp.glを使用してMap上にi-Vinciのオブジェクトを描画
![i-Vinci in NewYork](./Pic/i-vinci-in-newyork2.gif)

### 手順

1. API Keyの取得  
    [Acquire Credentials](https://developer.here.com/tutorials/harpgl/#acquire-credentials)
2. API Keyの設定
    keyに1.で取得したAPI Keyを設定
    ```View.ts
    const dataSource = new VectorTileDataSource({
            authenticationCode: key
    });
    ```
3. 実行  
    npm start
4. URL - localhost:8080

## UsersyoshiDocuments01.CodingSpace00.Project3D_On_MapS

Google Maps PlatformのMaps JavaScript APIを利用して3DチックなオブジェクトをMap上に描画する

### 手順

1. API Keyの取得  
    [Getting started with Google Maps Platform](https://developers.google.com/maps/gmp-get-started?hl=ja)
2. API keyの設定  
    .envファイルのGOOGLE_MAPS_API_KEYに1.で取得したAPI Keyを設定する
3. 実行  
    ```sh
    npm i
    npm run dev  # development
    npm run build  # production
    ```
4. URL - localhost:8080