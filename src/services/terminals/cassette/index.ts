import { getByTerminalId } from '../../../database/cassettes'
import { IDefaultResponse } from '../../../interfaces/common'


async function getCassettesByTerminalId(id: string): Promise<IDefaultResponse> {
  try {
    return await getByTerminalId(id)
  } catch (error) {
    throw error
  }
}

export {
  getCassettesByTerminalId
}