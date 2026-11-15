const fs = require('fs');
let t = fs.readFileSync('landings/index.html', 'utf8');
t = t.replace(/src="\.\/([a-z-]+)\/img\/([0-9]+\.jpg)"/g, 'src="./$1/img/$1_$2"');
fs.writeFileSync('landings/index.html', t);
console.log(t.match(/src="[^"]+"/g).slice(0, 4).join(' '));
