Azure Functions (Node.js) + Playwright で Web ページのスクリーンショット生成

## ポイント

* Azure Portal で "Linux" の Azure Functions を作成
* VS Code からデプロイする前に
    * 環境変数 PLAYWRIGHT_BROWSERS_PATH 値 0 を追加
    * VS Code の設定から Azure Functions: SCM Do build During Deployment をチェック
* .vscode/settings.json
    * "azureFunctions.scmDoBuildDuringDeployment": true 追加
    * postDeployTask, preDeployTask は不要（削除）
* .funcignore に node_modules を追加（アップロード不要）
* 日本語フォントの追加
    * postinstall.sh を追加
    * package.json に "postinstall": "sh ./postinstall.sh", 追加
    * postinstall で /home/site/wwwroot/fonts にフォントをダウンロードし、関数初回実行時に /home/.fonts へリンク。フォントキャッシュクリア

## 参考

* [Running headless Chromium in Azure Functions with Puppeteer and Playwright](https://anthonychu.ca/post/azure-functions-headless-chromium-puppeteer-playwright/)
* [javascript \- Running Playwright in Azure Function \- Stack Overflow](https://stackoverflow.com/questions/63949978/running-playwright-in-azure-function)
* [Chrome headless doesn't work on Azure Functions on Linux · Issue \#4883 · Azure/azure\-functions\-host](https://github.com/Azure/azure-functions-host/issues/4883)
    * [azure\-functions\-puppeteer\-node\-cjkfont/postinstall\.sh at master · horihiro/azure\-functions\-puppeteer\-node\-cjkfont](https://github.com/horihiro/azure-functions-puppeteer-node-cjkfont/blob/master/postinstall.sh#L5)
    * [azure\-functions\-puppeteer\-node\-cjkfont/index\.ts at master · horihiro/azure\-functions\-puppeteer\-node\-cjkfont](https://github.com/horihiro/azure-functions-puppeteer-node-cjkfont/blob/master/url2png/index.ts#L18)
* [AzureFunctions \+ puppeteer でPDF出力 \- Qiita](https://qiita.com/noriyuki-matsumoto/items/ad2da968efd237810372)
* [Azure Functions \(Linux\) で Puppeteer が使えるようになってた \- ほりひログ](https://uncaughtexception.hatenablog.com/entry/2020/08/30/091852)

