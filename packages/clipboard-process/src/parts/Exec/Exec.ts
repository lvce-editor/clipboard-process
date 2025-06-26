import { spawn } from 'node:child_process'
import type { ExecResult } from '../ExecResult/ExecResult.ts'
import { isAllowedCommand } from '../IsAllowedCommand/IsAllowedCommand.ts'
import { NotAllowedError } from '../NotAllowedError/NotAllowedError.ts'

export const exec = async (command: string, args: readonly any[], stdin: string): Promise<ExecResult> => {
  if (!isAllowedCommand(command)) {
    throw new NotAllowedError(command)
  }
  const child = spawn(command, args)
  const { resolve, promise } = Promise.withResolvers()
  child.on('exit', resolve)
  if (stdin) {
    child.stdin.write(stdin, () => {
      child.stdin.end()
    })
  }
  let stdout = ''
  child.stdout.on('data', (data) => {
    stdout += data
  })
  await promise
  return {
    stderr: '',
    stdout,
    exitCode: 0,
  }
}
