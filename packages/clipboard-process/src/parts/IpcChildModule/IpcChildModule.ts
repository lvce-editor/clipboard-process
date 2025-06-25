import type { Rpc } from '@lvce-editor/rpc'
import { NodeForkedProcessRpcClient, NodeWorkerRpcClient } from '@lvce-editor/rpc'
import * as IpcChildType from '../IpcChildType/IpcChildType.ts'

interface RpcFactory {
  (options: any): Promise<Rpc>
}

export const getModule = (method: number): RpcFactory => {
  switch (method) {
    case IpcChildType.NodeForkedProcess:
      return NodeForkedProcessRpcClient.create
    case IpcChildType.NodeWorker:
      return NodeWorkerRpcClient.create
    default:
      throw new Error('unexpected ipc type')
  }
}
