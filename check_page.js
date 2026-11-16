const fs = require('fs');
for (const slug of ['la-petite', 'meduza-sushi']) {
  const t = fs.readFileSync(`landings/${slug}/index.html`, 'utf8');
  console.log('---', slug);
  console.log('badge:', t.includes('menu-badge') || t.includes('Образец меню'));
  console.log('reduced-motion:', t.includes('prefers-reduced-motion'));
  console.log('og:', t.includes('og:title'));
  console.log('ctaGhost:', t.includes('Построить маршрут'));
  console.log('label:', t.includes('иллюстративные'));
  console.log('stars:', t.includes('424') || t.includes('969'));
  console.log('date:', t.includes('16.11.2026'));
}
