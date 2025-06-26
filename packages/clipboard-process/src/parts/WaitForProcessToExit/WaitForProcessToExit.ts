/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import type { ChildProcessWithoutNullStreams } from 'node:child_process'

export const waitForProcessToExit = async (child: ChildProcessWithoutNullStreams): Promise<void> => {
  const { resolve, promise } = Promise.withResolvers<void>()
  const cleanup = (): void => {
    child.off('exit', handleExit)
  }
  const handleExit = (): void => {
    cleanup()
    resolve()
  }
  child.on('exit', handleExit)
  await promise
}
