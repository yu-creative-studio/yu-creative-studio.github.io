/* =========================================================
   SHIZUKU tea & tapioca — menu.js
   商品・季節・店舗のデータと、その表示。
   メニューや価格を変えるときは、このファイルの SHIZUKU.data を書き換えます。
   ========================================================= */

window.SHIZUKU = window.SHIZUKU || {};

SHIZUKU.data = {

  /* ---------- 季節限定（今季） ---------- */
  seasonal: [
    {
      id: 'marron',
      name: '和栗モンブランミルクティー',
      en: 'Chestnut Mont Blanc Milk Tea',
      desc: 'やさしい栗の甘みと、香り高いミルクティー。和栗の風味を贅沢に楽しめる一杯。',
      long: 'やさしい栗の甘みと、香り高いミルクティー。和栗の風味を贅沢に楽しめる秋限定の一杯です。',
      price: 820, sweet: '50〜70%', ice: '普通', serve: 'アイスのみ',
      img: 'images/drink-marron.jpg'
    },
    {
      id: 'hojicha',
      name: 'ほうじ茶ラテ',
      en: 'Hojicha Latte',
      desc: '焙煎したほうじ茶の香ばしさと、まろやかなミルクのハーモニー。',
      long: '焙煎したほうじ茶の香ばしさと、まろやかなミルクのハーモニー。甘さ控えめでも満足感のある一杯です。',
      price: 720, sweet: '30〜50%', ice: '普通', serve: 'ホット・アイス',
      img: 'images/drink-hojicha.jpg'
    },
    {
      id: 'annoimo',
      name: '安納芋ミルクティー',
      en: 'Anno-imo Milk Tea',
      desc: '濃厚な安納芋の甘みが広がる、ほっとする味わい。',
      long: '濃厚な安納芋の甘みが広がる、ほっとする味わい。トップの焼き芋ペーストを崩しながらお楽しみください。',
      price: 780, sweet: '50%', ice: '少なめ', serve: 'ホット・アイス',
      img: 'images/drink-annoimo.jpg'
    }
  ],

  /* ---------- 季節のカレンダー（current: true の季節に「販売中」） ---------- */
  calendar: [
    { key: 'spring', ja: '春', months: '3〜5月', theme: '苺と桜',
      items: ['さくらミルクティー', '苺ミルク', '苺チーズティー'] },
    { key: 'summer', ja: '夏', months: '6〜8月', theme: '柑橘と抹茶',
      items: ['柑橘ジャスミンティー', '抹茶ミルクティー', 'レモンティー'] },
    { key: 'autumn', ja: '秋', months: '9〜11月', theme: '和栗とほうじ茶', current: true,
      items: ['和栗モンブランミルクティー', 'ほうじ茶ラテ', '安納芋ミルクティー'] },
    { key: 'winter', ja: '冬', months: '12〜2月', theme: '黒胡麻と生姜',
      items: ['黒胡麻ミルクティー', '生姜ミルクティー', 'ほうじ茶ジンジャー'] }
  ],

  /* ---------- 茶葉 ---------- */
  teas: [
    { name: 'アッサム', origin: 'インド', note: 'しっかりとしたコクと<br>やさしい甘み。', img: 'images/tea-assam.jpg' },
    { name: 'ジャスミン茶', origin: '中国・福建省', note: '華やかな香りが広がる、<br>上品な味わい。', img: 'images/tea-jasmine.jpg' },
    { name: '四季春烏龍茶', origin: '台湾', note: '爽やかで、花のような<br>香りが特徴。', img: 'images/tea-oolong.jpg' },
    { name: 'ほうじ茶', origin: '京都', note: '香ばしく、<br>すっきりとした後味。', img: 'images/tea-hojicha.jpg' }
  ],

  /* ---------- 定番メニュー ---------- */
  regular: {
    milk: [
      { name: 'SHIZUKUミルクティー', en: 'SHIZUKU Milk Tea', price: 580, rec: true, serve: 'ホット / アイス',
        desc: '紅茶のコクとミルクのまろやかさが調和した、当店の定番ミルクティー。', img: 'images/regular-shizuku.jpg' },
      { name: 'ジャスミンミルクティー', en: 'Jasmine Milk Tea', price: 580, serve: 'ホット / アイス',
        desc: '華やかなジャスミンの香りが広がる、すっきりとした味わい。', img: 'images/regular-jasmine-milk.jpg' },
      { name: 'ウーロンミルクティー', en: 'Oolong Milk Tea', price: 600, serve: 'ホット / アイス',
        desc: '香ばしく、すっきりとした後味のウーロン茶を使ったミルクティー。', img: 'images/regular-oolong-milk.jpg' },
      { name: '黒糖ミルクティー', en: 'Brown Sugar Milk Tea', price: 650, serve: 'ホット / アイス',
        desc: '沖縄県産の黒糖のコクと、ミルクのやさしい甘み。', img: 'images/regular-brown-sugar.jpg' }
    ],
    tea: [
      { name: 'ジャスミンティー', en: 'Jasmine Tea', price: 480, serve: 'ホット / アイス',
        desc: '華やかな香りが広がる、すっきりとした中国茶。', img: 'images/regular-jasmine.jpg' },
      { name: 'ウーロン茶', en: 'Oolong Tea', price: 480, serve: 'ホット / アイス',
        desc: '香ばしく、食事にもよく合うすっきりとした味わい。', img: 'images/regular-oolong.jpg' },
      { name: 'ほうじ茶', en: 'Hojicha Tea', price: 520, serve: 'ホット / アイス',
        desc: '焙煎の香ばしさが心地よい、やさしい余韻の日本茶。', img: 'images/regular-hojicha.jpg' },
      { name: '抹茶ティー', en: 'Matcha Tea', price: 580, serve: 'アイスのみ',
        desc: 'ほどよい苦みと旨みが広がる、上質な抹茶の一杯。', img: 'images/regular-matcha.jpg' }
    ]
  },

  topping: [
    { name: 'タピオカ', price: 100, img: 'images/topping-tapioca.jpg' },
    { name: '黒糖タピオカ', price: 120, img: 'images/topping-brown-sugar.jpg' },
    { name: 'チーズフォーム', price: 150, img: 'images/topping-cheese.jpg' },
    { name: 'ホイップクリーム', price: 150, img: 'images/topping-whip.jpg' }
  ],

  order: [
    { no: '01', ttl: 'ドリンクを選ぶ', icon: 'cup', lines: ['季節のおすすめや', '定番メニューから', 'お好きなドリンクを。'] },
    { no: '02', ttl: 'サイズを選ぶ', icon: 'cupdot', lines: ['M（レギュラー）', 'L（大きめ）+¥100'] },
    { no: '03', ttl: '甘さを選ぶ', icon: 'drop', lines: ['0%（なし）', '30%（控えめ）', '50%（ふつう）', '70%（やや甘め）', '100%（甘め）'], left: true },
    { no: '04', ttl: '氷を選ぶ', icon: 'cube', lines: ['なし', '少なめ', '普通', '多め'] }
  ],

  /* ---------- 混雑の目安（0〜5・架空店舗のサンプル値） ---------- */
  busy: {
    hours: [11, 12, 13, 14, 15, 16, 17, 18, 19],
    weekday: [1.2, 1.8, 2.4, 2.9, 3.4, 4.0, 4.0, 2.9, 2.1],
    weekend: [2.0, 3.0, 3.8, 4.6, 5.0, 4.8, 4.2, 3.2, 2.4]
  },

  /* ---------- よくある質問 ---------- */
  faq: [
    { q: 'タピオカの販売時間はいつですか？', a: 'タピオカは毎朝10時に炊き上げ、開店の11:00から閉店まで販売しています。3時間ごとに新しいものに入れ替えています。' },
    { q: 'ドリンクのカスタマイズはできますか？', a: 'すべてのドリンクで、甘さ（0〜100%）と氷の量（なし・少なめ・普通・多め）をお選びいただけます。トッピングの追加もできます。' },
    { q: 'アレルギーが心配なのですが、原材料は確認できますか？', a: '店頭に原材料の一覧をご用意しています。ご注文の前にスタッフへお声がけください。' },
    { q: '豆乳への変更はできますか？', a: 'ミルクを使用するドリンクは、豆乳に変更できます（+¥50）。' },
    { q: 'テイクアウトの予約はできますか？', a: '現在、予約や事前注文は承っていません。店頭でご注文ください。' },
    { q: '定休日はどこで確認できますか？', a: '定休日は不定休です。営業日はInstagramでお知らせしています。' }
  ]
};

/* =========================================================
   アイコン（細い線のSVG）
   ========================================================= */
SHIZUKU.icons = {
  tapioca: '<circle cx="8" cy="15" r="3.2"/><circle cx="15.6" cy="15" r="3.2"/><circle cx="11.8" cy="8.6" r="3.2"/>',
  leaf: '<path d="M5 19.5C5 11 10.5 5.5 19.5 4.5 18.5 13.5 13 19 5 19.5Z"/><path d="M5 19.5 14 10.5"/>',
  cup: '<path d="M6.5 8h11L16.4 20.5H7.6Z"/><path d="M5.5 8h13"/><path d="M8.2 8 9 4.5h6L15.8 8"/>',
  cupdot: '<path d="M6.5 8h11L16.4 20.5H7.6Z"/><path d="M5.5 8h13"/><path d="M8.2 8 9 4.5h6L15.8 8"/><circle cx="12" cy="14" r="1.3"/>',
  drop: '<path d="M12 4c3.2 4.2 5 7.2 5 9.6a5 5 0 0 1-10 0C7 11.2 8.8 8.2 12 4Z"/>',
  cube: '<path d="M12 3.5 19.5 7.7v8.6L12 20.5l-7.5-4.2V7.7Z"/><path d="M4.5 7.7 12 12l7.5-4.3M12 12v8.5"/>',
  train: '<rect x="6" y="3.5" width="12" height="13" rx="2.6"/><path d="M6 10.5h12M8.6 16.5 7 20.5M15.4 16.5l1.6 4M7.6 19h8.8"/><circle cx="9" cy="13.5" r=".7"/><circle cx="15" cy="13.5" r=".7"/>',
  insta: '<rect x="4" y="4" width="16" height="16" rx="4.6"/><circle cx="12" cy="12" r="3.7"/><circle cx="16.7" cy="7.3" r=".8" fill="currentColor" stroke="none"/>',
  pin: '<path d="M12 21s-6-5.6-6-10.5a6 6 0 0 1 12 0C18 15.4 12 21 12 21Z"/><circle cx="12" cy="10.5" r="2.2"/>'
};
SHIZUKU.icon = function (name, cls) {
  return '<svg class="ico' + (cls ? ' ' + cls : '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (SHIZUKU.icons[name] || '') + '</svg>';
};

/* =========================================================
   表示（ここから下は通常は編集不要）
   ========================================================= */
(function () {
  var D = SHIZUKU.data, I = SHIZUKU.icon;
  var yen = function (n) { return '¥' + n.toLocaleString('ja-JP'); };
  var $ = function (s) { return document.querySelector(s); };
  var each = function (s, fn) { Array.prototype.forEach.call(document.querySelectorAll(s), fn); };
  var chev = '<span class="chev" aria-hidden="true"></span>';

  /* 静的HTML内のアイコン */
  each('[data-icon]', function (el) { el.outerHTML = I(el.getAttribute('data-icon'), el.className); });

  /* HOME 秋のおすすめ */
  var home = $('#homeAutumn');
  if (home) {
    home.innerHTML = D.seasonal.map(function (it) {
      return '<li class="pcard">' +
        '<button type="button" class="pcard__media" data-detail="' + it.id + '" data-detail-src="' + it.id + '" aria-label="' + it.name + 'の詳細を見る">' +
          '<img src="' + it.img + '" alt="' + it.name + '" width="1120" height="1400" loading="lazy" decoding="async"></button>' +
        '<div class="pcard__body">' +
          '<h3 class="pcard__name">' + it.name + '</h3>' +
          '<p class="pcard__en">' + it.en + '</p>' +
          '<p class="pcard__desc">' + it.desc + '</p>' +
          '<p class="pcard__price">' + yen(it.price) + '</p>' +
        '</div></li>';
    }).join('');
  }

  /* MENU 秋のおすすめ（スマホではカルーセル） */
  var menuA = $('#menuAutumn');
  if (menuA) {
    menuA.innerHTML = D.seasonal.map(function (it) {
      return '<li class="mcard" id="item-' + it.id + '">' +
        '<button type="button" class="mcard__media" data-detail="' + it.id + '" data-detail-src="' + it.id + '" aria-label="' + it.name + 'の詳細を見る">' +
          '<img src="' + it.img + '" alt="' + it.name + '" width="1120" height="1400" loading="lazy" decoding="async"></button>' +
        '<h3 class="mcard__name">' + it.name + '</h3>' +
        '<p class="mcard__en">' + it.en + '</p>' +
        '<p class="mcard__desc">' + it.desc + '</p>' +
        '<p class="mcard__price">' + yen(it.price) + '</p>' +
        '<button type="button" class="btn btn--line mcard__btn" data-detail="' + it.id + '">詳しく見る' + chev + '</button>' +
      '</li>';
    }).join('');
    var dots = $('#menuAutumnDots');
    if (dots) dots.innerHTML = D.seasonal.map(function (it, i) { return '<span class="dots__dot' + (i ? '' : ' is-active') + '"></span>'; }).join('');
  }

  /* HOME 季節のカレンダー（PC：カード／スマホ：開閉する行） */
  var cal = $('#homeCalendar');
  if (cal) {
    cal.innerHTML = D.calendar.map(function (c, i) {
      return '<li class="cal cal--' + c.key + (c.current ? ' is-current' : '') + '">' +
        '<button type="button" class="cal__head" aria-expanded="false" aria-controls="cal-' + i + '">' +
          '<span class="cal__dot" aria-hidden="true"></span>' +
          '<span class="cal__top"><span class="cal__kanji">' + c.ja + '</span><span class="cal__months">' + c.months + '</span></span>' +
          '<span class="cal__theme">' + c.theme + (c.current ? '<span class="cal__now">（販売中）</span>' : '') + '</span>' +
          '<span class="cal__arrow" aria-hidden="true"></span>' +
        '</button>' +
        '<ul class="cal__items" id="cal-' + i + '">' + c.items.map(function (n) { return '<li>' + n + '</li>'; }).join('') + '</ul>' +
      '</li>';
    }).join('');
  }

  /* MENU 季節ごとに変わる限定メニュー（タイル） */
  var tiles = $('#menuSeasons');
  if (tiles) {
    tiles.innerHTML = D.calendar.map(function (c) {
      return '<li class="stile stile--' + c.key + (c.current ? ' is-current' : '') + '">' +
        '<span class="stile__img" aria-hidden="true"></span>' +
        '<span class="stile__kanji">' + c.ja + '</span>' +
        '<span class="stile__months">' + c.months + '</span>' +
        '<span class="stile__theme">' + c.theme + '</span>' +
        (c.current ? '<span class="stile__now">（販売中）</span>' : '') +
      '</li>';
    }).join('');
  }

  /* HOME 茶葉 */
  var teas = $('#homeTeas');
  if (teas) {
    teas.innerHTML = D.teas.map(function (t) {
      return '<li class="tea">' +
        '<span class="tea__img"><img src="' + t.img + '" alt="' + t.name + 'の茶葉" width="296" height="216" loading="lazy"></span>' +
        '<span class="tea__name">' + t.name + '</span>' +
        '<span class="tea__origin">（' + t.origin + '）</span>' +
        '<span class="tea__note">' + t.note + '</span></li>';
    }).join('');
  }

  /* MENU 定番メニュー */
  var regRow = function (m) {
    return '<li class="ritem">' +
      '<span class="ritem__thumb"><img src="' + m.img + '" alt="' + m.name + '" width="240" height="315" loading="lazy" decoding="async"></span>' +
      '<span class="ritem__main">' +
        (m.rec ? '<span class="tag tag--fill ritem__rec">人気</span>' : '') +
        '<span class="ritem__head"><span class="ritem__name">' + m.name + '</span><span class="ritem__price">' + yen(m.price) + '</span></span>' +
        '<span class="ritem__en">' + m.en + '</span>' +
        '<span class="ritem__foot"><span class="ritem__desc">' + m.desc + '</span><span class="ritem__serve">' + m.serve + '</span></span>' +
      '</span></li>';
  };
  var milk = $('#regularMilk'), tea = $('#regularTea');
  if (milk) milk.innerHTML = D.regular.milk.map(regRow).join('');
  if (tea) tea.innerHTML = D.regular.tea.map(regRow).join('');

  /* MENU トッピング */
  var top = $('#toppingList');
  if (top) {
    top.innerHTML = D.topping.map(function (t) {
      return '<li class="topping">' +
        '<span class="topping__img"><img src="' + t.img + '" alt="' + t.name + '" width="376" height="276" loading="lazy"></span>' +
        '<span class="topping__name">' + t.name + '</span>' +
        '<span class="topping__price">+' + yen(t.price) + '</span></li>';
    }).join('');
  }

  /* MENU 注文の流れ */
  var steps = $('#orderSteps');
  if (steps) {
    steps.innerHTML = D.order.map(function (s) {
      return '<li class="ostep">' +
        '<span class="ostep__no">' + s.no + '</span>' +
        '<span class="ostep__ttl">' + s.ttl + '</span>' +
        I(s.icon, 'ostep__ico') +
        '<span class="ostep__lines' + (s.left ? ' is-left' : '') + '">' + s.lines.join('<br>') + '</span></li>';
    }).join('');
  }

  /* INFO 混雑の目安 */
  var busy = $('#busyChart');
  if (busy) {
    var draw = function (key) {
      busy.innerHTML = D.busy.hours.map(function (h, i) {
        var v = D.busy[key][i];
        return '<li class="busy__col"><span class="busy__track"><span class="busy__bar" style="--v:' + (v / 5).toFixed(3) + ';--i:' + i + '"></span></span>' +
          '<span class="busy__h">' + h + '時</span></li>';
      }).join('');
      busy.setAttribute('aria-label', (key === 'weekday' ? '平日' : '土日祝') + 'の混雑の目安：' +
        D.busy.hours.map(function (h, i) { return h + '時 ' + D.busy[key][i] + '/5'; }).join('、'));
    };
    draw('weekday');
    each('[data-busy]', function (b) {
      b.addEventListener('click', function () {
        each('[data-busy]', function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        draw(b.getAttribute('data-busy'));
      });
    });
  }

  /* INFO よくある質問 */
  var faq = $('#faqList');
  if (faq) {
    faq.innerHTML = D.faq.map(function (f, i) {
      return '<li class="faq__item">' +
        '<button type="button" class="faq__q" aria-expanded="false" aria-controls="faq-' + i + '"><span>' + f.q + '</span><span class="plus" aria-hidden="true"></span></button>' +
        '<div class="faq__a" id="faq-' + i + '" hidden><p>' + f.a + '</p></div></li>';
    }).join('');
  }
})();

/* =========================================================
   商品詳細モーダル — 商品をタップすると写真が浮かび上がって開く
   ========================================================= */
(function () {
  var D = SHIZUKU.data, I = SHIZUKU.icon;
  var list = D.seasonal;
  if (!document.querySelector('[data-detail]')) return;

  var root = document.documentElement;
  var yen = function (n) { return '¥' + n.toLocaleString('ja-JP'); };
  var chev = '<span class="chev" aria-hidden="true"></span>';
  var motion = function () { return !!window.gsap && !root.classList.contains('reduced'); };

  var pd = document.createElement('div');
  pd.className = 'pd';
  pd.hidden = true;
  pd.setAttribute('role', 'dialog');
  pd.setAttribute('aria-modal', 'true');
  pd.setAttribute('aria-labelledby', 'pdName');
  pd.innerHTML =
    '<div class="pd__veil" data-pd-close></div>' +
    '<div class="pd__panel">' +
      '<button type="button" class="pd__close" data-pd-close aria-label="閉じる"></button>' +
      '<div class="pd__media">' +
        '<img class="pd__img" src="" alt="" width="1120" height="1400">' +
        '<button type="button" class="pd__arrow pd__arrow--prev" data-pd-step="-1" aria-label="前の商品"></button>' +
        '<button type="button" class="pd__arrow pd__arrow--next" data-pd-step="1" aria-label="次の商品"></button>' +
      '</div>' +
      '<div class="pd__info">' +
        '<p class="dots pd__dots">' + list.map(function () { return '<span class="dots__dot"></span>'; }).join('') + '</p>' +
        '<h2 class="pd__name pd-in" id="pdName"></h2>' +
        '<p class="pd__en pd-in"></p>' +
        '<p class="pd__desc pd-in"></p>' +
        '<dl class="pd__spec pd-in">' +
          '<div>' + I('cup') + '<dt>おすすめの甘さ</dt><dd class="pd__sweet"></dd></div>' +
          '<div>' + I('cup') + '<dt>おすすめの氷</dt><dd class="pd__ice"></dd></div>' +
          '<div>' + I('cup') + '<dt>提供方法</dt><dd class="pd__serve"></dd></div>' +
        '</dl>' +
        '<p class="pd__price pd-in"></p>' +
        '<a class="btn btn--fill pd__order pd-in" href="menu.html#order">注文方法を見る' + chev + '</a>' +
        '<div class="pd__nav pd-in">' +
          '<button type="button" class="pd__step pd__step--prev" data-pd-step="-1"><span class="pd__step-label">前の商品</span><span class="pd__step-name"></span></button>' +
          '<button type="button" class="pd__step pd__step--next" data-pd-step="1"><span class="pd__step-label">次の商品</span><span class="pd__step-name"></span></button>' +
        '</div>' +
      '</div>' +
    '</div>';
  document.body.appendChild(pd);

  var q = function (s) { return pd.querySelector(s); };
  var veil = q('.pd__veil'), panel = q('.pd__panel'), media = q('.pd__media'), img = q('.pd__img'), closeBtn = q('.pd__close');
  var ins = function () { return pd.querySelectorAll('.pd-in'); };
  var current = -1, busy = false, lastFocus = null, hiddenSrc = null;
  var wrap = function (n) { return (n + list.length) % list.length; };

  function fill(i, withImage) {
    var it = list[i];
    q('.pd__name').textContent = it.name;
    q('.pd__en').textContent = it.en;
    q('.pd__desc').textContent = it.long;
    q('.pd__sweet').textContent = it.sweet;
    q('.pd__ice').textContent = it.ice;
    q('.pd__serve').textContent = it.serve;
    q('.pd__price').textContent = yen(it.price);
    q('.pd__step--prev .pd__step-name').textContent = '（' + list[wrap(i - 1)].name + '）';
    q('.pd__step--next .pd__step-name').textContent = '（' + list[wrap(i + 1)].name + '）';
    Array.prototype.forEach.call(pd.querySelectorAll('.pd__dots .dots__dot'), function (d, k) { d.classList.toggle('is-active', k === i); });
    if (withImage !== false) { img.src = it.img; img.alt = it.name; }
  }

  function sourceOf(i) {
    var el = document.querySelector('[data-detail-src="' + list[i].id + '"]');
    if (!el) return null;
    var r = el.getBoundingClientRect();
    return (r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth && r.width > 0) ? el : null;
  }
  function showSrc() { if (hiddenSrc) { hiddenSrc.style.visibility = ''; hiddenSrc = null; } }
  function hideSrc(el) { showSrc(); if (el) { el.style.visibility = 'hidden'; hiddenSrc = el; } }
  function lock(on) {
    var gap = innerWidth - root.clientWidth;
    root.classList.toggle('is-locked', on);
    document.body.style.paddingRight = on && gap > 0 ? gap + 'px' : '';
  }

  /* 写真の複製（ページ上の切り抜き位置をそのまま再現） */
  function flyer(box, imgBox, src) {
    var c = document.createElement('div');
    c.className = 'pd-fly';
    var im = document.createElement('img');
    im.src = src; im.alt = '';
    c.appendChild(im);
    document.body.appendChild(c);
    gsap.set(c, { left: box.left, top: box.top, width: box.width, height: box.height });
    gsap.set(im, { left: imgBox.left - box.left, top: imgBox.top - box.top, width: imgBox.width, height: imgBox.height });
    return c;
  }

  function open(i, trigger) {
    if (busy || current > -1) return;
    current = i; lastFocus = trigger;
    fill(i);
    var src = sourceOf(i);
    pd.hidden = false;
    lock(true);
    if (!motion()) { closeBtn.focus({ preventScroll: true }); return; }

    busy = true;
    var target = media.getBoundingClientRect();
    var tl = gsap.timeline({ onComplete: function () { busy = false; closeBtn.focus({ preventScroll: true }); } });
    gsap.set(img, { autoAlpha: src ? 0 : 1 });
    tl.fromTo(veil, { autoAlpha: 0 }, { autoAlpha: 1, duration: .5, ease: 'power2.out' }, 0)
      .fromTo(panel, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: .6, ease: 'power3.out' }, .1)
      .fromTo(ins(), { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: .6, ease: 'power3.out', stagger: .04 }, .45);
    if (src) {
      var fly = flyer(src.getBoundingClientRect(), src.querySelector('img').getBoundingClientRect(), list[i].img);
      hideSrc(src);
      tl.to(fly, { left: target.left, top: target.top, width: target.width, height: target.height, duration: .85, ease: 'power3.inOut' }, 0)
        .to(fly.firstChild, { left: 0, top: 0, width: target.width, height: target.height, duration: .85, ease: 'power3.inOut' }, 0)
        .add(function () { gsap.set(img, { autoAlpha: 1 }); fly.remove(); }, .85);
    }
  }

  function reset() {
    pd.hidden = true; current = -1; busy = false;
    showSrc(); lock(false);
    if (window.gsap) gsap.set([veil, panel, img, ins()], { clearProps: 'all' });
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  }

  function close(instant) {
    if (current < 0) return;
    if (instant || !motion()) {
      if (window.gsap) gsap.killTweensOf([veil, panel, img, ins()]);
      Array.prototype.forEach.call(document.querySelectorAll('.pd-fly'), function (n) { n.remove(); });
      reset(); return;
    }
    if (busy) return;
    busy = true;
    var i = current, dest = hiddenSrc || sourceOf(i);
    var tl = gsap.timeline({ onComplete: reset });
    tl.to(panel, { autoAlpha: 0, duration: .35, ease: 'power2.in' }, dest ? .15 : 0)
      .to(veil, { autoAlpha: 0, duration: .45, ease: 'power2.inOut' }, .2);
    if (dest) {
      var from = media.getBoundingClientRect();
      if (dest !== hiddenSrc) hideSrc(dest);
      var dBox = dest.getBoundingClientRect(), dImg = dest.querySelector('img').getBoundingClientRect();
      var fly = flyer(from, from, list[i].img);
      gsap.set(img, { autoAlpha: 0 });
      tl.to(fly, { left: dBox.left, top: dBox.top, width: dBox.width, height: dBox.height, duration: .75, ease: 'power3.inOut' }, 0)
        .to(fly.firstChild, { left: dImg.left - dBox.left, top: dImg.top - dBox.top, width: dImg.width, height: dImg.height, duration: .75, ease: 'power3.inOut' }, 0)
        .add(function () { showSrc(); fly.remove(); }, .75);
    }
  }

  function step(d) {
    if (busy || current < 0) return;
    var n = wrap(current + d);
    if (!motion()) { current = n; fill(n); return; }
    busy = true;
    var next = document.createElement('img');
    next.className = 'pd__img pd__img--next';
    next.src = list[n].img; next.alt = '';
    media.insertBefore(next, img.nextSibling);
    gsap.timeline({
      onComplete: function () {
        img.src = list[n].img; img.alt = list[n].name;
        next.remove(); current = n; busy = false;
      }
    })
      .to(ins(), { autoAlpha: 0, duration: .25, ease: 'power1.in' }, 0)
      .fromTo(next, { autoAlpha: 0 }, { autoAlpha: 1, duration: .6, ease: 'power2.inOut' }, 0)
      .add(function () { fill(n, false); }, .25)
      .to(ins(), { autoAlpha: 1, duration: .45, ease: 'power2.out', stagger: .03 }, .3);
  }

  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-detail]');
    if (!t) return;
    e.preventDefault();
    var idx = list.findIndex(function (it) { return it.id === t.getAttribute('data-detail'); });
    if (idx > -1) open(idx, t);
  });
  pd.addEventListener('click', function (e) {
    if (e.target.closest('a[href]')) { close(true); return; }
    if (e.target.closest('[data-pd-close]')) { close(); return; }
    var s = e.target.closest('[data-pd-step]');
    if (s) step(parseInt(s.getAttribute('data-pd-step'), 10));
  });
  document.addEventListener('keydown', function (e) {
    if (current < 0) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowRight') step(1);
    else if (e.key === 'ArrowLeft') step(-1);
    else if (e.key === 'Tab') {
      var f = Array.prototype.slice.call(pd.querySelectorAll('a[href], button:not(.pd__arrow)'));
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  var sx = null, sy = null;
  media.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
  media.addEventListener('touchend', function (e) {
    if (sx === null) return;
    var dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) step(dx < 0 ? 1 : -1);
    sx = sy = null;
  });
  window.addEventListener('pageshow', function (e) { if (e.persisted) close(true); });
})();
