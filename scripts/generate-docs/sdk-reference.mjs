#!/usr/bin/env node

import { readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const PACKAGE_ROOT = resolve(SCRIPT_DIR, "..", "..");
const REPO_ROOT = resolve(PACKAGE_ROOT, "..", "..");
const SDK_ENTRY = resolve(PACKAGE_ROOT, "sdk/javascript/src/index.ts");
const DOCS_OUT = resolve(PACKAGE_ROOT, "docs/sdk/javascript");

function run(command, args) {
  const result = spawnSync(command, args, {
    cwd: REPO_ROOT,
    env: process.env,
    stdio: "inherit",
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

async function injectPackageName() {
  const files = await readdir(DOCS_OUT);
  for (const file of files) {
    if (!file.endsWith('.mdx')) continue;
    const fullPath = resolve(DOCS_OUT, file);
    const source = await readFile(fullPath, 'utf8');
    let updated = source;

    if (file !== 'index.mdx') {
      updated = updated.replace(
        /<SDKFunctionPageInteractive data=\{(\{[\s\S]*\})\} \/>/,
        (_match, json) => {
          const data = JSON.parse(json);
          data.packageName = '@chris-test/fide-id';
          return `<SDKFunctionPageInteractive data={${JSON.stringify(data)}} />`;
        },
      );
    } else {
      updated = updated.replace(
        /description: ".*"/,
        'description: "JavaScript SDK reference for Fide ID."',
      );
    }

    if (updated !== source) {
      await writeFile(fullPath, updated, 'utf8');
    }
  }
}

run('pnpm', [
  'exec',
  'lally',
  'fumadocs',
  'generate',
  'sdk',
  '--app',
  'apps/docs',
  '--entry',
  SDK_ENTRY,
  '--out',
  DOCS_OUT,
  '--package-name',
  '@chris-test/fide-id',
  '--title',
  'SDK',
  '--component-import-path',
  '@/components/sdk-layout/sdk-function-page-interactive',
  '--component-export-name',
  'SDKFunctionPageInteractive',
  '--component-file-path',
  'src/components/sdk-layout/sdk-function-page-interactive.tsx',
]);

await injectPackageName();
