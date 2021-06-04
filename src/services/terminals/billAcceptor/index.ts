import { Database } from "../../../database";
import { createLevels, IAcceptorLevelsInsertValues } from "../../../database/billAcceptor/levels";
import { IDefaultResponse } from "../../../interfaces/common";


interface IAcceptorLevel {
  currency: string;
  Denomination: number;
  count: number;
}

interface IAcceptorUpdateLevelsParams {
  levels: Array<IAcceptorLevel>;
  session_id: number;
  terminal_id: number;
}



interface IAcceptorData {
  model: string;
  connectionInterface: string;
}

interface IAcceptorDataCreate extends IAcceptorData {
  terminalId: number;
}

async function acceptorUpdateLevels(
  { levels, session_id, terminal_id }: IAcceptorUpdateLevelsParams,
  type: string = "in"
): Promise<IDefaultResponse> {
  let total_amount = 0;
  try {

    const insert: Array<IAcceptorLevelsInsertValues> = levels.map((element) => {
      const { Denomination: amount, count, currency } = element;
      const level: IAcceptorLevelsInsertValues = {
        amount,
        count,
        currency,
        total_amount: count * amount,
        session_id,
        terminal_id,
        status: true,
        type,
      };

      total_amount += amount;

      return level;
    });

    const { data: cassettes } = await createLevels(insert)

    return { result: true, data: { total_amount, cassettes  } };
  } catch (error) {
    throw error;
  }
}

async function getAcceptorByTerminalId(id: number): Promise<IDefaultResponse> {
  try {
    const db = new Database();
    const acceptor = await db.findOne({
      table: db.tables.acceptors,
      params: { terminal_id: id },
    });
    return { result: true, data: acceptor };
  } catch (error) {
    throw error;
  }
}

async function createAcceptor({
  model,
  connectionInterface,
  terminalId,
}: IAcceptorDataCreate) {
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
    return { result: true, data: acceptor };
  } catch (error) {
    throw error;
  }
}

async function updateAcceptorByTerminalId(
  id: number,
  { model, connectionInterface }: IAcceptorData
) {
  try {
    const db = new Database();

    let acceptor = await getAcceptorByTerminalId(id);
    if (acceptor.result)
      acceptor = await db.updateOne({
        table: db.tables.acceptors,
        params: { terminal_id: id },
        values: { model, connection_interface: connectionInterface },
      });

    if (!acceptor.result)
      acceptor = await createAcceptor({
        terminalId: id,
        model,
        connectionInterface,
      });

    return { result: true, data: acceptor };
  } catch (error) {
    throw error;
  }
}

export {
  IAcceptorUpdateLevelsParams,
  acceptorUpdateLevels,
  IAcceptorLevel,
  getAcceptorByTerminalId,
  IAcceptorData,
  createAcceptor,
  updateAcceptorByTerminalId,
};
