const fs = require('fs');
const js = fs.readFileSync('original_bundle.js', 'utf8');

const components = [
  'xC', 'vC', 'yC', 'fC', 'ME', 'E6', 'pC', 'JE', 'aC', 'eC', 'cC', 'gC',
  'AE', 'Hi', '_6', 'SE'
];

components.forEach(comp => {
  // Search for "const " + comp + "=" or "function " + comp
  const patterns = [
    `const ${comp}=`,
    `function ${comp}(`,
    `var ${comp}=`,
    `${comp}=`
  ];
  let found = -1;
  let patternUsed = '';
  for (const p of patterns) {
    const idx = js.indexOf(p);
    if (idx !== -1) {
      found = idx;
      patternUsed = p;
      break;
    }
  }

  if (found !== -1) {
    console.log(`\n================== COMPONENT: ${comp} (found "${patternUsed}" at ${found}) ==================`);
    console.log(js.slice(found, found + 2500));
  } else {
    console.log(`\nComponent ${comp} NOT found directly`);
  }
});
