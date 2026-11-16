const fs = require('fs');
const t = fs.readFileSync('landings/meduza-sushi/index.html', 'utf8');
console.log('cta:', t.includes('Позвонить и заказать'));
console.log('cards:', (t.match(/class="card"/g) || []).length);
console.log('menu:', t.includes('Сет «Медуза»'));
console.log('hook2:', t.includes('заказ за один звонок'));
