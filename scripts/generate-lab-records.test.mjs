import assert from 'node:assert/strict';
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';
import { generateRecords } from './generate-lab-records.mjs';

test('generates exactly 100,000 deterministic original records with IDs 1..100000', () => {
  const records = generateRecords();
  assert.equal(records.length, 100000);
  assert.deepEqual(records, generateRecords());
  assert.equal(new Set(records.map((row) => row.id)).size, 100000);
  records.forEach((row, index) => {
    assert.equal(row.id, index + 1);
    assert.deepEqual(Object.keys(row).sort(), ['description', 'id', 'name']);
    assert.ok(row.name.trim());
    assert.ok(row.description.trim());
  });
});

test('bundled asset equals deterministic generator output', () => {
  const asset = JSON.parse(readFileSync(new URL('../src/assets/lab/records.json', import.meta.url)));
  assert.deepEqual(asset, generateRecords());
});

test('check mode reports a missing/stale asset without writing it', () => {
  const result = spawnSync(process.execPath, ['scripts/generate-lab-records.mjs', '--check'], {
    encoding: 'utf8',
  });
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /100,000/);
});

test('check mode rejects missing and stale assets without changing them', () => {
  const directory = mkdtempSync(join(tmpdir(), 'findsid-lab-generator-'));
  try {
    mkdirSync(join(directory, 'scripts'));
    const script = join(directory, 'scripts/generate-lab-records.mjs');
    copyFileSync(new URL('./generate-lab-records.mjs', import.meta.url), script);
    const missing = spawnSync(process.execPath, [script, '--check'], { encoding: 'utf8' });
    assert.notEqual(missing.status, 0);
    assert.match(missing.stderr, /ENOENT/);
    mkdirSync(join(directory, 'src/assets/lab'), { recursive: true });
    const asset = join(directory, 'src/assets/lab/records.json');
    writeFileSync(asset, '[]\n');
    const stale = spawnSync(process.execPath, [script, '--check'], { encoding: 'utf8' });
    assert.notEqual(stale.status, 0);
    assert.match(stale.stderr, /stale/);
    assert.equal(readFileSync(asset, 'utf8'), '[]\n');
  } finally {
    rmSync(directory, { recursive: true });
  }
});
