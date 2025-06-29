import { execa } from 'execa'
import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { bundleJs } from './bundleJs.js'
import { root } from './root.js'

const dist = join(root, '.tmp', 'dist')

const readJson = async (path) => {
  const content = await readFile(path, 'utf8')
  return JSON.parse(content)
}

const writeJson = async (path, json) => {
  await writeFile(path, JSON.stringify(json, null, 2) + '\n')
}

const getGitTagFromGit = async () => {
  const { stdout, stderr, exitCode } = await execa('git', ['describe', '--exact-match', '--tags'], {
    reject: false,
  })
  if (exitCode) {
    if (exitCode === 128 && stderr.startsWith('fatal: no tag exactly matches')) {
      return '0.0.0-dev'
    }
    return '0.0.0-dev'
  }
  if (stdout.startsWith('v')) {
    return stdout.slice(1)
  }
  return stdout
}

const getVersion = async () => {
  const { env } = process
  const { RG_VERSION, GIT_TAG } = env
  if (RG_VERSION) {
    if (RG_VERSION.startsWith('v')) {
      return RG_VERSION.slice(1)
    }
    return RG_VERSION
  }
  if (GIT_TAG) {
    if (GIT_TAG.startsWith('v')) {
      return GIT_TAG.slice(1)
    }
    return GIT_TAG
  }
  return getGitTagFromGit()
}

await rm(dist, { recursive: true, force: true })
await mkdir(dist, { recursive: true })

await bundleJs()

await mkdir(join(root, 'packages', 'clipboard-process', 'dist'), { recursive: true })
await cp(join(root, '.tmp', 'dist', 'dist', 'index.js'), join(root, 'packages', 'clipboard-process', 'dist', 'index.js'))

const version = await getVersion()

const packageJson = await readJson(join(root, 'packages', 'clipboard-process', 'package.json'))

delete packageJson.scripts
delete packageJson.devDependencies
delete packageJson.prettier
delete packageJson.jest
delete packageJson.xo
delete packageJson.directories
delete packageJson.nodemonConfig
delete packageJson.dependencies['@lvce-editor/assert']
delete packageJson.dependencies['@lvce-editor/rpc']
delete packageJson.dependencies['@lvce-editor/json-rpc']
delete packageJson.dependencies['@lvce-editor/verror']
packageJson.version = version
packageJson.main = 'dist/index.js'

await writeJson(join(dist, 'package.json'), packageJson)

await mkdir(join(dist, 'bin'))
await writeFile(
  join(dist, 'bin', 'clipboardProcessMain.js'),
  `#!/usr/bin/env node

import '../dist/index.js'
`,
)

await cp(join(root, 'README.md'), join(dist, 'README.md'))
await cp(join(root, 'LICENSE'), join(dist, 'LICENSE'))
