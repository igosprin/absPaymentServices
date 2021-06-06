import { Database } from ".";
import { resultBuilder } from "../common/resultBuilder";
import { IDefaultResponse } from "../interfaces/common";

interface ITerminalGetByAuthParams {
  uid: string;
  password: string;
  maintenance?: string;
}

async function getByAuth({
  uid,
  password,
  maintenance,
}: ITerminalGetByAuthParams): Promise<IDefaultResponse> {
  try {
    const db = new Database();

    const passwordProperties = maintenance
      ? { passwd_maintance: password }
      : { passwd: password };

    const terminal = await db.findOne({
      table: db.tables.terminals,
      params: {
        uid,
        ...passwordProperties,
      },
    });

    return resultBuilder(true, terminal);
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

async function getOneByTerminalUid(uid: string): Promise<IDefaultResponse> {
  try {
    const db = new Database();

    const result = db.findOne({
      table: db.tables.terminals,
      params: { uid },
    });

    return resultBuilder(true, result);
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

async function changePasswordById(id: number, values): Promise<IDefaultResponse> {
  try {
    const db = new Database();

    const result = db.updateOne({
      table: db.tables.terminals,
      params: { id },
      values,
    });

    return resultBuilder(true, result)
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

async function getTerminalsWithPaginateAndParams({ limit, page }): Promise<IDefaultResponse> {
  try {
    return resultBuilder(true)
  } catch (error) {
    console.log(error);
    throw new Error(error)
  }
}

export { getByAuth, ITerminalGetByAuthParams, getOneByTerminalUid, changePasswordById, getTerminalsWithPaginateAndParams };
