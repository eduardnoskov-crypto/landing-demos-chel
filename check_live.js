const base = 'https://eduardnoskov-crypto.github.io/landing-demos-chel/';
(async () => {
  const page = await fetch(base + 'la-petite/');
  const t = await page.text();
  console.log('page:', page.status);
  console.log('hook:', t.includes('246 отзывов'));
  console.log('menu:', t.includes('Круассан классический') && t.includes('лососем'));
  console.log('CTA:', t.includes('Позвонить и заказать'));
  for (const n of [0, 1, 2, 5, 6, 7]) {
    const r = await fetch(base + 'la-petite/img/lapetite_' + n + '.jpg', { method: 'HEAD' });
    console.log('img_' + n + ':', r.status);
  }
})();
