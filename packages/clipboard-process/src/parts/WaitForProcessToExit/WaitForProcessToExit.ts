/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import type { ChildProcess } from 'node:child_process'

export const waitForProcessToExit = async (child: ChildProcess): Promise<void> => {
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
