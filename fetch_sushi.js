// Добор суши-фото с Openverse (Flickr CC) — в img/meduza-sushi_3..N.jpg
const fs = require('fs');
const UA = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' };
const SLUG = 'meduza-sushi';
const QUERIES = ['sushi plate', 'sashimi', 'maki rolls', 'nigiri sushi', 'sushi set', 'salmon rolls', 'sushi restaurant', 'japanese food sushi'];
const BAD = /lego|toy|usb|cartoon|drawing|chart|logo|book|mouse|cake|burger/i;

const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  const meta = JSON.parse(fs.readFileSync('img_meta.json', 'utf8'));
  meta[SLUG] = meta[SLUG].filter(c => fs.existsSync(c.file)); // сохранить уже используемые _0.._2
  let nextIdx = 3;
  const have = meta[SLUG].length;

  for (const q of QUERIES) {
    if (nextIdx >= 9) break;
    try {
      const url = 'https://api.openverse.org/v1/images/?q=' + encodeURIComponent(q) + '&page_size=20&license_type=commercial&filter_dead=false&aspect_ratio=wide';
      const r = await fetch(url, { headers: UA });
      const t = await r.text();
      if (!t.trim().startsWith('{')) { console.log('CF block on', q); await sleep(20000); continue; }
      const j = JSON.parse(t);
      const ok = (j.results || []).filter(x =>
        x.width >= 1000 && x.height >= 600 &&
        /\.(jpe?g|png)$/i.test(x.url) && !/nd/.test(x.license) &&
        !BAD.test(x.title) &&
        !meta[SLUG].some(m => m.source === (x.foreign_landing_url || x.url))
      );
      console.log('Q:', q, '→', ok.length, 'кандидатов');
      for (const c of ok) {
        if (nextIdx >= 9) break;
        try {
          const rr = await fetch(c.url, { headers: UA });
          if (!rr.ok) continue;
          const b = Buffer.from(await rr.arrayBuffer());
          if (b.length < 50000) continue;
          const file = `img/${SLUG}_${nextIdx}.jpg`;
          fs.writeFileSync(file, b);
          meta[SLUG].push({ file, title: c.title, creator: c.creator, license: c.license, source: c.foreign_landing_url || c.url });
          console.log('SAVED', file, '—', c.title, '[', c.license, ']', c.width + 'x' + c.height);
          nextIdx++;
          await sleep(1500);
        } catch (e) { /* skip */ }
      }
      if (ok.length) await sleep(8000);
    } catch (e) { console.log('ERR', q, e.message); await sleep(10000); }
  }
  fs.writeFileSync('img_meta.json', JSON.stringify(meta, null, 1));
  console.log('итого фото у', SLUG, ':', meta[SLUG].length);
})();
