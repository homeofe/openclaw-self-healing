import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

// Smoke test: ensure the plugin module build artifact exists and can be imported.
// This test is intentionally defensive so CI fails with a clear message if the plugin
// hasn't been built yet.

const buildPath = path.resolve(__dirname, '../../openclaw-self-healing-elvatis/dist/index.js');

describe('openclaw-self-healing-elvatis - smoke', () => {
  it('has build artifact and can be imported', async () => {
    // First ensure build artifact exists
    const exists = fs.existsSync(buildPath);
    expect(exists, `Build artifact missing: ${buildPath}`).toBe(true);

    // If it exists, try to import it and ensure import doesn't throw
    let mod;
    try {
      mod = await import(buildPath).catch(() => undefined);
    } catch (e) {
      mod = undefined;
    }

    expect(mod, 'Import of built plugin failed or returned undefined').toBeDefined();
  });
});
