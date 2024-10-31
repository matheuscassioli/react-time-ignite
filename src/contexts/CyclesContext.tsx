import { createContext, ReactNode, useReducer, useState } from "react";

interface CreateCycleData {
  task: string;
  minutesAmount: number;
}

interface FormatCycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
}

interface CycleContextType {
  cycles: FormatCycle[];
  activeCycle: FormatCycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  setAmountSecondsPassed: (seconds: number) => void;
  createNewCycle: (data: CreateCycleData) => void;
  handleInterruptCycle: () => void;
  markCurrentCycleAsFinished: () => void;
}

export const CyclesContext = createContext({} as CycleContextType);

interface CyclesContextProviderProps {
  children: ReactNode;
}

interface CyclesState {
  cycles: FormatCycle[];
  activeCycleId: string | null;
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    (state: CyclesState, action: any) => {
      if (action.type == "CREATE_NEW_CYCLE") {
        return {
          ...state,
          cycles: [...state.cycles, action.payload.newCycle],
          activeCycleId: action.payload.newCycle.id,
        };
      }
      if (action.type == "INTERRUPT_CYCLE") {
        return {
          ...state,
          cycles: state.cycles.map((cycle) => {
            if (cycle.id === state.activeCycleId) {
              return { ...cycle, interruptedDate: new Date() };
            }
            return cycle;
          }),
          activeCycleId: null,
        };
      }
      if (action.type == "MARK_FINISHED_CYCLE") {
        return {
          ...state,
          cycles: state.cycles.map((cycle) => {
            if (cycle.id === state.activeCycleId) {
              return { ...cycle, finishedDate: new Date() };
            }
            return cycle;
          }),
          activeCycleId: null,
        };
      }
      return state;
    },
    {
      cycles: [],
      activeCycleId: null,
    }
  );

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);
  const { cycles, activeCycleId } = cyclesState;
  const activeCycle = cycles.find((cycle) => cycle.id == activeCycleId);

  function createNewCycle(data: CreateCycleData) {
    const newCycle: FormatCycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };
    document.querySelector("#header-id-logo")?.classList.add("is-rotate");
    setAmountSecondsPassed(0);
    dispatch({
      type: "CREATE_NEW_CYCLE",
      payload: {
        newCycle,
      },
    });
  }

  const handleInterruptCycle = () => {
    dispatch({
      type: "INTERRUPT_CYCLE",
      payload: {
        activeCycleId,
      },
    });
    document.querySelector("#header-id-logo")?.classList.remove("is-rotate");
  };

  function markCurrentCycleAsFinished() {
    dispatch({
      type: "MARK_FINISHED_CYCLE",
      payload: {
        activeCycleId,
      },
    });
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        setAmountSecondsPassed,
        createNewCycle,
        handleInterruptCycle,
        markCurrentCycleAsFinished,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
}
