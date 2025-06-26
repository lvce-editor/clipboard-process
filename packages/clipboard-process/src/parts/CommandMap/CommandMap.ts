import * as Exec from '../Exec/Exec.ts'
import * as HandleElectronMessagePort from '../HandleElectronMessagePort/HandleElectronMessagePort.ts'
import * as HandleWebSocket from '../HandleWebSocket/HandleWebSocket.ts'

export const commandMap = {
  'ClipBoard.exec': Exec.exec,
  'HandleElectronMessagePort.handleElectronMessagePort': HandleElectronMessagePort.handleElectronMessagePort,
  'HandleWebSocket.handleWebSocket': HandleWebSocket.handleWebSocket,
}
