/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

// Skip prepare when installing globally (workspaces not supported)
// npm_config_global is set to 'true' when running with -g flag
if (process.env.npm_config_global === 'true') {
  console.log('Skipping prepare script for global installation');
  process.exit(0);
}

// Run husky install
try {
  execSync('husky', { stdio: 'inherit', cwd: root });
} catch (e) {
  console.warn('Husky install skipped:', e.message);
}

// Build only if node_modules exists (i.e., not during initial npm install)
if (existsSync(join(root, 'node_modules'))) {
  execSync('npm run build', { stdio: 'inherit', cwd: root });
  execSync('npm run bundle', { stdio: 'inherit', cwd: root });
}
