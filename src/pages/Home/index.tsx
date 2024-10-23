import {
  CountdonwContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StarCountDonwButton,
  TaskInput,
} from "./style";

const Home = () => {
  return (
    <HomeContainer>
      <FormContainer action="">
        <div>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput list="task-sugestions" placeholder="Dê um nome para seu projeto" id="task" />

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
            max="60"
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

        <StarCountDonwButton type="submit">Comecar</StarCountDonwButton>
      </FormContainer>
    </HomeContainer>
  );
};

export default Home;
