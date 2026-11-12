
class MinHeap {
  constructor() { this.h = []; }
  get size() { return this.h.length; }
  push(item) { const h = this.h; h.push(item); let i = h.length - 1;
    while (i > 0) { const p = (i - 1) >> 1; if (h[p][0] <= h[i][0]) break; [h[p], h[i]] = [h[i], h[p]]; i = p; } }
  pop() { const h = this.h, top = h[0], last = h.pop();
    if (h.length) { h[0] = last; let i = 0;
      for (;;) { let l = 2 * i + 1, r = l + 1, m = i;
        if (l < h.length && h[l][0] < h[m][0]) m = l;
        if (r < h.length && h[r][0] < h[m][0]) m = r;
        if (m === i) break; [h[m], h[i]] = [h[i], h[m]]; i = m; } }
    return top; }
}
function dijkstra(graph, source) {
  if (!graph.has(source)) throw new Error(`Source "${source}" is not in the graph`);
  const dist = new Map(), prev = new Map(), done = new Set(), steps = [];
  graph.nodes.forEach(n => dist.set(n, Infinity));
  dist.set(source, 0);
  const pq = new MinHeap(); pq.push([0, source]);
  while (pq.size) {
    const [d, u] = pq.pop();
    if (done.has(u)) continue;            // stale queue entry
    done.add(u);
    const relax = [];
    for (const [v, w] of graph.adj.get(u)) {
      if (done.has(v)) continue;
      const nd = d + w;
      if (nd < dist.get(v)) { relax.push({ v, old: dist.get(v), nd }); dist.set(v, nd); prev.set(v, u); pq.push([nd, v]); }
    }
    steps.push({ u, d, relax });
  }
  return { dist, prev, steps };
}
function shortestPath(graph, source, target) {
  if (!graph.has(target)) throw new Error(`Destination "${target}" is not in the graph`);
  const { dist, prev, steps } = dijkstra(graph, source);
  if (dist.get(target) === Infinity) return { path: null, distance: Infinity, steps };
  const path = [target];
  while (path[0] !== source) path.unshift(prev.get(path[0]));
  return { path, distance: dist.get(target), steps };
}
if (typeof module !== "undefined") module.exports = { dijkstra, shortestPath, MinHeap };
