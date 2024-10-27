import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import * as zod from "zod";
import { differenceInSeconds } from "date-fns";
import {
  CountdonwContainer,
  EndCountDonwButton,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountDonwButton,
  TaskInput,
} from "./style";

interface FormatCycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
}

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minutesAmount: zod
    .number()
    .min(5, "O ciclo deve ser no minimo 5 minutos")
    .max(60, "O ciclo deve ser no maximo 60 minutos"),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

const Home = () => {
  const [cycles, setCycles] = useState<FormatCycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);
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

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      minutesAmount: 0,
      task: "",
    },
  });

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
        <div>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            list="task-sugestions"
            disabled={!!activeCycle}
            placeholder="Dê um nome para seu projeto"
            id="task"
            {...register("task")}
          />

          <datalist id="task-sugestions">
            <option value="projeto 1" />
            <option value="projeto 2" />
            <option value="projeto 3" />
            <option value="projeto 4" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step="5"
            min="5"
            disabled={!!activeCycle}
            max="60"
            {...register("minutesAmount", { valueAsNumber: true })}
          />
          <span>minutos.</span>
        </div>

        <CountdonwContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdonwContainer>

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
