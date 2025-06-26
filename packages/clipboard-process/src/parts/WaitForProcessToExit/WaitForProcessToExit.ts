import type { ChildProcessWithoutNullStreams } from 'node:child_process'

export const waitForProcessToExit = async (child: ChildProcessWithoutNullStreams): Promise<void> => {
  const { resolve, promise } = Promise.withResolvers<void>()
  const cleanup = () => {
    child.off('exit', handleExit)
  }
  const handleExit = () => {
    cleanup()
    resolve()
  }
  child.on('exit', handleExit)
  await promise
}
