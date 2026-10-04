import { mkdirSync, readFileSync, realpathSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export function generateRecords() {
  return Array.from({ length: 100000 }, (_, index) => {
    const id = index + 1;
    return {
      id,
      name: `Record ${String(id).padStart(6, '0')}`,
      description: `Synthetic entry ${id} in collection ${Math.ceil(id / 1000)}. Neutral mock data for exploring large lists.`,
    };
  });
}

if (process.argv[1] && realpathSync(process.argv[1]) === realpathSync(fileURLToPath(import.meta.url))) {
  const asset = new URL('../src/assets/lab/records.json', import.meta.url);
  const expected = `${JSON.stringify(generateRecords())}\n`;
  if (process.argv.includes('--check')) {
    if (readFileSync(asset, 'utf8') !== expected) {
      throw new Error('Lab asset is stale. Run node scripts/generate-lab-records.mjs');
    }
    console.log('Verified 100,000 deterministic lab records.');
  } else {
    mkdirSync(new URL('.', asset), { recursive: true });
    writeFileSync(asset, expected);
    console.log('Generated 100,000 synthetic lab records.');
  }
}
