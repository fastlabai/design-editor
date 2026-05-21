/**
 * Rewrite @layerhub-io/* imports to local relative paths within the vendored engine.
 * Run from the repo root: node packages/design-editor/scripts/rewrite-layerhub-imports.mjs
 */
import { readFileSync, writeFileSync } from 'fs'
import { execSync } from 'child_process'
import path from 'path'

const ENGINE_DIR = 'packages/design-editor/src/engine'

const files = execSync(
  `grep -rl "@layerhub-io/" ${ENGINE_DIR} --include="*.ts" --include="*.tsx"`,
  { encoding: 'utf8' }
).trim().split('\n').filter(Boolean)

console.log(`Found ${files.length} files with @layerhub-io imports:`)

for (const filePath of files) {
  const fileDir = path.dirname(filePath)
  let content = readFileSync(filePath, 'utf8')

  // Compute relative path from this file's directory to each engine sub-package
  const toRelative = (targetPkg) => {
    const targetDir = path.join(ENGINE_DIR, targetPkg)
    let rel = path.relative(fileDir, targetDir)
    if (!rel.startsWith('.')) rel = './' + rel
    return rel
  }

  const replacements = [
    [/@layerhub-io\/core/g,    toRelative('core')],
    [/@layerhub-io\/objects/g, toRelative('objects')],
    [/@layerhub-io\/types/g,   toRelative('types')],
    [/@layerhub-io\/react/g,   toRelative('react')],
  ]

  let changed = false
  for (const [pattern, replacement] of replacements) {
    if (pattern.test(content)) {
      content = content.replace(pattern, replacement)
      changed = true
    }
  }

  if (changed) {
    writeFileSync(filePath, content)
    console.log(`  rewrote: ${filePath}`)
  }
}

console.log('Done.')
