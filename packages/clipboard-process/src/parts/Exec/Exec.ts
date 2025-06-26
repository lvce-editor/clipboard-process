import { spawn } from 'node:child_process'
import type { ExecResult } from '../ExecResult/ExecResult.ts'
import { isAllowedCommand } from '../IsAllowedCommand/IsAllowedCommand.ts'
import { NotAllowedError } from '../NotAllowedError/NotAllowedError.ts'
import { waitForProcessToExit } from '../WaitForProcessToExit/WaitForProcessToExit.ts'
import { writeToProcessStdin } from '../WriteToProcessStdin/WriteToProcessStdin.ts'

export const exec = async (command: string, args: readonly any[], stdin: string): Promise<ExecResult> => {
  if (!isAllowedCommand(command)) {
    throw new NotAllowedError(command)
  }
  const child = spawn(command, args)
  const exitPromise = waitForProcessToExit(child)
  if (stdin) {
    await writeToProcessStdin(child.stdin, stdin)
  }
  await exitPromise
  return {
    stderr: '',
    stdout: '',
    exitCode: 0,
  }
}
