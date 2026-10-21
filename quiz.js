// Shared quiz data and helpers for index.html (students) and host.html (host).
window.QS = [
 {s:"It rained heavily; ___, the match continued.",o:["Nevertheless","Therefore","Moreover","Conversely"],a:0,w:"The match went on despite the rain, so we need contrast."},
 {s:"She didn't study at all; ___, she failed the test.",o:["Nonetheless","Consequently","Furthermore","On the contrary"],a:1,w:"Failing is the result of not studying."},
 {s:"The hotel was cheap. ___, it was close to the station.",o:["Hence","Conversely","Moreover","Even so"],a:2,w:"We are adding another good point."},
 {s:"He isn't lazy. ___, he is the hardest worker in the team.",o:["Therefore","On the contrary","In addition","As a result"],a:1,w:"It rejects the first idea and states the opposite is true."},
 {s:"Summers in Delhi are very hot; ___, winters are freezing.",o:["Accordingly","Not to mention","Conversely","Hence"],a:2,w:"It compares two opposite sides of the same thing."},
 {s:"The roads were blocked. ___, we reached college late.",o:["Nevertheless","As a result","Moreover","On the contrary"],a:1,w:"Being late was caused by the blocked roads."},
 {s:"The plan is risky. ___, it is worth trying.",o:["Hence","Furthermore","Even so","Accordingly"],a:2,w:"Despite the risk, still worth it: contrast."},
 {s:"He speaks English and Hindi fluently, ___ a little French.",o:["conversely","not to mention","hence","nonetheless"],a:1,w:"It adds an extra point, almost as a bonus."},
 {s:"The teacher explained the new rules, and the class acted ___.",o:["conversely","nevertheless","accordingly","moreover"],a:2,w:"They acted in a way that matched the rules."},
 {s:"All humans are mortal and Ravi is human; ___, Ravi is mortal.",o:["nonetheless","therefore","in addition","on the contrary"],a:1,w:"A logical conclusion from the facts."},
 {s:"The project was very difficult; ___, the team finished on time.",o:["hence","furthermore","conversely","nonetheless"],a:3,w:"They finished despite the difficulty."},
 {s:"Winners get a certificate. ___, they receive a cash prize.",o:["Even so","In addition","Conversely","Consequently"],a:1,w:"It adds a second reward."},
 {s:"The bridge is very old; ___, heavy trucks are not allowed on it.",o:["moreover","even so","hence","conversely"],a:2,w:"The ban is a result of the bridge being old."},
 {s:"The phone has a great camera. ___, its battery lasts two days.",o:["Nevertheless","On the contrary","Accordingly","Furthermore"],a:3,w:"It adds another strong feature."}
];
window.PTS = 10;

window.membersOf = g => Object.keys((g && g.members) || {});
window.namesOf = g => membersOf(g).map(u => ((g.names || {})[u]) || "Player");

// A question scores only when EVERY member of the group answered it correctly.
window.scoreOf = g => {
  const m = membersOf(g), ans = (g && g.ans) || {};
  let score = 0, done = 0;
  QS.forEach((q, i) => {
    const picks = m.map(u => (ans[u] || {})["q" + i]);
    if (m.length > 1 && picks.every(x => x != null)) { done++; if (picks.every(x => x === q.a)) score += PTS; }
  });
  return { score, done };
};

// Random groups of two; with an odd count the last three form one group, so nobody plays alone.
window.makeGroups = list => {
  const a = list.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  const groups = [];
  while (a.length >= 2) { if (a.length === 3) { groups.push(a.splice(0, 3)); break; } groups.push(a.splice(0, 2)); }
  return { groups, left: a };
};

window.ranked = groupsObj => Object.entries(groupsObj || {})
  .map(([id, g]) => ({ id, ...g, ...scoreOf(g) }))
  .filter(g => membersOf(g).length > 1)
  .sort((x, y) => y.score - x.score || y.done - x.done || (x.createdAt || 0) - (y.createdAt || 0));

window.el = (tag, props = {}, ...kids) => {
  const e = document.createElement(tag);
  for (const k in props) {
    if (k === "text") e.textContent = props[k];
    else if (k === "class") e.className = props[k];
    else if (k.startsWith("on")) e.addEventListener(k.slice(2), props[k]);
    else e.setAttribute(k, props[k]);
  }
  for (const c of kids) if (c != null && c !== false) e.append(c);
  return e;
};

window.configReady = () => {
  const c = window.FIREBASE_CONFIG || {};
  return c.databaseURL && !String(c.databaseURL).includes("PASTE") && c.apiKey && !String(c.apiKey).includes("PASTE");
};

window.renderBoard = (listEl, groupsObj, mineId) => {
  listEl.replaceChildren();
  const rows = ranked(groupsObj);
  if (!rows.length) { listEl.append(el("li", { class: "emptyrow" }, el("p", { class: "empty", text: "Groups appear here once the host starts the quiz." }))); return; }
  rows.forEach((r, i) => listEl.append(el("li", { class: (i < 3 && r.score > 0 ? "top " : "") + (r.id === mineId ? "mine" : "") },
    el("span", { class: "rank", text: String(i + 1) }),
    el("div", { class: "names" }, document.createTextNode(namesOf(r).join(" & ")), el("small", { text: `${r.done} of ${QS.length} answered` })),
    el("span", { class: "pts", text: String(r.score) }))));
};
