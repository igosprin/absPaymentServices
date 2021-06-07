import { Database } from ".";
import { resultBuilder } from "../common/resultBuilder";
import { IDefaultResponse } from "../interfaces/common";

async function getByTerminalId(id: number): Promise<IDefaultResponse> {
  try {
    const db = new Database();

    const cassette = await db.findOne({
      table: db.tables.cassettes,
      params: { terminal_id: id },
    });

    return resultBuilder(true, cassette.data);
  } catch (error) {
    console.error(error)
    throw new Error(error);
  }
}

async function createCassettes(payload): Promise<IDefaultResponse> {
  try {
    const db = new Database()
    return await db.createMultiple({ table: db.tables.cassettes, payload })
  } catch (error) {
    console.error(error);
    throw new Error(error)
  }
}

export { getByTerminalId, createCassettes };
