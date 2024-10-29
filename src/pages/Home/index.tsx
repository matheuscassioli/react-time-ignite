import { createContext, useState } from "react";
import NewCycleForm from "./components/NewCycleForm";
import Countdown from "./components/Countdown";
import {
  EndCountDonwButton,
  HomeContainer,
  StartCountDonwButton,
} from "./style";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

interface FormatCycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
}

interface CycleContextType {
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
}

export const CyclesContext = createContext({} as CycleContextType);

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minutesAmount: zod
    .number()
    .min(5, "O ciclo deve ser no minimo 5 minutos")
    .max(60, "O ciclo deve ser no maximo 60 minutos"),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

const newCycleForm = useForm<NewCycleFormData>({
  resolver: zodResolver(newCycleFormValidationSchema),
  defaultValues: {
    minutesAmount: 0,
    task: "",
  },
});

const { handleSubmit, watch, reset } = newCycleForm;

const Home = () => {
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);
  const [cycles, setCycles] = useState<FormatCycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const activeCycle = cycles.find((cycle) => cycle.id == activeCycleId);

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
      <CyclesContext.Provider
        value={{ activeCycle, activeCycleId, amountSecondsPassed }}
      >
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />
      </CyclesContext.Provider>

      {activeCycle ? (
        <EndCountDonwButton type="button" onClick={handleInterruptCycle}>
          Interromper
        </EndCountDonwButton>
      ) : (
        <StartCountDonwButton disabled={isSubmitDisabled} type="submit">
          Comecar
        </StartCountDonwButton>
      )}
    </HomeContainer>
  );
};

export default Home;
