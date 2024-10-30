import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { CyclesContext } from "../../../../contexts/CyclesContext";

const NewCycleForm = () => {
  const { activeCycle } = useContext(CyclesContext);
  const { register } = useFormContext();

  return (
    <FormContainer>
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
    </FormContainer>
  );
};

export default NewCycleForm;
