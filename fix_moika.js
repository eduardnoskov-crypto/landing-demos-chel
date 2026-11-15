// Замена фото для мойки: только по title с wash/foam/soap
const fs = require('fs');
const UA = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' };
(async () => {
  for (const q of ['car wash', 'washing car', 'carwash']) {
    try {
      const r = await fetch('https://api.openverse.org/v1/images/?q=' + encodeURIComponent(q) + '&page_size=20&license_type=commercial&filter_dead=false&aspect_ratio=wide', { headers: UA });
      const t = await r.text();
      if (!t.trim().startsWith('{')) { console.log('CF block on', q); continue; }
      const j = JSON.parse(t);
      const ok = (j.results || []).filter(x =>
        x.width >= 1000 && x.height >= 600 &&
        /\.(jpe?g|png)$/i.test(x.url) &&
        !/nd/.test(x.license) &&
        /wash|foam|soap/i.test(x.title) &&
        !/bikini|dishes|woman|girl|blonde|lego|toy/i.test(x.title)
      );
      console.log('Q:', q, '→', ok.length);
      ok.slice(0, 6).forEach(x => console.log('  ', x.title, '[', x.license, ']', x.width + 'x' + x.height, x.url));
      if (ok.length) {
        let n = 0;
        for (const c of ok.slice(0, 2)) {
          try {
            const rr = await fetch(c.url, { headers: UA });
            if (!rr.ok) continue;
            const b = Buffer.from(await rr.arrayBuffer());
            if (b.length < 40000) continue;
            fs.writeFileSync('img/moika-otido_' + n + '.jpg', b);
            console.log('SAVED _' + n, c.title);
            n++;
          } catch (e) { console.log('dl fail', e.message); }
        }
        if (n > 0) break;
      }
    } catch (e) { console.log('ERR', q, e.message); }
  }
})();
