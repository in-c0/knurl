import * as K from "../src/index";
(window as any).K = K;
const ids = (window as any).IDS as string[];
const rows = (window as any).ROWS as [string,string][];
for (const [theme, finish] of rows) {
  const row = document.createElement("div"); row.className = "row " + theme; document.body.appendChild(row);
  for (const id of ids) {
    for (const st of [0, 1]) {
      const cell = document.createElement("div"); cell.className = "cell"; row.appendChild(cell);
      const el = document.createElement("div"); cell.appendChild(el);
      const f = (K as any)[id];
      const extra = (window as any).EXTRA?.[id]?.[st] ?? {};
      f(el, { theme, finish, ...extra });
    }
  }
}
