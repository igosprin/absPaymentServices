import { getCassettesByTerminalId } from '../../../database/cassette'
import { IDefaultResponse } from '../../../interfaces/common'


async function getCassette(id: string): Promise<IDefaultResponse> {
  try {
    return await getCassettesByTerminalId(id)
  } catch (error) {
    throw error
  }
}

export {
  getCassette
}