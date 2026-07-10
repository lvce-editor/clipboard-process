export interface ExecResult {
  readonly exitCode: number | undefined
  readonly stderr: string
  readonly stdout: string
}
