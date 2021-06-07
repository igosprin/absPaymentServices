import { Database } from ".";
import { resultBuilder } from "../common/resultBuilder";
import { IDefaultResponse } from "../interfaces/common";

async function findByTerminalId(id: number): Promise<IDefaultResponse> {
  try {
    const db = new Database();
    const dispenser = await db.findOne({
      table: db.tables.dispenser,
      params: { terminal_id: id },
    })[0][0];
    return resultBuilder(true, dispenser.data)
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

export { findByTerminalId };
