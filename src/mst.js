
const _MH = typeof MinHeap !== "undefined" ? MinHeap : require("./dijkstra").MinHeap;
function kruskal(graph) {
  const parent = new Map(graph.nodes.map(n => [n, n]));
  const find = x => { while (parent.get(x) !== x) { parent.set(x, parent.get(parent.get(x))); x = parent.get(x); } return x; };
  const sorted = graph.edges.sort((p, q) => p.w - q.w || (p.a + p.b).localeCompare(q.a + q.b));
  const tree = [], log = []; let total = 0;
  for (const e of sorted) {
    const ra = find(e.a), rb = find(e.b);
    if (ra !== rb) { parent.set(ra, rb); tree.push(e); total += e.w; log.push({ e, accepted: true }); }
    else log.push({ e, accepted: false });
  }
  return { edges: tree, total, log, spanning: tree.length === graph.nodes.length - 1 };
}
function prim(graph, start) {
  start = start || graph.nodes[0];
  const inTree = new Set([start]), tree = [], log = []; let total = 0;
  const pq = new _MH();
  const push = u => { for (const [v, w] of graph.adj.get(u)) if (!inTree.has(v)) pq.push([w, u, v]); };
  push(start);
  while (pq.size && inTree.size < graph.nodes.length) {
    const [w, u, v] = pq.pop();
    if (inTree.has(v)) continue;
    inTree.add(v); tree.push({ a: u, b: v, w }); total += w; log.push({ e: { a: u, b: v, w } }); push(v);
  }
  return { edges: tree, total, log, spanning: tree.length === graph.nodes.length - 1 };
}
if (typeof module !== "undefined") module.exports = { kruskal, prim };
