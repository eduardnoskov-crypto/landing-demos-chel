// Генератор 10 демо-лендингов для компаний из выборки 2ГИС
const fs = require('fs');
const path = require('path');

const SITES = [
  {
    slug: 'na-truda-cafe',
    name: 'На Труда, кафе №1',
    short: 'На Труда',
    niche: 'Кафе-шаурма у завода',
    tagline: 'Сытный обед в двух шагах от Труда',
    desc: 'Кафе-шаурма в самом центре рабочей улицы Труда. Быстрый обед, свежая выпечка и кофе — по цене одной поездки на такси.',
    bullets: ['Быстрый обед без ожидания', 'Свежая шаурма и выпечка каждый день', 'Дружелюбная доставка по центру'],
    addr: 'улица Труда, 148',
    phone: '+73517007001',
    email: 'armdrift@mail.ru',
    rating: 4.6, rc: 2781,
    color: '#e8542f', color2: '#f5a623',
    emoji: '🌯',
    hero: 'linear-gradient(135deg,#2b1a12 0%,#4a2413 55%,#e8542f 140%)',
  },
  {
    slug: 'meduza-sushi',
    name: 'Медуза Суши',
    short: 'Медуза Суши',
    niche: 'Суши и роллы',
    tagline: 'Суши, которые заказывают снова',
    desc: 'Свежие роллы и авторские сеты от команды «Медуза Суши». Краснопольский проспект, 1 — доставка и самовывоз.',
    bullets: ['Свежая рыба и честные составы', 'Сеты для компании от 2 до 8 человек', 'Доставка по городу и самовывоз'],
    addr: 'Краснопольский проспект, 1',
    phone: '+79191233276',
    email: 'v.meduza@yandex.ru',
    rating: 4.8, rc: 861,
    color: '#0e7490', color2: '#22d3ee',
    emoji: '🍣',
    hero: 'linear-gradient(135deg,#062a35 0%,#0b3d4d 55%,#0e7490 140%)',
  },
  {
    slug: 'black-papa',
    name: 'Black papa, барбершоп',
    short: 'Black papa',
    niche: 'Барбершоп',
    tagline: 'Стрижка, после которой заметят все',
    desc: 'Мужской барбершоп на улице Энгельса, 36. Классические и современные стрижки, борода, уход.',
    bullets: ['Стрижки и оформление бороды', 'Мастера, которые слышат клиента', 'Атмосфера, в которой хочется остаться'],
    addr: 'улица Энгельса, 36',
    phone: '+79000888813',
    email: 'salamty@mail.ru',
    rating: 5, rc: 598,
    color: '#111827', color2: '#d4a017',
    emoji: '💈',
    hero: 'linear-gradient(135deg,#0a0a0a 0%,#1f2937 60%,#d4a017 160%)',
  },
  {
    slug: 'moika-otido',
    name: 'Moika Otido',
    short: 'Moika Otido',
    niche: 'Автомойка самообслуживания',
    tagline: 'Мойка, за которую не неловко платить',
    desc: 'Комплекс самообслуживания на Луценко, 2. Чистые посты, рабочее оборудование, честная химия.',
    bullets: ['Самообслуживание без очередей', 'Всё оборудование в рабочем состоянии', 'Плюс кофейня — ждёте с комфортом'],
    addr: 'Луценко, 2 ст1',
    phone: '+79220143605',
    email: 'cc@ot-i-do.ru',
    rating: 4.7, rc: 509,
    color: '#1d4ed8', color2: '#38bdf8',
    emoji: '🫧',
    hero: 'linear-gradient(135deg,#0a1e4d 0%,#123a8f 55%,#1d4ed8 140%)',
  },
  {
    slug: 'almaz-rodnik',
    name: 'Алмаз в роднике',
    short: 'Алмаз в роднике',
    niche: 'Ювелирная мастерская',
    tagline: 'Украшения, которые передают по наследству',
    desc: 'Ювелирная мастерская на улице Труда, 203. Ремонт, реставрация и изготовление украшений.',
    bullets: ['Ремонт и реставрация украшений', 'Изготовление под заказ', 'Оценка изделия перед работой'],
    addr: 'улица Труда, 203',
    phone: '+79080511839',
    email: 'bannikov-73@inbox.ru',
    rating: 4.9, rc: 405,
    color: '#7c2d12', color2: '#d4af37',
    emoji: '💎',
    hero: 'linear-gradient(135deg,#1c1006 0%,#3b1d0b 55%,#b45309 150%)',
  },
  {
    slug: 'i-flagman',
    name: 'I-Flagman',
    short: 'I-Flagman',
    niche: 'Сервисный центр',
    tagline: 'Ремонт техники, который успевает за вами',
    desc: 'Сервисный центр на Молодогвардейцев, 7. Ремонт телефонов, планшетов и ноутбуков с гарантией.',
    bullets: ['Диагностика перед любым ремонтом', 'Гарантия на выполненные работы', 'Оригинальные и качественные запчасти'],
    addr: 'улица Молодогвардейцев, 7',
    phone: '+79925004889',
    email: 'iflagman174@gmail.com',
    rating: 5, rc: 362,
    color: '#4338ca', color2: '#a78bfa',
    emoji: '🔧',
    hero: 'linear-gradient(135deg,#1e1b4b 0%,#312e81 55%,#4338ca 140%)',
  },
  {
    slug: 'roza-chel',
    name: 'Роза Челябинск',
    short: 'Роза Челябинск',
    niche: 'Магазин цветов',
    tagline: 'Цветы, о которых напишут благодарность',
    desc: 'Магазин цветов на Салавата Юлаева, 17. Букеты к любому поводу — от «просто так» до свадьбы.',
    bullets: ['Свежие цветы под поставку', 'Букеты на любой бюджет', 'Быстрая доставка по городу'],
    addr: 'улица Салавата Юлаева, 17',
    phone: '+79080800899',
    email: 'rozachelyabinsk@mail.ru',
    rating: 4.9, rc: 279,
    color: '#be123c', color2: '#fb7185',
    emoji: '🌹',
    hero: 'linear-gradient(135deg,#2d0510 0%,#4c0519 55%,#be123c 145%)',
  },
  {
    slug: 'ekspress-atelier',
    name: 'Экспресс-ателье',
    short: 'Экспресс-ателье',
    niche: 'Ателье',
    tagline: 'Одежда сидит идеально — потому что это ваше',
    desc: 'Ателье на улице Разина, 9. Подгонка по фигуре, ремонт одежды и пошив.',
    bullets: ['Подгонка любой сложности', 'Срочный ремонт одежды', 'Пошив по вашим меркам'],
    addr: 'улица Разина, 9',
    phone: '+79080810437',
    email: 'popkova.l.v@mail.ru',
    rating: 5, rc: 268,
    color: '#9d174d', color2: '#f0abfc',
    emoji: '🧵',
    hero: 'linear-gradient(135deg,#2a0a1c 0%,#4c1130 55%,#9d174d 145%)',
  },
  {
    slug: 'zoo-doktor',
    name: 'ЗооДоктор',
    short: 'ЗооДоктор',
    niche: 'Ветеринарная клиника',
    tagline: 'Ваш питомец — в надёжных руках',
    desc: 'Ветеринарная клиника на Университетской Набережной, 97а. Приём, диагностика и забота без стресса.',
    bullets: ['Приём без боли и стресса для питомца', 'Диагностика и лечение на месте', 'Честные рекомендации без навязывания'],
    addr: 'улица Университетская Набережная, 97а',
    phone: '+73512484138',
    email: 'zoodoktor74@mail.ru',
    rating: 5, rc: 265,
    color: '#047857', color2: '#34d399',
    emoji: '🐾',
    hero: 'linear-gradient(135deg,#052e23 0%,#064e3b 55%,#047857 140%)',
  },
  {
    slug: 'akuna-matata',
    name: 'Акуна Матата',
    short: 'Акуна Матата',
    niche: 'Туристическое агентство',
    tagline: 'Отпуск начинается здесь',
    desc: 'Туристическое агентство на Цвиллинга, 57. Подберём тур под ваш бюджет и мечты — пляж, горы или экскурсии.',
    bullets: ['Подбор тура под ваш бюджет', 'Помощь с документами и страховкой', 'Поддержка на связи во время поездки'],
    addr: 'улица Цвиллинга, 57',
    phone: '+79000222198',
    email: 'info@akatravel.ru',
    rating: 5, rc: 244,
    color: '#0f766e', color2: '#fbbf24',
    emoji: '🏝️',
    hero: 'linear-gradient(135deg,#042f2e 0%,#134e4a 55%,#0f766e 140%)',
  },
];

const page = s => `<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${s.name} — ${s.niche} в Челябинске</title>
<meta name="description" content="${s.name} — ${s.niche} в Челябинске, ${s.addr}. Официальный сайт, телефоны и запись.">
<style>
:root{--c:${s.color};--c2:${s.color2};}
*{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
body{font-family:'Segoe UI',system-ui,-apple-system,sans-serif;color:#1f2937;background:#fafafa;line-height:1.6}
.wrap{max-width:1080px;margin:0 auto;padding:0 20px}
header{position:sticky;top:0;z-index:9;background:rgba(255,255,255,.92);backdrop-filter:blur(8px);box-shadow:0 1px 0 rgba(0,0,0,.06)}
header .wrap{display:flex;align-items:center;justify-content:space-between;height:64px}
.logo{display:flex;align-items:center;gap:10px;font-weight:800;font-size:1.05rem;color:#111}
.logo span.mark{width:36px;height:36px;border-radius:10px;background:var(--c);color:#fff;display:grid;place-items:center;font-size:1.1rem}
nav a{margin-left:18px;text-decoration:none;color:#374151;font-weight:600;font-size:.92rem}
nav a:hover{color:var(--c)}
.hero{background:${s.hero};color:#fff;padding:84px 0 96px;position:relative;overflow:hidden}
.hero::after{content:'';position:absolute;inset:auto -10% -60% auto;width:520px;height:520px;border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,.14),transparent 65%)}
.hero .wrap{position:relative;z-index:1}
.kicker{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.25);padding:6px 14px;border-radius:999px;font-size:.85rem;font-weight:600;margin-bottom:22px}
h1{font-size:clamp(1.9rem,5vw,3.2rem);line-height:1.15;font-weight:800;max-width:640px}
.hero p.sub{margin:18px 0 30px;font-size:clamp(1rem,2.4vw,1.2rem);max-width:560px;color:rgba(255,255,255,.88)}
.cta-row{display:flex;gap:14px;flex-wrap:wrap}
.btn{display:inline-flex;align-items:center;gap:10px;padding:14px 26px;border-radius:12px;font-weight:700;text-decoration:none;font-size:1rem;transition:.2s}
.btn.primary{background:#fff;color:#111;box-shadow:0 8px 24px rgba(0,0,0,.25)}
.btn.primary:hover{transform:translateY(-2px)}
.btn.ghost{color:#fff;border:1.5px solid rgba(255,255,255,.5)}
.btn.ghost:hover{background:rgba(255,255,255,.1)}
.stats{display:flex;gap:36px;flex-wrap:wrap;margin-top:44px}
.stat b{font-size:1.7rem;display:block;line-height:1.2}
.stat span{font-size:.85rem;color:rgba(255,255,255,.75)}
section{padding:72px 0}
h2{font-size:clamp(1.5rem,3.5vw,2.1rem);font-weight:800;color:#111;margin-bottom:10px}
.section-sub{color:#6b7280;margin-bottom:40px}
.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:22px}
.card{background:#fff;border-radius:18px;padding:28px;box-shadow:0 2px 14px rgba(17,24,39,.06);border:1px solid #f1f1f4;transition:.2s}
.card:hover{transform:translateY(-4px);box-shadow:0 12px 28px rgba(17,24,39,.1)}
.card .ico{width:52px;height:52px;border-radius:14px;background:color-mix(in srgb,var(--c) 12%,white);display:grid;place-items:center;font-size:1.5rem;margin-bottom:16px}
.card h3{font-size:1.1rem;margin-bottom:8px;color:#111}
.card p{color:#6b7280;font-size:.95rem}
.rating-band{background:${s.hero};color:#fff;border-radius:24px;padding:44px 40px;display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap}
.rating-band .score{font-size:3.2rem;font-weight:800;line-height:1}
.rating-band .stars{color:${s.color2};font-size:1.4rem;letter-spacing:3px}
.rating-band p{color:rgba(255,255,255,.85);max-width:480px}
.contact{background:#fff;border:1px solid #f1f1f4;border-radius:24px;padding:40px;display:grid;grid-template-columns:1fr 1fr;gap:32px}
.contact h3{margin-bottom:14px;color:#111;font-size:1.2rem}
.contact a.row{display:flex;align-items:center;gap:12px;padding:10px 0;color:#111;text-decoration:none;font-weight:600}
.contact a.row:hover{color:var(--c)}
.contact .note{grid-column:1/-1;color:#6b7280;font-size:.9rem;border-top:1px solid #f3f3f6;padding-top:18px}
footer{background:#0f1115;color:#9ca3af;padding:36px 0;font-size:.88rem}
footer .wrap{display:flex;justify-content:space-between;gap:14px;flex-wrap:wrap}
footer a{color:#d1d5db;text-decoration:none}
@media(max-width:760px){.contact{grid-template-columns:1fr}.rating-band{padding:32px 24px}}
</style>
</head>
<body>
<header><div class="wrap">
  <div class="logo"><span class="mark">${s.emoji}</span>${s.short}</div>
  <nav><a href="#about">О нас</a><a href="#reviews">Отзывы</a><a href="#contact">Контакты</a></nav>
</div></header>

<div class="hero"><div class="wrap">
  <span class="kicker">⭐ ${s.rating} · ${s.rc} отзывов на 2ГИС</span>
  <h1>${s.tagline}</h1>
  <p class="sub">${s.desc}</p>
  <div class="cta-row">
    <a class="btn primary" href="tel:${s.phone.replace(/[^+\\d]/g,'')}">📞 Позвонить: ${s.phone}</a>
    <a class="btn ghost" href="#contact">Как нас найти</a>
  </div>
  <div class="stats">
    <div class="stat"><b>${s.rating}</b><span>рейтинг из 5</span></div>
    <div class="stat"><b>${s.rc}</b><span>отзывов клиентов</span></div>
    <div class="stat"><b>Челябинск</b><span>${s.addr}</span></div>
  </div>
</div></div>

<section id="about"><div class="wrap">
  <h2>Почему выбирают нас</h2>
  <p class="section-sub">${s.niche} в Челябинске — то, что мы делаем каждый день.</p>
  <div class="cards">
    ${s.bullets.map((b,i)=>`<div class="card"><div class="ico">${['✅','⭐','💬'][i%3]}</div><h3>${b.split('—')[0].trim()}</h3><p>${b}</p></div>`).join('\n    ')}
  </div>
</div></section>

<section id="reviews"><div class="wrap">
  <div class="rating-band">
    <div><div class="score">${s.rating}<span style="font-size:1.4rem;opacity:.6">/5</span></div>
    <div class="stars">★★★★★</div></div>
    <p>Наши клиенты уже оставили <b>${s.rc}</b> отзывов на 2ГИС. Каждая оценка — это чей-то день, который мы сделали лучше. Присоединяйтесь!</p>
    <a class="btn primary" href="https://2gis.ru/chelyabinsk/firm/${s.id}" target="_blank" rel="noopener">Смотреть отзывы в 2ГИС</a>
  </div>
</div></section>

<section id="contact"><div class="wrap">
  <h2>Контакты</h2>
  <p class="section-sub">Мы всегда на связи — звоните или приходите.</p>
  <div class="contact">
    <div>
      <h3>📞 Связь</h3>
      <a class="row" href="tel:${s.phone.replace(/[^+\\d]/g,'')}">${s.phone}</a>
      <a class="row" href="mailto:${s.email}">✉️ ${s.email}</a>
    </div>
    <div>
      <h3>📍 Адрес</h3>
      <a class="row" href="https://2gis.ru/chelyabinsk/firm/${s.id}" target="_blank" rel="noopener">🗺️ ${s.addr}</a>
      <a class="row" href="https://2gis.ru/chelyabinsk/firm/${s.id}" target="_blank" rel="noopener">Построить маршрут →</a>
    </div>
    <div class="note">Это демонстрационная страница, собранная как образец оформления по открытым данным карточки организации в 2ГИС.</div>
  </div>
</div></section>

<footer><div class="wrap">
  <div>© ${new Date().getFullYear()} ${s.name}</div>
  <div><a href="https://2gis.ru/chelyabinsk/firm/${s.id}" target="_blank" rel="noopener">Карточка в 2ГИС</a></div>
</div></footer>
</body>
</html>`;

// реальные id карточек 2ГИС из выборки
const ids = {
  'na-truda-cafe': '70000001023357449',
  'meduza-sushi': '70000001040187579',
  'black-papa': '70000001030537891',
  'moika-otido': '70000001052453012',
  'almaz-rodnik': '70000001040291917',
  'i-flagman': '70000001035315566',
  'roza-chel': '70000001057378001',
  'ekspress-atelier': '2111590606313582',
  'zoo-doktor': '2111591606688254',
  'akuna-matata': '2111590608935376',
};

const outDir = path.join(__dirname, 'landings');
fs.mkdirSync(outDir, { recursive: true });
for (const s of SITES) {
  s.id = ids[s.slug];
  const html = page(s);
  const dir = path.join(outDir, s.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  console.log('OK', s.slug, html.length + 'b');
}
// индекс-витрина всех лендингов
const index = `<!doctype html><html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Демо-лендинги — челябинский бизнес</title>
<style>body{font-family:'Segoe UI',system-ui,sans-serif;background:#f6f7fb;margin:0;color:#111}main{max-width:960px;margin:0 auto;padding:60px 20px}h1{font-size:2rem}p{color:#555}.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:18px;margin-top:30px}a.tile{background:#fff;border-radius:16px;padding:22px;text-decoration:none;color:#111;box-shadow:0 2px 10px rgba(0,0,0,.05)}a.tile:hover{box-shadow:0 10px 26px rgba(0,0,0,.12);transform:translateY(-3px)}a.tile b{display:block;font-size:1.1rem}a.tile span{color:#777;font-size:.9rem}.note{margin-top:40px;font-size:.85rem;color:#888}</style></head><body><main>
<h1>Демо-лендинги для бизнеса Челябинска</h1>
<p>Примеры оформления одностраничных сайтов, собранных по открытым данным 2ГИС.</p>
<div class="grid">
${SITES.map(s=>`<a class="tile" href="./${s.slug}/"><b>${s.emoji} ${s.short}</b><span>${s.niche} · ⭐ ${s.rating} (${s.rc})</span></a>`).join('\n')}
</div>
<p class="note">Все страницы — демонстрационные прототипы, созданные в качестве предложения по разработке лендингов.</p>
</main></body></html>`;
fs.writeFileSync(path.join(outDir, 'index.html'), index);
console.log('index OK');
