import * as database from "../../../database";
import { ITerminalGetByAuthParams } from "../../../database/terminals";
import { IDefaultResponse } from "../../../interfaces/common";
import bcrypt from "bcrypt";
import { resultBuilder } from "../../../common/resultBuilder";

async function getTerminalByAuth({
  uid,
  password,
  maintenance,
}: ITerminalGetByAuthParams): Promise<IDefaultResponse> {
  try {
    return database.terminals.getByAuth({ uid, password, maintenance });
  } catch (error) {
    throw error;
  }
}

async function getSettingMaintenance({ uid }): Promise<IDefaultResponse> {
  try {
    const terminal: any = await database.terminals.getOneByTerminalUid(uid);

    const saltRounds = 10; // Its default value for salt

    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash("anyValue", salt);

    const result = await database.terminals.changePasswordById(terminal.id, {
      passwd: hash,
    });

    return resultBuilder(true, { uid, id: terminal.id, password: hash });
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

async function getTerminalByUid(uid: string): Promise<IDefaultResponse> {
  try {
    const terminal = await database.terminals.getOneByTerminalUid(uid);

    return resultBuilder(true, terminal.data);
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

async function getTerminalsByTerminalIdAndPaginateSort(
  id,
  { page, limit },
  { keys, operators }
): Promise<IDefaultResponse> {
  try {
    const result =
      await database.terminals.getTerminalsWithTerminalIdAndPaginateSort(
        id,
        { limit, page },
        { keys, operators }
      );

    return resultBuilder(true, result.data);
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

async function getTerminalsNameById(ids: Array<string> | string): Promise<IDefaultResponse> {
  try {
    return await database.terminals.getTerminalsNames(ids)
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}


export {
  getTerminalByAuth,
  getSettingMaintenance,
  getTerminalByUid,
  getTerminalsByTerminalIdAndPaginateSort,
};
