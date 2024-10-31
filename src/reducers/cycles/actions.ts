import { FormatCycle } from "./reducer";

export enum ActionTypes {
  CREATE_NEW_CYCLE = "CREATE_NEW_CYCLE",
  INTERRUPT_CYCLE = "INTERRUPT_CYCLE",
  MARK_FINISHED_CYCLE = "MARK_FINISHED_CYCLE",
}
export function addNewCycleAction(newCycle: FormatCycle) {
  return {
    type: ActionTypes.CREATE_NEW_CYCLE,
    payload: {
      newCycle,
    },
  };
}
export function interruptCycleAction(activeCycleId: FormatCycle) {
  return {
    type: ActionTypes.INTERRUPT_CYCLE,
    payload: {
      activeCycleId,
    },
  };
}

export function markCurrentCycleAsFinished() {
  return {
    type: ActionTypes.INTERRUPT_CYCLE,
  };
}
