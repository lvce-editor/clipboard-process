export interface ExecResult {
  readonly stdout: string
  readonly stderr: string
  readonly exitCode: number | undefined
}
