import { createLevels } from './levels'
import { resultBuilder } from "../../common/resultBuilder";
import { Database } from "../index";

const levels = {
  createLevels
}

async function getByTerminalId(id: number) {
  try {
    const db = new Database();
    const acceptor = await db.findOne({
      table: db.tables.acceptors,
      params: { terminal_id: id },
    });
    return resultBuilder(true, acceptor)
  } catch (error) {
    console.error(error)
    throw new Error(error)
  }
}

async function create () {

}

export {
  getByTerminalId,
  create,
  levels
}