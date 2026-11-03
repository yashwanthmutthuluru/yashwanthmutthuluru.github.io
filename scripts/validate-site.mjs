import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const requiredFiles = [
  'index.html',
  '404.html',
  'css/style.css',
  'js/main.js',
  'js/contact.js',
  'site.webmanifest',
  'sitemap.xml',
  'robots.txt',
  'img/profile.png',
  'img/og-image.png'
];

const failures = [];

function fail(message) {
  failures.push(message);
}

function read(filePath) {
  return fs.readFileSync(path.join(root, filePath), 'utf8');
}

function exists(filePath) {
  return fs.existsSync(path.join(root, filePath));
}

for (const filePath of requiredFiles) {
  if (!exists(filePath)) {
    fail(`Missing required file: ${filePath}`);
  }
}

const index = read('index.html');
const manifest = JSON.parse(read('site.webmanifest'));
const sitemap = read('sitemap.xml');
const robots = read('robots.txt');
const canonicalUrl = 'https://yashwanthmutthuluru.github.io/';
const owner = 'Yashwanth Sai Mutthuluru';

if (!index.includes('<main id="main-content"')) {
  fail('index.html must expose a <main id="main-content"> landmark.');
}

const skipLink = (index.match(/<a\b[^>]*class="[^"]*\bskip-link\b[^"]*"[^>]*>/) || [])[0] || '';
if (!skipLink || !/href="#main-content"/.test(skipLink)) {
  fail('Skip link must point to #main-content.');
}

const h1Count = (index.match(/<h1\b/g) || []).length;
if (h1Count !== 1) {
  fail(`Expected exactly one h1 in index.html, found ${h1Count}.`);
}

if (!index.includes('aria-controls="site-nav"')) {
  fail('Mobile navigation button must reference site-nav via aria-controls.');
}

if (!index.includes(`<link rel="canonical" href="${canonicalUrl}"`)) {
  fail('index.html must include the canonical homepage URL.');
}

if (!index.includes('<link rel="manifest" href="/site.webmanifest"')) {
  fail('index.html must link the web manifest.');
}

if (!index.includes(`content="${canonicalUrl}img/og-image.png"`)) {
  fail('Social preview metadata must use the purpose-built OG image.');
}

const targetBlankLinks = index.match(/<(?:a|form)\b[^>]*target="_blank"[^>]*>/g) || [];
for (const link of targetBlankLinks) {
  if (!/rel="[^"]*\bnoopener\b[^"]*\bnoreferrer\b[^"]*"/.test(link)) {
    fail(`External target="_blank" link is missing rel="noopener noreferrer": ${link}`);
  }
}

for (const file of ['index.html', '404.html']) {
  const html = read(file);
  const ids = new Set();
  for (const [, id] of html.matchAll(/\sid="([^"]+)"/g)) {
    if (ids.has(id)) fail(`${file} has duplicate id="${id}".`);
    ids.add(id);
  }

  const references = [
    ...html.matchAll(/href="#([^"]+)"/g),
    ...html.matchAll(/(?:aria-controls|aria-labelledby|aria-describedby|for)="([^"]+)"/g),
  ];
  for (const [, reference] of references) {
    for (const id of reference.split(/\s+/)) {
      if (!ids.has(id)) fail(`${file} references missing id="${id}".`);
    }
  }

  const localAssetRefs = [...html.matchAll(/(?:href|src)="([^"]+)"/g)]
    .map((match) => match[1])
    .filter((url) => !/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(url))
    .map((url) => url.split(/[?#]/)[0].replace(/^\//, ''))
    .filter(Boolean);
  for (const assetPath of localAssetRefs) {
    if (!exists(assetPath)) fail(`${file} references missing asset: ${assetPath}`);
  }
}

for (const id of ['about', 'experience', 'freelance', 'education', 'selected-work', 'expertise', 'recommendations', 'contact']) {
  const section = index.match(new RegExp(`<section\\b[^>]*\\bid="${id}"[^>]*>([\\s\\S]*?)</section>`));
  if (!section || !/<h2\b/.test(section[1])) {
    fail(`Expected section #${id} with an h2 heading.`);
  }
}

if (!/<a\b[^>]*href="#selected-work"[^>]*>Selected Work<\/a>/.test(index)) {
  fail('Selected Work navigation must point to #selected-work.');
}

if (manifest.name !== owner || manifest.short_name !== 'Yashwanth') {
  fail('Manifest branding must match the portfolio owner.');
}

for (const file of ['index.html', '404.html', 'site.webmanifest', 'sitemap.xml', 'robots.txt']) {
  if (/hitesh|jonnalagadda/i.test(read(file))) fail(`Outdated owner reference in ${file}.`);
}

for (const icon of manifest.icons || []) {
  const iconPath = icon.src.replace(/^\//, '');
  if (!exists(iconPath)) {
    fail(`Manifest icon is missing: ${icon.src}`);
  }
}

if (!sitemap.includes(`<loc>${canonicalUrl}</loc>`)) {
  fail('sitemap.xml must include the canonical homepage URL.');
}

if (!robots.includes(`Sitemap: ${canonicalUrl}sitemap.xml`)) {
  fail('robots.txt must reference the sitemap.');
}

if (/UA-\d+/i.test(index)) {
  fail('Deprecated Universal Analytics ID found in index.html.');
}

if (failures.length > 0) {
  console.error('Static site validation failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('Static site validation passed.');
