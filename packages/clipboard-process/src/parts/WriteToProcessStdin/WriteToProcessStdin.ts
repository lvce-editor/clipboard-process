/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import type Stream from 'node:stream'

export const writeToProcessStdin = async (stdin: Stream.Writable, input: string): Promise<void> => {
  const { resolve, promise } = Promise.withResolvers<any>()
  stdin.write(input, resolve)
  await promise
}

export const closeStdin = async (stdin: Stream.Writable): Promise<void> => {
  const { resolve, promise } = Promise.withResolvers<any>()
  stdin.end(resolve)
  await promise
}
