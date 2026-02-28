#!/usr/bin/env bash
set -e

# 1. Install dependencies locally
echo "Installing dependencies..."
npm install

# 2. Build all packages (core, cli, etc.)
echo "Building packages..."
npm run build

# 3. Bundle the CLI into a single executable (dist/cli.js)
echo "Bundling CLI..."
npm run bundle

# 4. Install globally, skipping the build scripts that cause the error
echo "Installing globally..."
npm install -g . --ignore-scripts

echo "Installation complete! You can now run 'qwen'."
