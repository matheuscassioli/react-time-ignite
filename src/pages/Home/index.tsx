import { createContext, useState } from "react";
import NewCycleForm from "./components/NewCycleForm";
import Countdown from "./components/Countdown";
import {
  EndCountDonwButton,
  HomeContainer,
  StartCountDonwButton,
} from "./style";

interface FormatCycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
}

interface CycleContextType {
  activeCycle: cycles | undefined;
  activeCycleId: string | null;
}

export const CyclesContext = createContext({} as CycleContextType);

const Home = () => {
  const [cycles, setCycles] = useState<FormatCycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const activeCycle = cycles.find((cycle) => cycle.id == activeCycleId);

  // function handleCreateNewCycle(data: NewCycleFormData) {
  //   const newCycle: FormatCycle = {
  //     id: String(new Date().getTime()),
  //     task: data.task,
  //     minutesAmount: data.minutesAmount,
  //     startDate: new Date(),
  //   };

  //   setActiveCycleId(newCycle.id);
  //   setAmountSecondsPassed(0);
  //   setCycles((state) => [...state, newCycle]);
  //   reset();
  // }

  // const task = watch("task");
  // const isSubmitDisabled = !task;

  // const handleInterruptCycle = () => {
  //   setCycles(
  //     cycles.map((cycle) => {
  //       if (cycle.id === activeCycleId) {
  //         return { ...cycle, interruptedDate: new Date() };
  //       }
  //       return cycle;
  //     })
  //   );
  //   setActiveCycleId(null);
  // };

  return (
    <HomeContainer>
      <CyclesContext.Provider value={{ activeCycle, activeCycleId }}>
        {/* <NewCycleForm /> */}
        <Countdown />
      </CyclesContext.Provider>

      {activeCycle ? (
        <EndCountDonwButton type="button" /*onClick={handleInterruptCycle}*/>
          Interromper
        </EndCountDonwButton>
      ) : (
        <StartCountDonwButton /*disabled={isSubmitDisabled}*/ type="submit">
          Comecar
        </StartCountDonwButton>
      )}
    </HomeContainer>
  );
};

export default Home;
