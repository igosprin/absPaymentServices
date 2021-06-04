import { IDefaultResponse } from "../../../interfaces/common";
import { getCassettesByTerminalId } from "../cassette";

interface ICassette {
  count_of_need: number;
  count_of_issued: number;
}

interface IDispenseUpdateCassettesParams {
  dispenser: Array<ICassette>;
  sessionId: string;
  terminalId: string;
}

async function dispenserUpdateCassettes({
  dispenser,
  sessionId,
  terminalId,
}: IDispenseUpdateCassettesParams): Promise<IDefaultResponse> {
  try {
    const cassette = await getCassettesByTerminalId(terminalId)
    dispenser.forEach(element => {
      
    })
    return { result: true };
  } catch (error) {
    throw error;
  }
}

export { dispenserUpdateCassettes, ICassette, IDispenseUpdateCassettesParams };
