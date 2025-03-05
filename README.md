## やったこと
- Next.js15のserverActionsとReact19で導入されるhookを使ったSNSアプリ

## 使ったサービス、ライブラリ等
- Next.js
- React
- Prisma（ORM）
- Supabase（BaaS）
- Clark（認証系サービス）
- ngrok（ローカルの開発サーバーを公開するサービスで、Clerkのwebhookを利用するために必要だった）
- Tailwind CSS

## 実装後

https://github.com/user-attachments/assets/141180fb-9185-4f31-acf3-8fa83cfe242f

## 所感
- useOptimisticによる楽観的UI更新が気持ちい
- サーバーアクションをformのアクション属性に渡す際、コンポーネントのファイルに直接関数を定義するべきか、別ファイルに関数を定義して呼び出して使うべきかは不明（個人的には後者の方がコードの見やすさの観点で好き）
- Clerkがかなり優秀で、Clerkが提供するコンポーネントを利用することでサインアップ、ログインのフォームやプロフィールのUIを簡単に利用できる

<kbd><img width="465" alt="スクリーンショット 2025-03-05 18 27 05" src="https://github.com/user-attachments/assets/ff6ea6bf-c800-4a65-a9fe-51ae21d46c18" /></kbd>

<kbd><img width="1163" alt="スクリーンショット 2025-03-05 18 27 16" src="https://github.com/user-attachments/assets/ebfcb2b1-5425-4bd6-a954-98b9daf1b06e" /></kbd>

<kbd><img width="470" alt="スクリーンショット 2025-03-05 18 27 59" src="https://github.com/user-attachments/assets/85dab121-dc5d-42a1-af7e-f616927108f2" /></kbd>
