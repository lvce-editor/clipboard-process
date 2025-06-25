import { execa } from 'execa'

export const exec = async (command: string, args: readonly any[]): Promise<void> => {
  await execa(command, args, {})
}
