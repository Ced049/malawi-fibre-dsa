
class Graph {
  constructor() { this.adj = new Map(); }
  addNode(n) { if (!this.adj.has(n)) this.adj.set(n, new Map()); }
  addEdge(a, b, w) {
    if (typeof w !== "number" || !isFinite(w)) throw new Error(`Invalid weight on ${a}-${b}`);
    if (w < 0) throw new Error(`Negative weight (${w}) on ${a}-${b}: Dijkstra requires non-negative weights`);
    this.addNode(a); this.addNode(b);
    this.adj.get(a).set(b, w); this.adj.get(b).set(a, w);   // undirected
  }
  has(n) { return this.adj.has(n); }
  get nodes() { return [...this.adj.keys()]; }
  get edges() {
    const out = [], seen = new Set();
    for (const [a, nb] of this.adj) for (const [b, w] of nb) {
      const k = [a, b].sort().join("|");
      if (!seen.has(k)) { seen.add(k); out.push({ a, b, w }); }
    }
    return out;
  }
  isConnected() {
    const ns = this.nodes; if (!ns.length) return true;
    const seen = new Set([ns[0]]), st = [ns[0]];
    while (st.length) for (const v of this.adj.get(st.pop()).keys()) if (!seen.has(v)) { seen.add(v); st.push(v); }
    return seen.size === ns.length;
  }
}
function buildMalawiGraph(nodes, edges) {
  const g = new Graph();
  nodes.forEach(n => g.addNode(n[0]));
  edges.forEach(e => g.addEdge(e[0], e[1], e[2]));
  return g;
}
if (typeof module !== "undefined") module.exports = { Graph, buildMalawiGraph };
