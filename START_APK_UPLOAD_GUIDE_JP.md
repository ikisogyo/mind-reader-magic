# APKビルド開始（Windows）

1. Git for Windows をインストール: https://git-scm.com/download/win
2. GitHub CLI をインストール: https://cli.github.com/
3. このフォルダ内の `START_APK_UPLOAD.bat` をダブルクリック。
4. 初回はGitHub CLIの認証画面に従う。
5. リポジトリ名を入力（既定: `mind-reader-magic`）。このスクリプトはPrivateリポジトリを作成してソースをpushします。
6. GitHubのリポジトリ → Actions で `Android debug APK` の実行を確認。
7. 成功した実行のArtifactsから `mindmagic-debug-apk` をダウンロード。


APKはGitHub Actionsが成功した場合に生成されます。成功前にAPKがあるとは扱いません。
