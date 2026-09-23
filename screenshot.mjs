// screenshot.mjs — capture a page with Puppeteer into ./temporary screenshots/
//
// Usage:
//   node screenshot.mjs <url> [label] [options]
//
//   node screenshot.mjs http://localhost:3000        -> temporary screenshots/screenshot-N.png
//   node screenshot.mjs http://localhost:3000 hero   -> temporary screenshots/screenshot-N-hero.png
//
// Options:
//   --width=1440   viewport width  (default 1440)
//   --height=900   viewport height (default 900)
//   --scale=1      deviceScaleFactor (default 1)
//   --mobile       shortcut for --width=390 --height=844 --scale=2
//   --no-full      capture the viewport only instead of the full page
//   --no-scroll    skip the pre-capture scroll that triggers lazy/reveal content
//   --wait=500     extra ms to wait after load before capturing (default 500)
//
// N auto-increments from the highest existing screenshot-N*.png; files are never overwritten.
//
// Puppeteer is resolved from ./node_modules first, then from %LOCALAPPDATA%\Temp\puppeteer-test
// (its Chrome lives in %USERPROFILE%\.cache\puppeteer). If neither exists, the install command is printed.

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(ROOT, 'temporary screenshots');
const USAGE = 'Usage: node screenshot.mjs <url> [label] [--width=N] [--height=N] [--scale=N] [--mobile] [--no-full] [--no-scroll] [--wait=ms]';

function fail(msg) {
  console.error(msg);
  process.exit(1);
}

// ---- args -------------------------------------------------------------------
const positional = [];
const opts = { width: 1440, height: 900, scale: 1, full: true, scroll: true, wait: 500 };
for (const arg of process.argv.slice(2)) {
  if (!arg.startsWith('--')) { positional.push(arg); continue; }
  const [key, raw] = arg.slice(2).split('=');
  switch (key) {
    case 'width':     opts.width  = Number(raw); break;
    case 'height':    opts.height = Number(raw); break;
    case 'scale':     opts.scale  = Number(raw); break;
    case 'wait':      opts.wait   = Number(raw); break;
    case 'mobile':    Object.assign(opts, { width: 390, height: 844, scale: 2 }); break;
    case 'no-full':   opts.full = false; break;
    case 'no-scroll': opts.scroll = false; break;
    default: fail(`Unknown option --${key}\n${USAGE}`);
  }
}
const [url, label] = positional;
if (!url) fail(USAGE);
if (/^file:/i.test(url)) fail('Refusing to screenshot a file:// URL. Start the server (node serve.mjs) and use http://localhost:3000 instead.');
for (const k of ['width', 'height', 'scale', 'wait']) {
  if (!Number.isFinite(opts[k]) || opts[k] < 0) fail(`--${k} must be a number\n${USAGE}`);
}

// ---- resolve puppeteer -------------------------------------------------------
const LOCALAPPDATA = process.env.LOCALAPPDATA || path.join(os.homedir(), 'AppData', 'Local');
const PUPPETEER_DIRS = [
  ROOT,
  path.join(LOCALAPPDATA, 'Temp', 'puppeteer-test'),
  path.join(os.tmpdir(), 'puppeteer-test'),
];

function loadPuppeteer() {
  for (const dir of PUPPETEER_DIRS) {
    try {
      const mod = createRequire(path.join(dir, 'package.json'))('puppeteer');
      return { puppeteer: mod.default ?? mod, dir };
    } catch (err) {
      if (err.code !== 'MODULE_NOT_FOUND') throw err;
    }
  }
  fail([
    'Puppeteer not found. Install it with:',
    `  mkdir "${PUPPETEER_DIRS[1]}"`,
    `  cd /d "${PUPPETEER_DIRS[1]}"`,
    '  npm init -y && npm install puppeteer',
  ].join('\n'));
}

// ---- output path -------------------------------------------------------------
function nextOutputPath() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  let max = 0;
  for (const name of fs.readdirSync(OUT_DIR)) {
    const m = /^screenshot-(\d+)(?:-.*)?\.png$/i.exec(name);
    if (m) max = Math.max(max, Number(m[1]));
  }
  const safeLabel = label ? label.replace(/[^\w.-]+/g, '-').replace(/^-+|-+$/g, '') : '';
  return path.join(OUT_DIR, `screenshot-${max + 1}${safeLabel ? '-' + safeLabel : ''}.png`);
}

// ---- capture -----------------------------------------------------------------
// Scroll through the page once so lazy images and scroll-reveal animations have fired
// before a full-page capture, then return to the top.
async function autoScroll(page) {
  await page.evaluate(async () => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const step = Math.max(200, Math.floor(window.innerHeight * 0.8));
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await sleep(60);
    }
    window.scrollTo(0, document.documentElement.scrollHeight);
    await sleep(150);
    window.scrollTo(0, 0);
    await sleep(150);
  });
}

const { puppeteer, dir } = loadPuppeteer();
const outPath = nextOutputPath();
const browser = await puppeteer.launch({ headless: true });
try {
  const page = await browser.newPage();
  await page.setViewport({ width: opts.width, height: opts.height, deviceScaleFactor: opts.scale });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 60_000 });
  if (opts.full && opts.scroll) await autoScroll(page);
  if (opts.wait > 0) await new Promise((r) => setTimeout(r, opts.wait));
  await page.screenshot({ path: outPath, fullPage: opts.full });
} finally {
  await browser.close();
}
console.log(`Saved ${path.relative(ROOT, outPath)}`);
console.log(`  ${opts.width}x${opts.height} @${opts.scale}x, ${opts.full ? 'full page' : 'viewport only'}, puppeteer from ${dir}`);
