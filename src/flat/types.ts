export type StreamClientRecv = (msg: string, id: string, ...data: any[]) => void
export type StreamClientSend = (msg: string, data: any[]) => Promise<any>

export type StreamServerRecv = (msg: string, data: any[]) => any
export type StreamServerSend = (msg: string, id: string, ...data: any[]) => void
