import { execa } from 'execa'
import { isAllowedCommand } from '../IsAllowedCommand/IsAllowedCommand.ts'

export const exec = async (command: string, args: readonly any[]): Promise<void> => {
  if (!isAllowedCommand(command)) {
    throw new Error(`command is not allowed: ${command}`)
  }
  await execa(command, args, {})
}
