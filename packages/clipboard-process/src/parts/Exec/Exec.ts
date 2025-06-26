/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { spawn } from 'node:child_process'
import type { ExecResult } from '../ExecResult/ExecResult.ts'
import { isAllowedCommand } from '../IsAllowedCommand/IsAllowedCommand.ts'
import { NotAllowedError } from '../NotAllowedError/NotAllowedError.ts'
import { waitForProcessToExit } from '../WaitForProcessToExit/WaitForProcessToExit.ts'
import { writeToProcessStdin } from '../WriteToProcessStdin/WriteToProcessStdin.ts'

export const exec = async (
  command: string,
  args: readonly any[],
  stdin: string,
  stdio: ['pipe', 'ignore', 'ignore'],
): Promise<ExecResult> => {
  if (!isAllowedCommand(command)) {
    throw new NotAllowedError(command)
  }
  const child = spawn(command, args, {
    stdio,
  })
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
