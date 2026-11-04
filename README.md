# YU DESIGN — 公式サイト

> Design that moves business forward.
> 個人のお店に、ちゃんとしたホームページを。

個人経営のお店・個人事業主向けホームページ制作・管理サービス「YU DESIGN」の公式サイトです。
HTML / CSS / Vanilla JavaScript のみで作られた静的サイトで、GitHub Pages でそのまま公開できます。

---

## ディレクトリ構成

```
yu-creative-studio/
├── index.html            … 1ページ構成のサイト本体
├── css/style.css         … すべてのスタイル（デザイントークンは :root に集約）
├── js/
│   ├── config.js         … LINE URL・制作実績URLの設定ファイル ← 公開前にここを編集
│   └── main.js           … ナビ、スクロール演出、LINEリンク制御など
├── images/
│   ├── hero/             … HEROの背景（石の台座）と架空ブランド LUMIÈRE の商品写真
│   ├── works/            … 制作実績のスクリーンショット（各 1440px / 800px）
│   ├── service/          … SERVICE カード画像
│   └── common/           … CONCEPT・CONTACT 背景、OGP画像
├── assets/
│   ├── favicon.svg
│   └── apple-touch-icon.png
├── robots.txt
├── sitemap.xml
├── .nojekyll
└── README.md
```

画像はすべて本サイト用に新規制作したオリジナル素材（3Dレンダリング）と、自社制作実績のスクリーンショットです。
HEROの「LUMIÈRE」は制作例として作った架空ブランドで、実在の顧客ではありません。

---

## 公開前に必ず設定すること

### 1. LINE公式アカウントのURL

`js/config.js` を開き、`lineUrl` を書き換えます。

```js
window.SITE_CONFIG = {
  lineUrl: "https://lin.ee/xxxxxxx",   // ← LINE公式アカウントの友だち追加URL
  ...
};
```

- `"YOUR_LINE_URL"` のまま（または空欄）の間は、すべてのLINEボタンがリンクなしの「準備中」状態になり、ダミーのリンク先へは遷移しません。
- URLを設定すると、ヘッダー・HERO・料金・CONTACT・スマホ下部固定ボタンなど、すべてのLINEボタンに自動で反映されます。

### 2. 制作実績のリンク

同じく `js/config.js` の `works` に、**公開を確認できたURLだけ**を設定します。
`null` の作品は、リンクなし（画像とテキストのみ）で表示されます。

```js
works: {
  moranbon: "https://yu-creative-studio.github.io/moranbon/",
  rezard: null,
  kohi: null,
  botanica: null
}
```

### 3. サイトのURL（OGP・canonical・sitemap）

公開URLが `https://yu-creative-studio.github.io/` 以外になる場合は、次の箇所を実際のURLに置き換えてください。

- `index.html` … `<link rel="canonical">`、`og:url`、`og:image`、構造化データの `url`
- `sitemap.xml` … `<loc>`
- `robots.txt` … `Sitemap:`

---

## GitHub Pages への公開手順

### A. ユーザー/組織サイトとして公開する（推奨・URLが短い）

公開URL：`https://yu-creative-studio.github.io/`

1. GitHub に `yu-creative-studio` アカウント（または組織）でログインします。
2. 右上の「＋」→「New repository」で、リポジトリ名を **`yu-creative-studio.github.io`** として作成します（Public）。
3. このフォルダの中身をリポジトリのルートに置いて push します。

   ```bash
   cd yu-creative-studio
   git init
   git add .
   git commit -m "Launch official website"
   git branch -M main
   git remote add origin https://github.com/yu-creative-studio/yu-creative-studio.github.io.git
   git push -u origin main
   ```

4. リポジトリの **Settings → Pages** を開きます。
5. 「Build and deployment」の **Source** を「Deploy from a branch」、**Branch** を `main` / `/(root)` にして **Save**。
6. 1〜3分ほどで `https://yu-creative-studio.github.io/` に公開されます（Pagesの画面上部にURLが表示されます）。

> 既存の作品サイト（例：`/moranbon/`）は別リポジトリのまま残せます。
> `yu-creative-studio.github.io/moranbon/` のURLはそのまま有効です。

### B. プロジェクトサイトとして公開する

公開URL：`https://yu-creative-studio.github.io/yu-creative-studio/`

1. 任意の名前（例：`yu-creative-studio`）でリポジトリを作成し、上と同じ手順で push します。
2. Settings → Pages で同じように `main` / `/(root)` を指定します。
3. サイト内のパスはすべて相対パスなので、そのまま動作します。
   OGP・canonical・sitemap のURLだけ、上記「3. サイトのURL」に従って書き換えてください。

### 独自ドメインを使う場合

1. Settings → Pages の **Custom domain** にドメイン（例：`www.example.com`）を入力して保存します（`CNAME` ファイルが自動で作成されます）。
2. ドメイン管理会社のDNS設定で、`www` を `yu-creative-studio.github.io` に向けた **CNAME** レコードを追加します。
   ルートドメイン（`example.com`）の場合は、GitHub公式ドキュメントに記載のIPアドレスへ **A** レコードを設定します。
3. DNSが反映されたら **Enforce HTTPS** にチェックを入れます。
4. OGP・canonical・sitemap・robots のURLを独自ドメインに書き換えます。

### 更新するとき

ファイルを編集して commit / push するだけで、数分後に自動で反映されます。

```bash
git add .
git commit -m "Update price"
git push
```

---

## 公開後のチェックリスト

- [ ] LINEボタン（ヘッダー／HERO／料金／CONTACT／スマホ下部）が正しい友だち追加ページを開く
- [ ] WORKS のリンクが正しい作品サイトを開く
- [ ] スマートフォン実機で表示・メニュー開閉・横スクロールがないことを確認
- [ ] SNSでURLをシェアしたとき、OGP画像とタイトルが表示される
- [ ] Google Search Console にサイトを登録し、`sitemap.xml` を送信

---

## 編集のヒント

| 変更したいもの | 場所 |
| --- | --- |
| 色・余白・フォント | `css/style.css` の `:root` |
| 文章 | `index.html`（セクションごとにコメントで区切っています） |
| 料金 | `index.html` の `<!-- PRICE -->` |
| 制作実績の画像 | `images/works/` の同名ファイルを差し替え（16:10、1440×900 / 800×500 推奨、WebP） |
| LINE URL・実績URL | `js/config.js` |

- アニメーションはOSの「視差効果を減らす（prefers-reduced-motion）」設定に従って自動でオフになります。
- フォントは Google Fonts（Cormorant Garamond / Inter / Noto Sans JP / Noto Serif JP）を読み込んでいます。


## v2 構成（フルリノベーション）
- `index.html` … 全セクション（Hero / About / Services / Works / Compare / Price / Flow / FAQ / Contact）
- `css/style.css` … 全スタイル（PC・スマホ別最適化）
- `js/config.js` … LINE URL・作品URLの設定（ここだけ編集すればOK）
- `js/hero-gl.js` … WebGLヒーロー（3枚スライド＋揺れる葉の影＋ノイズ遷移）。WebGL非対応時は静止画に自動フォールバック
- `js/main.js` … ローダー、カーソル、マグネットボタン、分割テキスト、3Dカバーフロー、FAQ、スクロール演出
- `images/hero/slide-1〜2.webp` … ヒーロー画像（写真を追加するときは data-slides と .hero__index の li、main.js の CAPS を1つずつ増やす）。差し替える場合は index.html の `data-slides` の src と注目点(fx, fy)を編集
- `prefers-reduced-motion` 設定の端末ではアニメーションを抑制します
