// Точечная замена неудачных фото
const fs = require('fs');
const path = require('path');
const UA = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36' };

const FIX = {
  'black-papa': ['barber shop', 'barbershop pole', 'mens haircut salon'],
  'moika-otido': ['car wash soap', 'car detailing', 'washing car'],
  'na-truda-cafe': ['doner kebab', 'shawarma wrap', 'grilled wrap food'],
  'zoo-doktor': ['dog portrait', 'cat portrait', 'veterinary'],
};

(async () => {
  const meta = JSON.parse(fs.readFileSync('img_meta.json', 'utf8'));
  for (const [slug, qs] of Object.entries(FIX)) {
    let chosen = [];
    for (const q of qs) {
      try {
        const url = 'https://api.openverse.org/v1/images/?q=' + encodeURIComponent(q) + '&page_size=20&license_type=commercial&filter_dead=false&aspect_ratio=wide';
        const r = await fetch(url, { headers: UA });
        const j = await r.json();
        const ok = (j.results || []).filter(x =>
          x.width >= 900 && x.height >= 500 &&
          /\.(jpe?g|png)$/i.test(x.url) &&
          !/nd/.test(x.license) &&                       // без NoDerivs
          !/lego|bikini|elementary|school|avenger|toy|drawing|cartoon|logo|chart/i.test(x.title)
        );
        if (ok.length) { chosen = ok.slice(0, 4); break; }
      } catch (e) { console.log(slug, q, 'ERR', e.message); }
    }
    const saved = [];
    for (let i = 0; i < Math.min(3, chosen.length); i++) {
      const c = chosen[i];
      try {
        const r = await fetch(c.url, { headers: UA });
        if (!r.ok) throw new Error('img ' + r.status);
        const buf = Buffer.from(await r.arrayBuffer());
        if (buf.length < 40000) throw new Error('small');
        fs.writeFileSync(path.join('img', slug + '_' + i + '.jpg'), buf);
        saved.push({ file: 'img/' + slug + '_' + i + '.jpg', title: c.title, creator: c.creator, license: c.license, source: c.foreign_landing_url || c.url });
      } catch (e) { console.log('  fail', c.url.slice(0, 50), e.message); }
    }
    if (saved.length) meta[slug] = saved;
    console.log(slug, '→', saved.length, 'новых фото:', saved.map(s => s.title).join(' | '));
  }
  fs.writeFileSync('img_meta.json', JSON.stringify(meta, null, 1));
})();
