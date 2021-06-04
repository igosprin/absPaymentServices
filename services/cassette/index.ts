import { Database } from "../../database";
import { IDefaultResponse } from "../../interfaces/common";

async function getCassettesByTerminalId(id: string): Promise<IDefaultResponse> {
  try {
    const db = new Database();

    const cassette = await db.findOne({
      table: db.tables.cassettes,
      params: { terminal_id: id },
    });

    return { result: true, data: cassette }
  } catch (error) {
    throw error;
  }
}

export { getCassettesByTerminalId };
