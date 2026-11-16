const fs = require('fs');
const lines = fs.readFileSync('лендинг_крюки_100.csv', 'utf8').split(/\r?\n/);
const foodRe = /кафе|пицц|кофе|кондитер|пекар|столов|шаурма|фаст|суши|ресторан|блин|выпеч|сладост|десерт|бургер|пельмен|шашлык|мангал|еда|кухня|ролл|лапша|вок|темпур|напитк|морожен|торт/i;
let cnt = 0;
for (const line of lines.slice(1)) {
  if (!line.trim()) continue;
  const c = line.split(';');
  if (c.length < 8) continue;
  const name = (c[1] || '').replace(/"/g, ''), cat = (c[2] || '').replace(/"/g, ''), addr = (c[3] || '').replace(/"/g, ''), mail = (c[5] || '').replace(/"/g, ''), rate = (c[6] || '').replace(/"/g, ''), rev = (c[7] || '').replace(/"/g, '');
  if (foodRe.test(name + ' ' + cat) && mail) { cnt++; console.log(`${name} | ${cat} | ${addr} | ${mail} | ${rate}★ | ${rev}`); }
}
console.log('total', cnt);
