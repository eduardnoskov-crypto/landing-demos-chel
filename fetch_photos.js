// Подбор и скачивание фото с Openverse (Flickr, CC BY / CC BY-SA)
const fs = require('fs');
const path = require('path');

const QUERIES = {
  'na-truda-cafe': ['shawarma', 'doner kebab', 'street food'],
  'meduza-sushi': ['sushi rolls', 'sushi plate'],
  'black-papa': ['barbershop', 'barber haircut', 'barber'],
  'moika-otido': ['car wash', 'car wash foam'],
  'almaz-rodnik': ['gold ring jewelry', 'jewelry'],
  'i-flagman': ['smartphone repair', 'phone repair'],
  'roza-chel': ['flower bouquet', 'roses bouquet'],
  'ekspress-atelier': ['sewing workshop', 'sewing machine tailor'],
  'zoo-doktor': ['veterinarian dog', 'vet cat'],
  'akuna-matata': ['tropical beach', 'beach palm'],
};

const UA = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36' };

async function fetchJson(url) {
  const r = await fetch(url, { headers: UA });
  if (!r.ok) throw new Error('HTTP ' + r.status);
  return r.json();
}

async function pick(query) {
  const url = 'https://api.openverse.org/v1/images/?q=' + encodeURIComponent(query) +
    '&page_size=20&license_type=commercial&filter_dead=false&aspect_ratio=wide';
  const j = await fetchJson(url);
  const ok = (j.results || []).filter(x => x.width >= 900 && x.height >= 500 && /\.(jpe?g|png)$/i.test(x.url));
  return ok;
}

(async () => {
  const meta = {};
  const outDir = path.join(__dirname, 'img');
  fs.mkdirSync(outDir, { recursive: true });
  for (const [slug, qs] of Object.entries(QUERIES)) {
    let chosen = [];
    for (const q of qs) {
      try {
        const list = await pick(q);
        chosen = list.slice(0, 4);
        if (chosen.length >= 2) break;
      } catch (e) { console.log(slug, q, 'ERR', e.message); }
    }
    // скачиваем до 3 фото
    const saved = [];
    for (let i = 0; i < Math.min(3, chosen.length); i++) {
      const c = chosen[i];
      const file = path.join(outDir, slug + '_' + i + '.jpg');
      try {
        const r = await fetch(c.url, { headers: UA });
        if (!r.ok) throw new Error('img HTTP ' + r.status);
        const buf = Buffer.from(await r.arrayBuffer());
        if (buf.length < 40000) throw new Error('too small');
        fs.writeFileSync(file, buf);
        saved.push({ file: 'img/' + slug + '_' + i + '.jpg', title: c.title, creator: c.creator, license: c.license, source: c.foreign_landing_url || c.url });
      } catch (e) { console.log('  dl fail:', c.url.slice(0, 60), e.message); }
    }
    meta[slug] = saved;
    console.log(slug, '→', saved.length, 'фото');
  }
  fs.writeFileSync('img_meta.json', JSON.stringify(meta, null, 1));
  console.log('done');
})();
