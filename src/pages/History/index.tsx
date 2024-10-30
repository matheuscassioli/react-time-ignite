import { useContext } from "react";
import { HistoryContainer, HistoryList, Status } from "./styles";
import { CyclesContext } from "../../contexts/CyclesContext";

const History = () => {
  const { cycles } = useContext(CyclesContext);

  const renderCycleStatus = (task) => {
    const { startDate, minutesAmount, interruptedDate } = task;

    const startDateFormated = new Date(startDate);
    const endDateOrInterruptedDate = new Date(interruptedDate);

    const diferencaMs = Math.abs(startDateFormated - endDateOrInterruptedDate);

    const diferencaMinutos = Math.floor(diferencaMs / (1000 * 60));

    const isComplete = diferencaMinutos == minutesAmount;

    if (interruptedDate) {
      if (isComplete) {
        return <Status statusColor="green">Concluido</Status>;
      }
      return <Status statusColor="red">Cancelado</Status>;
    }
    return <Status statusColor="yellow">Em andamento</Status>;
  };

  return (
    <HistoryContainer>
      <h1>Histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Inicio</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {Object.keys(cycles).map((line) => {
              return (
                <tr key={cycles[line].id}>
                  <td>{cycles[line].task}</td>
                  <td>{cycles[line].minutesAmount} minutos</td>
                  <td>calculo de faz quanto tempo foi criado</td>
                  <td>{renderCycleStatus(cycles[line])}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
};

export default History;
