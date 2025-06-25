import { join } from 'node:path'
import { root } from './root.ts'

export const instantiations = 5000

export const instantiationsPath = join(root, 'packages', 'clipboard-process')
