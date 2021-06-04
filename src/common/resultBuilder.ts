import { IDefaultResponse } from "../interfaces/common"

function resultBuilder (result: boolean, data?: any, error?: string): IDefaultResponse {
  try {
    if (!result) return { result, error }
    return { result, data }
  } catch (error) {
    console.error(error)
    throw new Error(error)
  }
}

export {
  resultBuilder
}