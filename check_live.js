fetch('https://eduardnoskov-crypto.github.io/landing-demos-chel/meduza-sushi/')
  .then(r => r.text())
  .then(t => {
    console.log('page fetched, len', t.length);
    console.log('CTA:', t.includes('Позвонить и заказать'));
    console.log('hook:', t.includes('заказ за один звонок'));
    const cards = (t.match(/class="card"/g) || []).length;
    console.log('cards:', cards);
  });
