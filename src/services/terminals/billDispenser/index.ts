import { resultBuilder } from "../../../common/resultBuilder";
import { IDefaultResponse } from "../../../interfaces/common";
import { getCassettesByTerminalId } from "../cassette";
import * as database from '../../../database'

interface ICassette {
  count_of_need: number;
  count_of_issued: number;
}

interface IDispenseUpdateCassettesParams {
  dispenser: Array<ICassette>;
  sessionId: string;
  terminalId: number;
}

async function dispenserUpdateCassettes({
  dispenser,
  sessionId,
  terminalId,
}: IDispenseUpdateCassettesParams): Promise<IDefaultResponse> {
  try {
    const cassette = await getCassettesByTerminalId(terminalId);
    dispenser.forEach((element) => {});
    return resultBuilder(true);
  } catch (error) {
    throw error;
  }
}

async function getByTerminalId(id: number): Promise<IDefaultResponse> {
  try {
    return database.billDispenser.findByTerminalId(id);
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}


export { dispenserUpdateCassettes, getByTerminalId, ICassette, IDispenseUpdateCassettesParams };
