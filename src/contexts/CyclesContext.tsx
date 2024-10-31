import { createContext, ReactNode, useReducer, useState } from "react";
import { cyclesReducer, FormatCycle } from "../reducers/cycles/reducer";
import {
  addNewCycleAction,
  interruptCycleAction,
} from "../reducers/cycles/actions";

interface CreateCycleData {
  task: string;
  minutesAmount: number;
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

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  });

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
    dispatch(addNewCycleAction(newCycle));
  }

  const handleInterruptCycle = () => {
    dispatch(interruptCycleAction(activeCycleId));
    document.querySelector("#header-id-logo")?.classList.remove("is-rotate");
  };

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinished());
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
