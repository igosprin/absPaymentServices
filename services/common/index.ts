import { Database } from "../../database";
import { IDefaultResponse } from "../../interfaces/common";

interface IGetTerminalByAuth {
  uid: string;
  password: string;
  maintenance?: string;
}

async function getTerminalByAuth({
  uid,
  password,
  maintenance,
}: IGetTerminalByAuth): Promise<IDefaultResponse> {
  try {
    const db = new Database();

    const passwordProperties = maintenance ? { passwd_maintance: password } : { passwd: password }

    const terminal = await db.findOne({
      table: db.tables.terminals,
      params: {
        uid,
        ...passwordProperties
      },
    });

    return { result: true, data: terminal }
  } catch (error) {
    throw error;
  }
}

export {
  IGetTerminalByAuth, getTerminalByAuth
}
