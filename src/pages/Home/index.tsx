import { CountdonwContainer, FormContainer, HomeContainer, Separator } from "./style";

const Home = () => {
  return (
    <HomeContainer>
      <FormContainer action="">
        <div>
          <label htmlFor="task">Vou trabalhar em</label>
          <input id="task" />

          <label htmlFor="minutesAmount">durante</label>
          <input type="number" id="minutesAmount" />

          <span>minutos.</span>
        </div>

        <CountdonwContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdonwContainer>

        <button type="submit">Comecar</button>
      </FormContainer>
    </HomeContainer>
  );
};

export default Home;
