import { ActionTypes } from "./actions";
import { produce } from "immer";

export interface FormatCycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
}

interface CyclesState {
  cycles: FormatCycle[];
  activeCycleId: string | null;
}

export function cyclesReducer(state: CyclesState, action: any) {
  if (action.type == ActionTypes.CREATE_NEW_CYCLE) {
    return produce(state, (draft) => {
      draft.cycles.push(action.payload.newCycle);
      draft.activeCycleId = action.payload.newCycle.id;
    });
  }

  const currentCycleIndex = state.cycles.findIndex((cycle) => {
    return cycle.id === state.activeCycleId;
  });

  if (action.type == ActionTypes.INTERRUPT_CYCLE) {
    if (currentCycleIndex < 0) {
      return state;
    }
    return produce(state, (draft) => {
      draft.activeCycleId = null;
      draft.cycles[currentCycleIndex].interruptedDate = new Date();
    });
  }
  if (action.type == ActionTypes.MARK_FINISHED_CYCLE) {
    if (currentCycleIndex < 0) {
      return state;
    }
    return produce(state, (draft) => {
      draft.activeCycleId = null;
    });
  }
  return state;
}
