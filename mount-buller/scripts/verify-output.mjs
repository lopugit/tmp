import { readFileSync, existsSync } from 'node:fs';
import assert from 'node:assert/strict';
const shell = readFileSync('.vercel/output/static/index.html', 'utf8');
assert.match(shell, /<div id="root"><\/div>/);
const config = JSON.parse(readFileSync('.vercel/output/config.json', 'utf8'));
assert.equal(config.version, 3);
assert.ok(config.routes.some(route => route.handle === 'filesystem'));
assert.ok(existsSync('.vercel/output/static/images'));
console.log('Verified Vite shell, static images and Vercel filesystem routing.');
