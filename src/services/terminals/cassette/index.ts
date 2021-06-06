import { resultBuilder } from "../../../common/resultBuilder";
import * as database from "../../../database";
import { IDefaultResponse } from "../../../interfaces/common";

interface ICassette {
  terminal_id: number;
  type: string;
  rating: string;
}

interface IDefaultLevels {
  Cassette1: ICassette;
  Cassette2: ICassette;
  Cassette3: ICassette;
}

async function getCassettesByTerminalId(
  id: number,
  key: string = "key_name"
): Promise<IDefaultResponse> {
  try {
    const result:Array<any> = await (await database.cassettes.getByTerminalId(id)).data;
    const resultToObject = {};

    result.sort(function (a, b) {
      if (a[key] > b[key]) {
        return 1;
      }
      if (a[key] < b[key]) {
        return -1;
      }

      return 0;
    });

    result.forEach((element) => {
      resultToObject[element[key]] = element;
    });
    return resultBuilder(true, resultToObject);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function createCassettes(id: number): Promise<IDefaultResponse> {
  try {
    const ratings = ["5", "10", "20"];

    const defaultCassette = {
      terminal_id: id,
      type: "cassette",
    };

    const payload = ratings.map((element, index) => {
      return {
        ...defaultCassette,
        rating: element,
        key_name: `Cassette${index + 1}`,
      };
    });

    const createResult = database.cassettes.createCassettes(payload);

    return resultBuilder(true, createResult);
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

export { getCassettesByTerminalId, createCassettes };
