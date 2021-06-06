import { acceptorUpdateLevels } from "./billAcceptor";
import { getTerminalByAuth } from "./common";
import { dispenserUpdateCassettes } from './billDispenser'

const billAcceptor = {
  acceptorUpdateLevels
}

const common = {
  getTerminalByAuth
}

const billDispenser = {
  dispenserUpdateCassettes
}


export {
  billAcceptor, common, billDispenser
}