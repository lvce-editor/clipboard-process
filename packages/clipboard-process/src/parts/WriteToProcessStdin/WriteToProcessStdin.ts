import type Stream from 'node:stream'

export const writeToProcessStdin = async (stdin: Stream.Writable, input: string): Promise<void> => {
  const { promise, resolve } = Promise.withResolvers<any>()
  stdin.write(input, resolve)
  await promise
}

export const closeStdin = async (stdin: Stream.Writable): Promise<void> => {
  const { promise, resolve } = Promise.withResolvers<any>()
  stdin.end(resolve)
  await promise
}
