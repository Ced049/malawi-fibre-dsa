
const _D = typeof module !== "undefined";
const _G = _D ? require("./graph") : { Graph, buildMalawiGraph };
const _DJ = _D ? require("./dijkstra") : { dijkstra, shortestPath };
const _M = _D ? require("./mst") : { kruskal, prim };
const _DATA = _D ? require("./data") : { MALAWI_NODES, MALAWI_EDGES };

function runTests() {
  const { Graph, buildMalawiGraph } = _G, { dijkstra, shortestPath } = _DJ, { kruskal, prim } = _M;
  const g = buildMalawiGraph(_DATA.MALAWI_NODES, _DATA.MALAWI_EDGES);
  const out = [];
  const t = (id, input, expected, fn) => {
    let actual, pass;
    try { actual = fn(); pass = actual === expected; } catch (e) { actual = "Error: " + e.message; pass = actual === expected; }
    out.push({ id, input, expected: String(expected), actual: String(actual), pass });
  };
  const sp = (a, b) => { const r = shortestPath(g, a, b); return r.path ? `${r.path.join(" > ")} = ${r.distance} km` : "No path"; };

  t("T1", "Number of nodes", 24, () => g.nodes.length);
  t("T2", "Number of edges", 31, () => g.edges.length);
  t("T3", "Graph is connected?", true, () => g.isConnected());
  t("T4", "Lilongwe -> Lilongwe (source = destination)", "Lilongwe = 0 km", () => sp("Lilongwe", "Lilongwe").replace(/^Lilongwe > /, ""));
  t("T5", "Lilongwe -> Kasungu (direct link is shortest)", "Lilongwe > Kasungu = 125 km", () => sp("Lilongwe", "Kasungu"));
  t("T6", "Lilongwe -> Blantyre", "Lilongwe > Dedza > Ntcheu > Balaka > Blantyre = 375 km", () => sp("Lilongwe", "Blantyre"));
  t("T7", "Karonga -> Nsanje (longest route in the country)", "Karonga > Rumphi > Mzuzu > Nkhata Bay > Nkhotakota > Salima > Mangochi > Balaka > Blantyre > Chikwawa > Nsanje = 1095 km", () => sp("Karonga", "Nsanje"));
  t("T8", "Chitipa -> Nkhata Bay", "Chitipa > Karonga > Rumphi > Mzuzu > Nkhata Bay = 370 km", () => sp("Chitipa", "Nkhata Bay"));
  t("T9", "Symmetry: dist(Zomba,Mzuzu) == dist(Mzuzu,Zomba)", true, () => shortestPath(g, "Zomba", "Mzuzu").distance === shortestPath(g, "Mzuzu", "Zomba").distance);
  t("T10", "Source not in graph: Dijkstra from 'Atlantis'", 'Error: Source "Atlantis" is not in the graph', () => dijkstra(g, "Atlantis"));
  t("T11", "Destination not in graph: Lilongwe -> 'Narnia'", 'Error: Destination "Narnia" is not in the graph', () => shortestPath(g, "Lilongwe", "Narnia"));
  t("T12", "Negative weight edge A-B = -5", "Error: Negative weight (-5) on A-B: Dijkstra requires non-negative weights", () => new Graph().addEdge("A", "B", -5));
  t("T13", "Non-numeric weight 'abc'", "Error: Invalid weight on A-B", () => new Graph().addEdge("A", "B", "abc"));
  t("T14", "Disconnected graph: add isolated town 'Island' ; Lilongwe -> Island", "No path", () => { const h = buildMalawiGraph(_DATA.MALAWI_NODES, _DATA.MALAWI_EDGES); h.addNode("Island"); const r = shortestPath(h, "Lilongwe", "Island"); return r.path ? "path" : "No path"; });
  t("T15", "Single-node graph: Solo -> Solo", "Solo = 0 km", () => { const h = new Graph(); h.addNode("Solo"); const r = shortestPath(h, "Solo", "Solo"); return `${r.path.join(" > ")} = ${r.distance} km`; });
  t("T16", "Tie / zero-weight edge: A-B 0, B-C 5, A-C 5 ; A -> C distance", 5, () => { const h = new Graph(); h.addEdge("A", "B", 0); h.addEdge("B", "C", 5); h.addEdge("A", "C", 5); return shortestPath(h, "A", "C").distance; });
  t("T17", "Cross-check: Dijkstra == Floyd-Warshall for all 576 ordered pairs", true, () => {
    const ns = g.nodes, d = {}; ns.forEach(a => { d[a] = {}; ns.forEach(b => d[a][b] = a === b ? 0 : Infinity); });
    g.edges.forEach(e => { d[e.a][e.b] = e.w; d[e.b][e.a] = e.w; });
    ns.forEach(k => ns.forEach(i => ns.forEach(j => { if (d[i][k] + d[k][j] < d[i][j]) d[i][j] = d[i][k] + d[k][j]; })));
    return ns.every(a => { const r = dijkstra(g, a).dist; return ns.every(b => r.get(b) === d[a][b]); });
  });
  t("T18", "Kruskal MST: total weight (km)", 1790, () => kruskal(g).total);
  t("T19", "Prim MST (start Lilongwe): total weight (km)", 1790, () => prim(g, "Lilongwe").total);
  t("T20", "MST has exactly V-1 = 23 edges (Kruskal and Prim)", true, () => kruskal(g).edges.length === 23 && prim(g, "Lilongwe").edges.length === 23);
  t("T21", "Prim gives same total from every possible start node", true, () => g.nodes.every(n => prim(g, n).total === 1790));
  t("T22", "Disconnected graph: Kruskal reports no spanning tree", false, () => { const h = new Graph(); h.addEdge("A", "B", 1); h.addNode("C"); return kruskal(h).spanning; });
  return out;
}
if (_D) module.exports = { runTests };
