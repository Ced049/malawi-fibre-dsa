const { runTests } = require("../src/tests");
const r = runTests(); let f = 0;
r.forEach(x => { if (!x.pass) f++; console.log(`${x.pass ? "PASS" : "FAIL"}  ${x.id}  ${x.input}\n      expected: ${x.expected}\n      actual:   ${x.actual}`); });
console.log(`\n${r.length - f}/${r.length} tests passed`); process.exit(f ? 1 : 0);
