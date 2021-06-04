import { IDefaultResponse } from "../interfaces/common"

function resultBuilder (result: boolean, data?: any, error?: string): IDefaultResponse {
  try {
    if (!status) return { result, error }
    return { result, data }
  } catch (error) {
    throw error
  }
}

export {
  resultBuilder
}