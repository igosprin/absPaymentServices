import { resultBuilder } from "../../../common/resultBuilder";
import { getByTerminalId, IAcceptorDataCreate, IAcceptorDataUpdate } from "../../../database/billAcceptor";
import * as database from "../../../database";
import { IDefaultResponse } from "../../../interfaces/common";
import { IAcceptorLevelsInsertValues } from "../../../database/levels";

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

    const { data: cassettes } = await database.levels.createLevels(insert);

    return resultBuilder(true, { total_amount, cassettes });
  } catch (error) {
    throw new Error(error);
  }
}

async function getAcceptorByTerminalId(id: number): Promise<IDefaultResponse> {
  try {
    return await getByTerminalId(id);
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
    return database.billAcceptor.create({ terminalId, connectionInterface, model });
  } catch (error) {
    throw new Error(error);
  }
}

async function updateAcceptorByTerminalId(
  id: number,
  { model, connectionInterface }: IAcceptorDataUpdate
) {
  try {
    let acceptor = await getAcceptorByTerminalId(id);
    if (acceptor.result)
      acceptor = await database.billAcceptor.updateByTerminalId(id, {
        model,
        connectionInterface,
      });
    if (!acceptor.result)
      acceptor = await database.billAcceptor.create({
        terminalId: id,
        model,
        connectionInterface,
      });

    return resultBuilder(true, acceptor)
  } catch (error) {
    throw error;
  }
}

export {
  IAcceptorUpdateLevelsParams,
  acceptorUpdateLevels,
  IAcceptorLevel,
  getAcceptorByTerminalId,
  createAcceptor,
  updateAcceptorByTerminalId,
};
