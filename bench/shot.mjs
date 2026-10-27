// usage: node bench/shot.mjs ids out.png [zoom]  — builds the bench and screenshots it
import { build } from "esbuild";
import { chromium } from "/home/claude/tools/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const [ids, out, zoom = "2", extra = "{}"] = process.argv.slice(2);
await build({ entryPoints: ["bench/entry.ts"], bundle: true, outfile: "bench/out.js", format: "iife", logLevel: "error" });
writeFileSync("bench/index.html", `<!doctype html><meta charset=utf-8><style>
body{margin:0;font-family:system-ui}.row{display:flex;gap:28px;padding:28px;align-items:center;flex-wrap:wrap}[data-knurl]{width:${process.env.W||132}px!important}.light{background:#fff}.dark{background:#09090b;color-scheme:dark}
</style><script>IDS=${JSON.stringify(ids.split(","))};EXTRA=${extra};ROWS=${process.env.ROWS||JSON.stringify([["light","line"],["light","solid"],["dark","line"],["dark","solid"]])}</script><script src="out.js" defer></script>`);
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1400, height: 400 }, deviceScaleFactor: Number(zoom) });
p.on("pageerror", (e) => console.log("PAGEERROR", e.message));
p.on("console", (m) => m.type() === "error" && console.log("CONSOLE", m.text()));
await p.goto("file://" + process.cwd() + "/bench/index.html");
await p.waitForTimeout(1200);
await p.screenshot({ path: out, fullPage: true });
await b.close();
