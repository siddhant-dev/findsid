import { execFileSync, spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const generator = fileURLToPath(new URL('./generate-app-version.mjs', import.meta.url));

function fixture() {
  const directory = mkdtempSync(join(tmpdir(), 'findsid-version-'));
  const packagePath = join(directory, 'package.json');
  const outputPath = join(directory, 'app-version.ts');
  return {
    directory,
    packagePath,
    outputPath,
    run(...args) {
      return spawnSync(
        process.execPath,
        [generator, '--package', packagePath, '--output', outputPath, ...args],
        { encoding: 'utf8' },
      );
    },
    close() {
      rmSync(directory, { recursive: true, force: true });
    },
  };
}

test('generates deterministic typed metadata and checks freshness', () => {
  const temp = fixture();
  try {
    writeFileSync(temp.packagePath, JSON.stringify({ version: '26.1.2' }));
    execFileSync(process.execPath, [
      generator,
      '--package',
      temp.packagePath,
      '--output',
      temp.outputPath,
    ]);

    const expected = "export const APP_VERSION = '26.1.2';\n";
    if (readFileSync(temp.outputPath, 'utf8') !== expected) {
      throw new Error('Generator output was not deterministic');
    }
    if (temp.run('--check').status !== 0) {
      throw new Error('Fresh generated metadata failed its check');
    }
    writeFileSync(temp.packagePath, JSON.stringify({ version: '26.1.3' }));
    if (temp.run('--check').status === 0) {
      throw new Error('Stale generated metadata passed its check');
    }
  } finally {
    temp.close();
  }
});

test('rejects empty and malformed package versions instead of falling back', () => {
  const temp = fixture();
  try {
    for (const version of ['', 'latest', '26.1', null]) {
      writeFileSync(temp.packagePath, JSON.stringify({ version }));
      const result = temp.run();
      if (result.status === 0 || !result.stderr.includes('numeric CalVer version')) {
        throw new Error(`Invalid version ${String(version)} did not produce an explicit error`);
      }
    }
  } finally {
    temp.close();
  }
});
