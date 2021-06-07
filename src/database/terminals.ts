import { Database } from ".";
import { resultBuilder } from "../common/resultBuilder";
import { IDefaultResponse } from "../interfaces/common";

interface ITerminalGetByAuthParams {
  uid: string;
  password: string;
  maintenance?: string;
}

interface IPaginateParams {
  limit: number;
  page: number;
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

    return resultBuilder(true, terminal.data);
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

async function getOneByTerminalUid(uid: string): Promise<IDefaultResponse> {
  try {
    const db = new Database();

    const result = await db.findOne({
      table: db.tables.terminals,
      params: { uid },
    });

    return resultBuilder(true, result.data);
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

async function changePasswordById(
  id: number,
  values
): Promise<IDefaultResponse> {
  try {
    const db = new Database();

    const result = await db.updateOne({
      table: db.tables.terminals,
      params: { id },
      values,
    });

    return resultBuilder(true, result.data);
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

async function getTerminalsWithTerminalIdAndPaginateSort(
  id: number,
  { limit, page }: IPaginateParams,
  { keys, operators }
): Promise<IDefaultResponse> {
  try {
    const db = new Database();

    const result = await db.find({
      table: db.tables.terminals,
      params: { terminal_id: id },
      paginate: { limit, page },
      sort: { keys, operators }
    });

    return resultBuilder(true, result.data);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

async function getTerminalsNames (ids: Array<string> | string) {
  try {
    if (typeof ids == 'string') ids = ids.split(',')
    
    const db = new Database();

    const result = await db.find({
      table: db.tables.terminals,
      params: { id: ids },
      columns: ['uid']
    })

    return resultBuilder(true, result.data)
  } catch (error) {
    console.error(error);
    throw new Error(error)
  }
}

export {
  getByAuth,
  ITerminalGetByAuthParams,
  getOneByTerminalUid,
  changePasswordById,
  getTerminalsWithTerminalIdAndPaginateSort,
  getTerminalsNames
};
