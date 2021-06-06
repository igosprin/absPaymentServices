import { Database } from ".";
import { resultBuilder } from "../common/resultBuilder";
import { IDefaultResponse } from "../interfaces/common";

interface IAcceptorDataCreate {
  terminalId: number;
  model: string;
  connectionInterface: string;
}

interface IAcceptorDataUpdate {
  model: string;
  connectionInterface: string;
}


async function getByTerminalId(id: number) {
  try {
    const db = new Database();
    const acceptor = await db.findOne({
      table: db.tables.acceptors,
      params: { terminal_id: id },
    });
    return resultBuilder(true, acceptor);
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

async function create({
  terminalId,
  model,
  connectionInterface,
}: IAcceptorDataCreate): Promise<IDefaultResponse> {
  try {
    const db = new Database();
    const acceptor = await db.createOne({
      table: db.tables.acceptors,
      values: {
        model,
        connection_interface: connectionInterface,
        terminal_id: terminalId,
      },
    });
    return resultBuilder(true, acceptor);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

async function updateByTerminalId(
  id: number,
  { model, connectionInterface: connection_interface }: IAcceptorDataUpdate
): Promise<IDefaultResponse> {
  try {
    const db = new Database();
    const result = await db.updateOne({
      table: db.tables.acceptors,
      params: { terminal_id: id },
      values: { model, connection_interface },
    })[0][0];

    return resultBuilder(true, result);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export {
  getByTerminalId,
  create,
  updateByTerminalId,
  IAcceptorDataUpdate,
  IAcceptorDataCreate,
};
