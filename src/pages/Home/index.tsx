
import { useEffect, useState } from "react";

import { differenceInSeconds } from "date-fns";
import NewCycleForm from "./components/NewCycleForm";
import Countdown from "./components/Countdown";
import {
  EndCountDonwButton,
  HomeContainer,
  StartCountDonwButton,
} from "./style";
import { FormContainer } from "./components/NewCycleForm/styles";

interface FormatCycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
}
 
const Home = () => {
  const [cycles, setCycles] = useState<FormatCycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null); 
  const activeCycle = cycles.find((cycle) => cycle.id == activeCycleId);

  useEffect(() => {
    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        setAmountSecondsPassed(
          differenceInSeconds(new Date(), activeCycle.startDate)
        );
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [activeCycle]);


  function handleCreateNewCycle(data: NewCycleFormData) {
    const newCycle: FormatCycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    setActiveCycleId(newCycle.id);
    setAmountSecondsPassed(0);
    setCycles((state) => [...state, newCycle]);
    reset();
  }

  const task = watch("task");
  const isSubmitDisabled = !task;

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;
  const minutes = String(minutesAmount).padStart(2, "0");
  const seconds = String(secondsAmount).padStart(2, "0");

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`;
    }
  }, [minutes, seconds, activeCycle]);

  const handleInterruptCycle = () => {
    setCycles(
      cycles.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() };
        }
        return cycle;
      })
    );
    setActiveCycleId(null);
  };

  return (
    <HomeContainer>
      <FormContainer onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <NewCycleForm />
        <Countdown />

        {activeCycle ? (
          <EndCountDonwButton type="button" onClick={handleInterruptCycle}>
            Interromper
          </EndCountDonwButton>
        ) : (
          <StartCountDonwButton disabled={isSubmitDisabled} type="submit">
            Comecar
          </StartCountDonwButton>
        )}
      </FormContainer>
    </HomeContainer>
  );
};

export default Home;
