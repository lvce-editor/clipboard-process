export class NotAllowedError extends Error {
  constructor(command: string) {
    super(`command is not allowed: ${command}`)
    this.name = 'NotAllowedError'
  }
}
