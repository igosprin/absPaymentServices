import { resultBuilder } from "../../common/resultBuilder";
import { IDefaultResponse } from "../../interfaces/common";
import { Database } from "../index";

interface IAcceptorLevelsInsertValues {
  type: string;
  currency: string;
  amount: number;
  count: number;
  total_amount: number;
  session_id: number;
  terminal_id: number;
  status: boolean;
}

async function createLevels(
  insert: Array<IAcceptorLevelsInsertValues>
): Promise<IDefaultResponse> {
  try {
    const db = new Database();

    const data = await db.createMultiple({
      table: db.tables.acceptorLevels,
      payload: insert,
    })[0][0];

    return resultBuilder(true, data);
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

export { createLevels, IAcceptorLevelsInsertValues };
