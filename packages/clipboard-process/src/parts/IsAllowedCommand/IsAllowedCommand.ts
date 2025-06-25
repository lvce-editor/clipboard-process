import { allowedCommands } from '../AllowedCommands/AllowedCommands.ts'

export const isAllowedCommand = (command: string): boolean => {
  return allowedCommands.includes(command)
}
