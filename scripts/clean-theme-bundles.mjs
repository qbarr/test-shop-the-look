import fs from 'fs'
import path from 'path'

const rootDir = process.cwd()
const assetsDir = path.join(rootDir, 'assets')
const viteSnippetPath = path.join(rootDir, 'snippets', 'vite.liquid')
const bundlePattern = /^theme-.*\.(css|js|css\.map|js\.map)$/

function getReferencedBundles (snippetSource) {
  const matches = snippetSource.match(/theme-[^"'\\s]+?\.(?:css|js)/g) ?? []
  return new Set(matches)
}

function getBundlesToKeep (snippetSource) {
  const referencedBundles = getReferencedBundles(snippetSource)
  const bundlesToKeep = new Set(referencedBundles)

  for (const fileName of referencedBundles) {
    if (fileName.endsWith('.js')) bundlesToKeep.add(`${fileName}.map`)
    if (fileName.endsWith('.css')) bundlesToKeep.add(`${fileName}.map`)
  }

  return bundlesToKeep
}

function cleanThemeBundles () {
  if (!fs.existsSync(assetsDir) || !fs.existsSync(viteSnippetPath)) return

  const viteSnippet = fs.readFileSync(viteSnippetPath, 'utf8')
  const bundlesToKeep = getBundlesToKeep(viteSnippet)
  const assetFileNames = fs.readdirSync(assetsDir)

  for (const fileName of assetFileNames) {
    if (!bundlePattern.test(fileName) || bundlesToKeep.has(fileName)) continue

    fs.unlinkSync(path.join(assetsDir, fileName))
  }
}

cleanThemeBundles()
