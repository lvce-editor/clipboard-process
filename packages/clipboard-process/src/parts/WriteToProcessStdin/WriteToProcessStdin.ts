import type Stream from 'node:stream'

// eslint-disable-next-line  @typescript-eslint/prefer-readonly-parameter-types
export const writeToProcessStdin = async (stdin: Stream.Writable, input: string): Promise<void> => {
  const { resolve, promise } = Promise.withResolvers<any>()
  stdin.write(input, resolve)
  await promise
}
