const fs = require('fs');
const b64 = fs.readFileSync('C:/Users/jacks/.openclaw/workspace/agentstandard/tmp_app_b64.txt', 'utf8').replace(/\s/g,'');
const src = Buffer.from(b64, 'base64').toString('utf8');
fs.writeFileSync('C:/Users/jacks/.openclaw/workspace/agentstandard/tmp_app.jsx', src);

// Find all slugs
const slugs = [];
const re = /slug:\s*['"]([a-z0-9-]+)['"]/g;
let m;
while ((m = re.exec(src)) !== null) slugs.push(m[1]);

console.log('Live packages on site: ' + slugs.length);
slugs.forEach(s => console.log(' - ' + s));

// Also find all 47 from packages dir
const packagesDir = 'C:/Users/jacks/.openclaw/workspace/agentstandard/packages';
const allPkgs = fs.readdirSync(packagesDir).filter(d => !d.startsWith('_') && !d.startsWith('.'));

console.log('\nMissing from site (' + (allPkgs.length - slugs.length) + '):');
allPkgs.forEach(p => { if (!slugs.includes(p)) console.log(' - ' + p); });
