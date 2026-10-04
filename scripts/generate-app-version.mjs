import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const checkOnly = args.includes('--check');

function optionValue(name, fallback) {
  const index = args.indexOf(name);
  return index === -1 ? fallback : args[index + 1];
}

const packagePath = resolve(
  repositoryRoot,
  optionValue('--package', 'package.json'),
);
const outputPath = resolve(
  repositoryRoot,
  optionValue('--output', 'src/app/generated/app-version.ts'),
);

function main() {
  let manifest;
  try {
    manifest = JSON.parse(readFileSync(packagePath, 'utf8'));
  } catch (error) {
    throw new Error(`Unable to read package metadata at ${packagePath}: ${error.message}`);
  }

  const version = manifest?.version;
  if (typeof version !== 'string' || !/^\d+\.\d+\.\d+$/.test(version)) {
    throw new Error('package.json must contain a numeric CalVer version in YY.MAJOR.PATCH format');
  }

  const content = `export const APP_VERSION = '${version}';\n`;
  if (checkOnly) {
    let existing;
    try {
      existing = readFileSync(outputPath, 'utf8');
    } catch (error) {
      throw new Error(`Generated version file is missing or unreadable: ${error.message}`);
    }
    if (existing !== content) {
      throw new Error(`${outputPath} is stale; run the app-version generator`);
    }
    return;
  }

  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, content);
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
