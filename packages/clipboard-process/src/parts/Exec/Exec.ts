import { spawn } from 'child_process'
import { isAllowedCommand } from '../IsAllowedCommand/IsAllowedCommand.ts'

interface ExecResult {
  readonly stdout: string
  readonly stderr: string
  readonly exitCode: number | undefined
}

export const exec = async (command: string, args: readonly any[], stdin: string): Promise<ExecResult> => {
  if (!isAllowedCommand(command)) {
    throw new Error(`command is not allowed: ${command}`)
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
