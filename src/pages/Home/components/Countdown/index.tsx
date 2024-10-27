import { useState } from "react";
import { CountdonwContainer, Separator } from "./styles";

const Countdown = () => {
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  return (
    <CountdonwContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdonwContainer>
  );
};

export default Countdown;
