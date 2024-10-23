import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import {
  CountdonwContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StarCountDonwButton,
  TaskInput,
} from "./style";

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minutesAmount: zod
    .number()
    .min(5, "O ciclo deve ser no minimo 5 minutos")
    .max(60, "O ciclo deve ser no maximo 60 minutos"),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

const Home = () => {
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      minutesAmount: 0,
      task: "",
    },
  });

  function handleCreateNewCycle(data: NewCycleFormData) {
    console.log("data", data);
    reset();
  }

  const task = watch("task");
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <FormContainer onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <div>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            list="task-sugestions"
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
            // max="60"
            {...register("minutesAmount", { valueAsNumber: true })}
          />
          <span>minutos.</span>
        </div>

        <CountdonwContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdonwContainer>

        <StarCountDonwButton disabled={isSubmitDisabled} type="submit">
          Comecar
        </StarCountDonwButton>
      </FormContainer>
    </HomeContainer>
  );
};

export default Home;
