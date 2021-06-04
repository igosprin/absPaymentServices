import { Database } from "..";
import { resultBuilder } from "../../common/resultBuilder";
import { IDefaultResponse } from "../../interfaces/common";

async function getCassettesByTerminalId(id: string): Promise<IDefaultResponse> {
  try {
    const db = new Database();

    const cassette = await db.findOne({
      table: db.tables.cassettes,
      params: { terminal_id: id },
    });

    return resultBuilder(true, cassette);
  } catch (error) {
    throw new Error(error);
  }
}

export { getCassettesByTerminalId };
